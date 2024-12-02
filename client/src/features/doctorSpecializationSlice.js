import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axios";

// Fetch doctor specializations
export const fetchDoctorSpecializations = createAsyncThunk(
  "doctorSpecializations/fetchDoctorSpecializations",
  async (doctorId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/doctorsSpecialization/${doctorId}/specializations`
      );
      return response.data; // Returns array of specializations
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Assign specialization(s) to a doctor
export const assignSpecializationsToDoctor = createAsyncThunk(
  "doctorSpecializations/assignSpecializationsToDoctor",
  async ({ doctorId, specializationIds }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/doctorsSpecialization/${doctorId}/specializations`,
        {
          specializationIds,
        }
      );
      return response.data; // Returns success message
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Remove a specialization from a doctor
export const removeSpecializationFromDoctor = createAsyncThunk(
  "doctorSpecializations/removeSpecializationFromDoctor",
  async ({ doctorId, specializationId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/doctorsSpecialization/${doctorId}/specializations/${specializationId}`
      );
      return response.data; // Returns success message
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Fetch doctors by specialization
export const fetchDoctorsBySpecialization = createAsyncThunk(
  "doctorSpecializations/fetchDoctorsBySpecialization",
  async (specializationId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/doctorsSpecialization/specialization/${specializationId}`
      );
      return response.data; // Returns array of doctors
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Add a new specialization
export const addDoctorSpecialization = createAsyncThunk(
  "doctorSpecializations/addDoctorSpecialization",
  async ({ doctorId, specializationId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/doctorsSpecialization/${doctorId}/specialization`,
        {
          specializationId,
        }
      );
      return response.data; // Returns success message
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Edit an existing specialization
export const editDoctorSpecialization = createAsyncThunk(
  "doctorSpecializations/editDoctorSpecialization",
  async (
    { doctorId, specializationId, newSpecializationId },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.put(
        `/doctorsSpecialization/${doctorId}/specialization`,
        {
          specializationId,
          newSpecializationId,
        }
      );
      return response.data; // Returns updated specialization
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Delete a specialization
export const deleteDoctorSpecialization = createAsyncThunk(
  "doctorSpecializations/deleteDoctorSpecialization",
  async ({ doctorId, specializationId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/doctorsSpecialization/${doctorId}/specialization/${specializationId}`
      );
      return response.data; // Returns success message
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Slice
const doctorSpecializationSlice = createSlice({
  name: "doctorSpecializations",
  initialState: {
    doctorSpecializations: [],
    doctorsBySpecialization: [],
    status: "idle", // idle | loading | succeeded | failed
    addStatus: "idle",
    editStatus: "idle",
    deleteStatus: "idle",
    error: null,
    addError: null,
    editError: null,
    deleteError: null,
  },
  reducers: {
    resetDoctorSpecializationsState(state) {
      state.doctorSpecializations = [];
      state.doctorsBySpecialization = [];
      state.status = "idle";
      state.addStatus = "idle";
      state.editStatus = "idle";
      state.deleteStatus = "idle";
      state.error = null;
      state.addError = null;
      state.editError = null;
      state.deleteError = null;
    },
    resetStatus(state) {
      state.status = "idle";
      state.addStatus = "idle";
      state.editStatus = "idle";
      state.deleteStatus = "idle";
      state.error = null;
      state.addError = null;
      state.editError = null;
      state.deleteError = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch doctor specializations
    builder
      .addCase(fetchDoctorSpecializations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDoctorSpecializations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.doctorSpecializations = action.payload;
      })
      .addCase(fetchDoctorSpecializations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // Assign specialization(s)
    builder
      .addCase(assignSpecializationsToDoctor.pending, (state) => {
        state.addStatus = "loading";
      })
      .addCase(assignSpecializationsToDoctor.fulfilled, (state) => {
        state.addStatus = "succeeded";
      })
      .addCase(assignSpecializationsToDoctor.rejected, (state, action) => {
        state.addStatus = "failed";
        state.addError = action.payload;
      });

    // Remove specialization
    builder
      .addCase(removeSpecializationFromDoctor.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(removeSpecializationFromDoctor.fulfilled, (state) => {
        state.deleteStatus = "succeeded";
      })
      .addCase(removeSpecializationFromDoctor.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.deleteError = action.payload;
      });

    // Fetch doctors by specialization
    builder
      .addCase(fetchDoctorsBySpecialization.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDoctorsBySpecialization.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.doctorsBySpecialization = action.payload;
      })
      .addCase(fetchDoctorsBySpecialization.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // Add specialization
    builder
      .addCase(addDoctorSpecialization.pending, (state) => {
        state.addStatus = "loading";
      })
      .addCase(addDoctorSpecialization.fulfilled, (state) => {
        state.addStatus = "succeeded";
      })
      .addCase(addDoctorSpecialization.rejected, (state, action) => {
        state.addStatus = "failed";
        state.addError = action.payload;
      });

    // Edit specialization
    builder
      .addCase(editDoctorSpecialization.pending, (state) => {
        state.editStatus = "loading";
      })
      .addCase(editDoctorSpecialization.fulfilled, (state) => {
        state.editStatus = "succeeded";
      })
      .addCase(editDoctorSpecialization.rejected, (state, action) => {
        state.editStatus = "failed";
        state.editError = action.payload;
      });

    // Delete specialization
    builder
      .addCase(deleteDoctorSpecialization.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deleteDoctorSpecialization.fulfilled, (state) => {
        state.deleteStatus = "succeeded";
      })
      .addCase(deleteDoctorSpecialization.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.deleteError = action.payload;
      });
  },
});

// Export actions and reducer
export const { resetDoctorSpecializationsState, resetStatus } =
  doctorSpecializationSlice.actions;
export default doctorSpecializationSlice.reducer;
