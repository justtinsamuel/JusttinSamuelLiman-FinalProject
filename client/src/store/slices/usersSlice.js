// src/store/slices/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

// Fetch semua user
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/users");
      return response.data; // misal array user { id, name, email, role }
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch users");
    }
  }
);

// Tambah user baru
export const addUser = createAsyncThunk(
  "users/addUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/users", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add user");
    }
  }
);

// Update user
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/users/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update user");
    }
  }
);

// Delete user
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/users/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete user");
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchUsers.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchUsers.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchUsers.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      // Add
      .addCase(addUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(addUser.fulfilled, (state, action) => { state.loading = false; state.items.push(action.payload); })
      .addCase(addUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      // Update
      .addCase(updateUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      // Delete
      .addCase(deleteUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export default userSlice.reducer;
