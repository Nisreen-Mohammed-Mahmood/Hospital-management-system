import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPatientProfile,
  updatePatientProfile,
  resetState,
} from "../../features/patientSlice.js";
import {
  Avatar,
  TextField,
  Button,
  Box,
  Typography,
  Snackbar,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

const Profile = () => {
  const dispatch = useDispatch();
  const patientId = useSelector((state) => state.auth.user.id);

  const { profile, editStatus, error } = useSelector((state) => state.patients);

  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    date_of_birth: "",
    gender: "",
    address: "",
    identity_card_number: "",
  });

  useEffect(() => {
    dispatch(fetchPatientProfile(patientId));
  }, [dispatch, patientId]);

  // Update Local State on Profile Change
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.user.name,
        phone_number: profile.user.phone_number,
        date_of_birth: profile.user.date_of_birth.slice(0, 10),
        gender: profile.user.gender,
        address: profile.user.address || "",
        identity_card_number: profile.user.identity_card_number || "",
      });
    }
  }, [profile]);

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Gender Change
  const handleGenderChange = (event) => {
    setFormData({ ...formData, gender: event.target.value });
  };

  // Handle Form Submit
  const handleUpdate = () => {
    dispatch(updatePatientProfile({ patientId, updates: formData }));
  };

  useEffect(() => {
    if (editStatus === "succeeded") {
      dispatch(fetchPatientProfile(patientId));
    }
  }, [dispatch, editStatus, patientId]);

  // Reset State on Snackbar Close
  const handleSnackbarClose = () => {
    dispatch(resetState());
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Avatar
          sx={{ width: 100, height: 100 }}
          src="https://png.pngtree.com/png-vector/20190802/ourlarge/pngtree-patient-user-injured-hospital-flat-color-icon-vector-icon-png-image_1645907.jpg"
        >
          {profile?.user?.name?.[0]?.toUpperCase() || "P"}
        </Avatar>
      </Box>
      <Typography variant="h5" align="center" gutterBottom>
        Profile
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Phone Number"
        name="phone_number"
        value={formData.phone_number}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Date of Birth"
        name="date_of_birth"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={formData.date_of_birth}
        onChange={handleInputChange}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Gender</InputLabel>
        <Select
          label="Gender"
          name="gender"
          value={formData.gender}
          onChange={handleGenderChange}
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </Select>
      </FormControl>
      <TextField
        fullWidth
        margin="normal"
        label="Address"
        name="address"
        value={formData.address}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Identity Card Number"
        name="identity_card_number"
        value={formData.identity_card_number}
        onChange={handleInputChange}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleUpdate}
        disabled={editStatus === "loading"}
      >
        Update Profile
      </Button>
      {error && (
        <Snackbar open autoHideDuration={6000} onClose={handleSnackbarClose}>
          <Alert severity="error" onClose={handleSnackbarClose}>
            {error?.message}
          </Alert>
        </Snackbar>
      )}
      {editStatus === "succeeded" && (
        <Snackbar open autoHideDuration={6000} onClose={handleSnackbarClose}>
          <Alert severity="success" onClose={handleSnackbarClose}>
            Profile updated successfully!
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default Profile;
