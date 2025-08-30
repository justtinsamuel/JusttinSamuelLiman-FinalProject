// src/store/slices/modulesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

// Fetch semua modules
export const fetchModules = createAsyncThunk(
  "modules/fetchModules",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/modules");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch modules");
    }
  }
);

// Tambah module baru
export const addModule = createAsyncThunk(
  "modules/addModule",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/modules", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add module");
    }
  }
);

// Update module
export const updateModule = createAsyncThunk(
  "modules/updateModule",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/modules/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update module");
    }
  }
);

// Delete module
export const deleteModule = createAsyncThunk(
  "modules/deleteModule",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/modules/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete module");
    }
  }
);

const modulesSlice = createSlice({
  name: "modules",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchModules.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchModules.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchModules.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      // Add
      .addCase(addModule.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(addModule.fulfilled, (state, action) => { state.loading = false; state.items.push(action.payload); })
      .addCase(addModule.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      // Update
      .addCase(updateModule.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(updateModule.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(updateModule.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      // Delete
      .addCase(deleteModule.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(deleteModule.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(deleteModule.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export default modulesSlice.reducer;
