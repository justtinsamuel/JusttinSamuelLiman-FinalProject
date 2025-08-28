// src/store/slices/submissionSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

// Fetch semua submission
export const fetchSubmissions = createAsyncThunk(
  "submissions/fetchSubmissions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/submissions");
      return response.data; // misal array submissions { id, UserId, ModuleId, status, score }
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch submissions");
    }
  }
);

// Tambah submission baru
export const addSubmission = createAsyncThunk(
  "submissions/addSubmission",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/submissions", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add submission");
    }
  }
);

// Update submission
export const updateSubmission = createAsyncThunk(
  "submissions/updateSubmission",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/submissions/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update submission");
    }
  }
);

// Delete submission
export const deleteSubmission = createAsyncThunk(
  "submissions/deleteSubmission",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/submissions/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete submission");
    }
  }
);

const submissionSlice = createSlice({
  name: "submissions",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchSubmissions.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchSubmissions.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchSubmissions.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      // Add
      .addCase(addSubmission.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(addSubmission.fulfilled, (state, action) => { state.loading = false; state.items.push(action.payload); })
      .addCase(addSubmission.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      // Update
      .addCase(updateSubmission.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(updateSubmission.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(updateSubmission.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      // Delete
      .addCase(deleteSubmission.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(deleteSubmission.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(deleteSubmission.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export default submissionSlice.reducer;
