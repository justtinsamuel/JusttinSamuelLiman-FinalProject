// src/store/slices/coursesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

// Fetch semua courses
export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/courses");
      return response.data; // misal array courses
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch courses");
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
      await axiosInstance.delete(`/courses/${id}`);
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
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchCourses.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchCourses.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchCourses.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      // Add
      .addCase(addCourse.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(addCourse.fulfilled, (state, action) => { state.loading = false; state.items.push(action.payload); })
      .addCase(addCourse.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      // Update
      .addCase(updateCourse.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(updateCourse.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      // Delete
      .addCase(deleteCourse.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(deleteCourse.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export default coursesSlice.reducer;
