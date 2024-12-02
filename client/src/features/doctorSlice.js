import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axios";


// Fetch all doctors
export const fetchAllDoctors = createAsyncThunk(
  "doctors/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/doctors");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch doctors"
      );
    }
  }
);

// Fetch doctor by ID
export const fetchDoctorById = createAsyncThunk(
  "doctors/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/doctors/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch doctor details"
      );
    }
  }
);

// Create a new doctor
export const createDoctor = createAsyncThunk(
  "doctors/create",
  async (doctorData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/doctors", doctorData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create doctor"
      );
    }
  }
);

// Update an existing doctor
export const updateDoctor = createAsyncThunk(
  "doctors/update",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/doctors/${id}`, updatedData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update doctor"
      );
    }
  }
);

// Delete a doctor
export const deleteDoctor = createAsyncThunk(
  "doctors/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/doctors/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete doctor"
      );
    }
  }
);

// Doctors Slice
const doctorsSlice = createSlice({
  name: "doctors",
  initialState: {
    doctors: [],
    doctor: null,
    status: "idle", 
    addStatus: "idle",
    updateStatus: "idle", 
    deleteStatus: "idle", 
    error: null,
  },
  reducers: {
    resetState: (state) => {
      state.status = "idle";
      state.addStatus = "idle";
      state.updateStatus = "idle";
      state.deleteStatus = "idle";
      state.error = null;
    },
    // Clear single doctor state
    clearDoctor: (state) => {
      state.doctor = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Doctors
      .addCase(fetchAllDoctors.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAllDoctors.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.doctors = action.payload;
      })
      .addCase(fetchAllDoctors.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Fetch Doctor by ID
      .addCase(fetchDoctorById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchDoctorById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.doctor = action.payload;
      })
      .addCase(fetchDoctorById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Create Doctor
      .addCase(createDoctor.pending, (state) => {
        state.addStatus = "loading";
        state.error = null;
      })
      .addCase(createDoctor.fulfilled, (state, action) => {
        state.addStatus = "succeeded";
        state.doctors.push(action.payload);
      })
      .addCase(createDoctor.rejected, (state, action) => {
        state.addStatus = "failed";
        state.error = action.payload;
      })

      // Update Doctor
      .addCase(updateDoctor.pending, (state) => {
        state.updateStatus = "loading";
        state.error = null;
      })
      .addCase(updateDoctor.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        const index = state.doctors.findIndex(
          (doctor) => doctor._id === action.payload._id
        );
        if (index !== -1) {
          state.doctors[index] = action.payload;
        }
      })
      .addCase(updateDoctor.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = action.payload;
      })

      // Delete Doctor
      .addCase(deleteDoctor.pending, (state) => {
        state.deleteStatus = "loading";
        state.error = null;
      })
      .addCase(deleteDoctor.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.doctors = state.doctors.filter(
          (doctor) => doctor._id !== action.payload._id
        );
      })
      .addCase(deleteDoctor.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { resetState, clearDoctor } = doctorsSlice.actions;
export default doctorsSlice.reducer;
