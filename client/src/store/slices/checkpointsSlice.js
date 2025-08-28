// src/store/slices/checkpointsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

// Fetch semua checkpoint
export const fetchCheckpoints = createAsyncThunk(
  "checkpoints/fetchCheckpoints",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/checkpoints");
      return response.data; // misal array checkpoint
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch checkpoints");
    }
  }
);

// Tambah checkpoint baru
export const addCheckpoint = createAsyncThunk(
  "checkpoints/addCheckpoint",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/checkpoints", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add checkpoint");
    }
  }
);

// Update checkpoint
export const updateCheckpoint = createAsyncThunk(
  "checkpoints/updateCheckpoint",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/checkpoints/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update checkpoint");
    }
  }
);

// Delete checkpoint
export const deleteCheckpoint = createAsyncThunk(
  "checkpoints/deleteCheckpoint",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/checkpoints/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete checkpoint");
    }
  }
);

const checkpointsSlice = createSlice({
  name: "checkpoints",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchCheckpoints.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchCheckpoints.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchCheckpoints.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      // Add
      .addCase(addCheckpoint.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(addCheckpoint.fulfilled, (state, action) => { state.loading = false; state.items.push(action.payload); })
      .addCase(addCheckpoint.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      // Update
      .addCase(updateCheckpoint.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(updateCheckpoint.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(updateCheckpoint.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      // Delete
      .addCase(deleteCheckpoint.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(deleteCheckpoint.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(deleteCheckpoint.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export default checkpointsSlice.reducer;
