import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/authSlice";
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
  Alert,
  Snackbar,
} from "@mui/material";
import { styled, keyframes } from "@mui/system";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";

const login_image = require("../../assets/images/login_back.jpg");

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
  backgroundImage: `url(${login_image})`,
  backgroundSize: "cover",
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

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user, isSuccess } = useSelector(
    (state) => state.auth
  );
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [formData, setFormData] = useState({
    role: "patient",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  useEffect(() => {
    if (isSuccess && user) {
      if (!user.isActive) {
        // User is not active, show Snackbar
        setSnackbarMessage(
          "Please confirm your registration by visiting the link sent to your email."
        );
        setSnackbarSeverity("warning");
        setOpenSnackbar(true);
        return;
      }

      // User is active, proceed with navigation
      const roleRedirectMap = {
        patient: "/patient/appointments",
        doctor: "/doctor/dashboard",
        admin: "/admin/dashboard",
      };

      const redirectPath = roleRedirectMap[user.role];
      setSnackbarMessage("Welcome to HealthConnect !");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      if (redirectPath) {
        navigate(redirectPath);
      }
    }
  }, [
    isSuccess,
    user,
    navigate,
    setSnackbarMessage,
    setSnackbarSeverity,
    setOpenSnackbar,
  ]);

  useEffect(() => {
    if (error) {
      setSnackbarMessage(error);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  }, [error, setSnackbarMessage, setSnackbarSeverity, setOpenSnackbar]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    dispatch(login(formData));
  };

  return (
    <SplitContainer>
      <FormContainer>
        <Box
          position="absolute"
          top={16}
          right={16}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0 5px",
          }}
        >
          <Typography sx={{ fontSize: "15px" }}>Login as</Typography>
          <Select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            displayEmpty
            sx={{
              color: "primary.main",
              fontSize: "15px",
              border: "none !important",
              "& .MuiSelect-select": {
                paddingRight: "24px",
              },
            }}
          >
            <MenuItem value="patient" sx={{ fontSize: "15px" }}>
              Patient
            </MenuItem>
            <MenuItem value="doctor" sx={{ fontSize: "15px" }}>
              Doctor
            </MenuItem>
            <MenuItem value="admin" sx={{ fontSize: "15px" }}>
              Admin
            </MenuItem>
          </Select>
        </Box>

        <StyledForm onSubmit={handleLogin}>
          <Typography
            variant="h4"
            align="center"
            sx={{ color: "primary.main", mb: 3 }}
          >
            Welcome Back
          </Typography>

          <Stack direction="column" spacing={2} mb={2}>
            <StyledTextField
              fullWidth
              variant="standard"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
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
          </Stack>

          <StyledButton fullWidth type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </StyledButton>

          <Divider sx={{ my: 3 }} />
          <Button
            fullWidth
            variant="text"
            sx={{ color: "primary.main", fontWeight: "500" }}
            onClick={() => navigate("/register")}
          >
            Don&apos;t have an account?{" "}
            <span style={{ textDecoration: "underline" }}>Register</span>
          </Button>
        </StyledForm>

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
      </FormContainer>

      <ImageContainer sx={{ display: isSmallScreen ? "none" : "block" }} />
    </SplitContainer>
  );
};

export default Login;
