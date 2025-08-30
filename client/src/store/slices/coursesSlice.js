// src/store/slices/coursesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

// Fetch semua courses
export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/courses");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch courses");
    }
  }
);

// Fetch detail course by id
export const fetchCourseDetail = createAsyncThunk(
  "courses/fetchCourseDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/courses/${id}`);
      // pastikan backend endpoint /courses/:id sudah include modules
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch course detail"
      );
    }
  }
);

// Tambah course baru
export const addCourse = createAsyncThunk(
  "courses/addCourse",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/courses", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add course");
    }
  }
);

// Update course
export const updateCourse = createAsyncThunk(
  "courses/updateCourse",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/courses/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update course");
    }
  }
);

// Delete course
export const deleteCourse = createAsyncThunk(
  "courses/deleteCourse",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.put(`/courses/${id}/delete`, { confirm: true });
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete course");
    }
  }
);

const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    items: [],
    detail: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch all
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // fetch detail
      .addCase(fetchCourseDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.detail = action.payload;
      })
      .addCase(fetchCourseDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // ===== Add =====
      .addCase(addCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCourse.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.items.push(action.payload); // asumsi payload = course baru
        }
      })
      .addCase(addCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // ===== Update =====
      .addCase(updateCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.id) {
          const index = state.items.findIndex(
            (item) => item.id === action.payload.id
          );
          if (index !== -1) {
            state.items[index] = {
              ...state.items[index],
              ...action.payload, // supaya tidak hilang field lain
            };
          }
        }
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // ===== Delete =====
      .addCase(deleteCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId =
          typeof action.payload === "object"
            ? action.payload.id
            : action.payload;
        state.items = state.items.filter((item) => item.id !== deletedId);
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default coursesSlice.reducer;
