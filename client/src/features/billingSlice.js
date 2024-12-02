import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axios";

// Fetch billing history by patient ID
export const fetchBillingByPatient = createAsyncThunk(
  "billing/fetchBillingByPatient",
  async (patientId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/billings/${patientId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Create a new billing record
export const createBilling = createAsyncThunk(
  "billing/createBilling",
  async (billingData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/billings/`, billingData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to create billing record"
      );
    }
  }
);

// Update an existing billing record
export const updateBilling = createAsyncThunk(
  "billing/updateBilling",
  async ({ id, billingData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/billings/${id}`, billingData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update billing record"
      );
    }
  }
);

// Delete a billing record
export const deleteBilling = createAsyncThunk(
  "billing/deleteBilling",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/billings/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to delete billing record"
      );
    }
  }
);

const billingSlice = createSlice({
  name: "billing",
  initialState: {
    billings: [], // Array to store fetched billing records
    loading: false, // Loading state for async actions
    error: null, // Error state
  },
  reducers: {
    clearBillingState: (state) => {
      state.billings = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Billing by Patient
      .addCase(fetchBillingByPatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBillingByPatient.fulfilled, (state, action) => {
        state.loading = false;
        state.billings = action.payload;
      })
      .addCase(fetchBillingByPatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create Billing
      .addCase(createBilling.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBilling.fulfilled, (state, action) => {
        state.loading = false;
        state.billings.push(action.payload); // Add the new billing record to the state
      })
      .addCase(createBilling.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Billing
      .addCase(updateBilling.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBilling.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.billings.findIndex(
          (billing) => billing._id === action.payload._id
        );
        if (index !== -1) {
          state.billings[index] = action.payload; // Update the specific billing record
        }
      })
      .addCase(updateBilling.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Billing
      .addCase(deleteBilling.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBilling.fulfilled, (state, action) => {
        state.loading = false;
        state.billings = state.billings.filter(
          (billing) => billing._id !== action.meta.arg
        ); // Remove the deleted record
      })
      .addCase(deleteBilling.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearBillingState } = billingSlice.actions;
export default billingSlice.reducer;
