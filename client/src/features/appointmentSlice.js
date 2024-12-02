import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axios";

// Async Thunks
export const fetchAppointments = createAsyncThunk(
  "appointments/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/appointments");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch appointments"
      );
    }
  }
);

export const createAppointment = createAsyncThunk(
  "appointments/create",
  async (appointmentData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/appointments",
        appointmentData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create appointment"
      );
    }
  }
);

export const updateAppointment = createAsyncThunk(
  "appointments/update",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/appointments/${id}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update appointment"
      );
    }
  }
);

export const deleteAppointment = createAsyncThunk(
  "appointments/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/appointments/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete appointment"
      );
    }
  }
);

const initialState = {
  appointments: [],
  loading: false,
  error: null,
  isSuccess: false,
};

const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    // Fetch appointments
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
        state.error = null;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Create appointment
    builder
      .addCase(createAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments.push(action.payload);
        state.isSuccess = true;
        state.error = null;
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update appointment
    builder
      .addCase(updateAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAppointment.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.appointments.findIndex(
          (appointment) => appointment._id === action.payload._id
        );
        if (index !== -1) {
          state.appointments[index] = action.payload;
        }
        state.isSuccess = true;
        state.error = null;
      })
      .addCase(updateAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete appointment
    builder
      .addCase(deleteAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = state.appointments.filter(
          (appointment) => appointment._id !== action.payload._id
        );
        state.isSuccess = true;
        state.error = null;
      })
      .addCase(deleteAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSuccess } = appointmentSlice.actions;

export default appointmentSlice.reducer;
