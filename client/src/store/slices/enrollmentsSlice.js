// src/store/slices/enrollmentSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

// Fetch semua enrollment
export const fetchEnrollments = createAsyncThunk(
  "enrollments/fetchEnrollments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/enrollments");
      return response.data; // misal array enrollment { id, UserId, CourseId, status }
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch enrollments");
    }
  }
);

// Tambah enrollment baru
export const addEnrollment = createAsyncThunk(
  "enrollments/addEnrollment",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/enrollments", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add enrollment");
    }
  }
);

// Update enrollment
export const updateEnrollment = createAsyncThunk(
  "enrollments/updateEnrollment",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/enrollments/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update enrollment");
    }
  }
);

// Delete enrollment
export const deleteEnrollment = createAsyncThunk(
  "enrollments/deleteEnrollment",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/enrollments/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete enrollment");
    }
  }
);

const enrollmentSlice = createSlice({
  name: "enrollments",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchEnrollments.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchEnrollments.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchEnrollments.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      // Add
      .addCase(addEnrollment.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(addEnrollment.fulfilled, (state, action) => { state.loading = false; state.items.push(action.payload); })
      .addCase(addEnrollment.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      // Update
      .addCase(updateEnrollment.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(updateEnrollment.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(updateEnrollment.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      // Delete
      .addCase(deleteEnrollment.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(deleteEnrollment.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(deleteEnrollment.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export default enrollmentSlice.reducer;
