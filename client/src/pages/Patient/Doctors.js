import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { fetchAllDoctors } from "../../features/doctorSlice";
import { fetchDoctorSpecializations } from "../../features/doctorSpecializationSlice";

// Dummy data for fallback
const dummyDoctors = [
  {
    id: 1,
    name: "Dr. John Doe",
    office_number: "1234567890",
    specialization: "Cardiologist",
    location: "New York",
    is_active: true,
  },
  {
    id: 2,
    name: "Dr. Jane Smith",
    office_number: "9876543210",
    specialization: "Neurologist",
    location: "California",
    is_active: true,
  },
  {
    id: 3,
    name: "Dr. Richard Roe",
    office_number: "5647382910",
    specialization: "Pediatrician",
    location: "Texas",
    is_active: false,
  },
];

const dummySpecializations = [
  "Cardiologist",
  "Neurologist",
  "Pediatrician",
  "Dermatologist",
  "Orthopedist",
];

const Doctors = () => {
  const dispatch = useDispatch();
  const { doctors, isLoading, error } = useSelector((state) => state.doctors);
  const { doctorSpecialization } = useSelector(
    (state) => state.doctorsSpecializations
  );

  // Local state for filtering
  const [selectedSpecialization, setSelectedSpecialization] = useState("");

  // Local state for modal
  const [openModal, setOpenModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentData, setAppointmentData] = useState({
    visit_datetime: "",
    reason: "",
    is_follow_up: false,
  });

  // Fetch doctors and specializations when component mounts
  useEffect(() => {
    dispatch(fetchAllDoctors());
    dispatch(fetchDoctorSpecializations());
  }, [dispatch]);

  // Handle specialization filter change
  const handleSpecializationChange = (e) => {
    setSelectedSpecialization(e.target.value);
  };

  // Filter doctors based on selected specialization
  const filteredDoctors = selectedSpecialization
    ? dummyDoctors.filter(
        (doctor) => doctor.specialization === selectedSpecialization
      )
    : doctors;

  // Use dummy data if no doctors are available
  const displayDoctors = doctors.length ? filteredDoctors : dummyDoctors;

  // Use dummy data for specializations if unavailable
  const displaySpecializations = doctorSpecialization?.length
    ? doctorSpecialization
    : dummySpecializations;

  // Handle Modal open/close
  const handleOpenModal = (doctor) => {
    setSelectedDoctor(doctor);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedDoctor(null);
    setAppointmentData({ visit_datetime: "", reason: "", is_follow_up: false });
  };

  // Handle form data change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

    const handleCheckboxChange = (e) => {
      setAppointmentData((prevData) => ({
        ...prevData,
        is_follow_up: e.target.checked,
      }));
    };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Logic for submitting the appointment (e.g., dispatch an action)
    console.log("Appointment data:", appointmentData);
    handleCloseModal();
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Doctors List
      </Typography>

      {isLoading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <>
          {/* Specialization Filter */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Specialization</InputLabel>
            <Select
              value={selectedSpecialization}
              onChange={handleSpecializationChange}
              label="Specialization"
            >
              <MenuItem value="">
                <em>All Specializations</em>
              </MenuItem>
              {displaySpecializations.map((spec) => (
                <MenuItem key={spec} value={spec}>
                  {spec}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Doctors Grid */}
          <Grid container spacing={3}>
            {displayDoctors.map((doctor) => (
              <Grid item xs={12} sm={6} md={4} key={doctor.id}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardContent>
                    <Typography variant="h6">{doctor.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Specialization: {doctor.specialization}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Location: {doctor.location}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Office Number: {doctor.office_number}
                    </Typography>
                    <Typography
                      variant="body2"
                      color={doctor.is_active ? "green" : "red"}
                    >
                      Status: {doctor.is_active ? "Active" : "Inactive"}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenModal(doctor)}
                      sx={{ mt: 2 }}
                    >
                      Get Appointment
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Modal for Appointment */}
          <Dialog open={openModal} onClose={handleCloseModal}>
            <DialogTitle>
              Get An Appointment with Dr. {selectedDoctor?.name}
            </DialogTitle>
            <DialogContent>
              <TextField
                label="Visit Date and Time"
                type="datetime-local"
                fullWidth
                value={appointmentData.visit_datetime}
                onChange={handleInputChange}
                name="visit_datetime"
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ my: 2 }}
              />
              <TextField
                label="Reason for Visit"
                fullWidth
                multiline
                rows={4}
                value={appointmentData.reason}
                onChange={handleInputChange}
                name="reason"
                sx={{ mb: 2 }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={appointmentData.is_follow_up}
                    onChange={handleCheckboxChange}
                    name="is_follow_up"
                    color="primary"
                  />
                }
                label="Follow Up?"
                sx={{ mb: 2 }}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleCloseModal}
                color="error"
                variant="contained"
              >
                Cancel
              </Button>
              <Button
                onClick={handleFormSubmit}
                color="primary"
                variant="contained"
              >
                Resuest Appointment
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default Doctors;
