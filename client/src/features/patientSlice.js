import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axios";

const initialState = {
  profile: null,
  status: "idle",
  createStatus: "idle",
  editStatus: "idle",
  deleteStatus: "idle",
  error: null,
};

export const fetchPatientProfile = createAsyncThunk(
  "patient/fetchPatientProfile",
  async (patientId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/patients/getPatientProfile/${patientId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const fetchPatientById = createAsyncThunk(
  "patient/fetchPatientById",
  async (patientId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/patients/${patientId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error?.message);
    }
  }
);

export const updatePatientProfile = createAsyncThunk(
  "patient/updatePatientProfile",
  async ({ patientId, updates }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/patients/updatePatientProfile/${patientId}`,
        updates
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error?.message);
    }
  }
);

// Other patient methods (e.g., create, delete, etc.)
export const deletePatient = createAsyncThunk(
  "patient/deletePatient",
  async (patientId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/patients/${patientId}`);
      return patientId;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    resetState: (state) => {
      state.status = "idle";
      state.editStatus = "idle";
      state.createStatus = "idle";
      state.deleteStatus = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Patient Profile
    builder
      .addCase(fetchPatientProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPatientProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
      })
      .addCase(fetchPatientProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // Fetch Patient By ID
    builder
      .addCase(fetchPatientById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPatientById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
      })
      .addCase(fetchPatientById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // Update Patient Profile
    builder
      .addCase(updatePatientProfile.pending, (state) => {
        state.editStatus = "loading";
        state.error = null;
      })
      .addCase(updatePatientProfile.fulfilled, (state, action) => {
        state.editStatus = "succeeded";
        state.profile = { ...state.profile, ...action.payload.patient };
      })
      .addCase(updatePatientProfile.rejected, (state, action) => {
        state.editStatus = "failed";
        state.error = action.payload;
      });

    // Delete Patient
    builder
      .addCase(deletePatient.pending, (state) => {
        state.deleteStatus = "loading";
        state.error = null;
      })
      .addCase(deletePatient.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.profile = null;
      })
      .addCase(deletePatient.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetState } = patientSlice.actions;
export default patientSlice.reducer;
