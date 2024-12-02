import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  InputAdornment,
  IconButton,
  Divider,
  Stack,
  useMediaQuery,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled, keyframes } from "@mui/system";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import DateRangeIcon from "@mui/icons-material/DateRange";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { register } from "../../features/authSlice";
import { useDispatch, useSelector } from "react-redux";

const register_image = require("../../assets/images/register_back.jpg");

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const SplitContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  minHeight: "calc(100vh - 100px)",
  [theme.breakpoints.down("md")]: { flexDirection: "column" },
}));

const FormContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "40px",
  animation: `${fadeIn} 0.8s ease-out`,
  position: "relative",
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  backgroundImage: `url(${register_image})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  [theme.breakpoints.down("md")]: { display: "none" },
}));

const StyledForm = styled("form")(({ theme }) => ({
  maxWidth: 400,
  width: "100%",
}));

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": { display: "none" },
    "& .MuiInputBase-input": {
      borderBottom: "2px solid primary.main",
      transition: "border-color 0.3s",
    },
    "&:hover .MuiInputBase-input": { borderBottomColor: "#1565c0" },
  },
  "& input": { padding: "10px", marginBottom: "10px" },
});

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  fontWeight: "bold",
  padding: theme.spacing(1.5),
  borderRadius: 8,
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  transition: "background-color 0.3s, transform 0.3s",
  boxShadow: "0px 4px 10px rgba(25, 118, 210, 0.5)",
  "&:hover": {
    backgroundColor: "#1565c0",
    transform: "scale(1.03)",
  },
}));

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    identityCardNumber: "",
    role: "patient",
  });

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(register(formData));
      if (register.fulfilled.match(resultAction)) {
        setSnackbarMessage("Registration successful!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        // Redirect after successful registration
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else if (register.rejected.match(resultAction)) {
        setSnackbarMessage(resultAction.payload || "Registration failed");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    } catch (err) {
      setSnackbarMessage("An error occurred during registration");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <SplitContainer>
      <FormContainer sx={{ maxHeight: "100%", overflow: "auto" }}>
        <StyledForm>
          <Typography
            variant="h4"
            align="center"
            sx={{ color: "primary.main", mb: 3 }}
          >
            Create an Account
          </Typography>

          <Stack direction="column" spacing={2} mb={2}>
            <StyledTextField
              fullWidth
              variant="standard"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />

            <StyledTextField
              fullWidth
              variant="standard"
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />

            <StyledTextField
              fullWidth
              variant="standard"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="primary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                      sx={{ color: "primary.main" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <StyledTextField
              fullWidth
              variant="standard"
              name="phoneNumber"
              type="tel"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />

            <StyledTextField
              fullWidth
              variant="standard"
              name="dateOfBirth"
              type="date"
              label="Date of Birth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              required
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DateRangeIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />

            <Select
              fullWidth
              variant="standard"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              displayEmpty
              required
              sx={{
                borderBottom: "2px solid",
                borderColor: "primary.main",
              }}
            >
              <MenuItem value="">Gender</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>

            <StyledTextField
              fullWidth
              variant="standard"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleInputChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <HomeIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />

            <StyledTextField
              fullWidth
              variant="standard"
              name="identityCardNumber"
              placeholder="Identity Card Number"
              value={formData.identityCardNumber}
              onChange={handleInputChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          <StyledButton fullWidth onClick={handleRegister}>
            {loading ? "Registering..." : "Register"}
          </StyledButton>

          <Divider sx={{ my: 3 }} />
          <Button
            fullWidth
            variant="text"
            sx={{ color: "primary.main", fontWeight: "500" }}
            onClick={() => navigate("/login")}
          >
            Already have an account?{" "}
            <span style={{ textDecoration: "underline" }}>Login</span>
          </Button>
        </StyledForm>
      </FormContainer>

      <ImageContainer sx={{ display: isSmallScreen ? "none" : "block" }} />

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </SplitContainer>
  );
};

export default Register;
