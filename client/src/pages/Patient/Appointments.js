import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointments, clearError } from "../../features/appointmentSlice";
import {
  CircularProgress,
  Alert,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
} from "@mui/material";

const Appointments = () => {
  const dispatch = useDispatch();
  const { appointments, loading, error } = useSelector(
    (state) => state.appointments
  );

  useEffect(() => {
    dispatch(fetchAppointments());

    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        My Appointments
      </Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" marginY={3}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error.message || "An error occurred"}</Alert>
      ) : (
        <TableContainer component={Paper} elevation={3} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Doctor</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Reason</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                    <Typography variant="body1" color="textSecondary">
                      No appointments found.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                appointments.map((appointment, index) => (
                  <TableRow
                    key={appointment._id}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                    }}
                  >
                    <TableCell>
                      {appointment.doctor_id?.name || "Unknown"}
                    </TableCell>
                    <TableCell>
                      {new Date(appointment.visit_datetime).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={
                          appointment.status === 1 ? "Confirmed" : "Canceled"
                        }
                        color={appointment.status === 1 ? "success" : "error"}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>{appointment.reason || "N/A"}</TableCell>
                    <TableCell align="center">
                      {appointment.status === 0 && (
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() =>
                            console.log("Request new appointment clicked")
                          }
                        >
                          Request New Appointment
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Appointments;
