import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBillingByPatient } from "../../features/billingSlice";
import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Alert,
} from "@mui/material";

const BillingHistory = () => {
  const dispatch = useDispatch();

  const patientId = useSelector((state) => state.auth?.user?.id);
  const { billings, loading, error } = useSelector((state) => state.billing);

  useEffect(() => {
    if (patientId) {
      dispatch(fetchBillingByPatient(patientId));
    }
  }, [dispatch, patientId]);

  return (
    <Box padding={3}>
      <Typography variant="h4" gutterBottom>
        Billing History
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
                <TableCell>Appointment ID</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Amount Paid</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Last Payment Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {billings.length > 0 ? (
                billings.map((billing) => (
                  <TableRow key={billing._id}>
                    <TableCell>{billing.appointment_id}</TableCell>
                    <TableCell>{billing.amount}</TableCell>
                    <TableCell>{billing.amount_paid}</TableCell>
                    <TableCell>{billing.status}</TableCell>
                    <TableCell>
                      {billing.last_payment_date
                        ? new Date(
                            billing.last_payment_date
                          ).toLocaleDateString()
                        : "N/A"}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                    <Typography variant="body1" color="textSecondary">
                      No Records Available
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default BillingHistory;
