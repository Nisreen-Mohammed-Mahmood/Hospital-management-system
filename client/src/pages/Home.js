import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Card,
  CardMedia,
  CardContent,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import DoctorImage from "../assets/images/appointment.jpg";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const Home = () => {
  return (
    <Box>
      {/* Welcome Section */}
      <Box
        sx={{
          height: "calc(100vh - 100px)",
          backgroundImage:
            "url('https://png.pngtree.com/background/20230520/original/pngtree-group-of-doctors-pose-together-to-show-their-profession-picture-image_2673163.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          color: "#fff",
          borderRadius: "30px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            maxWidth: "100%",
            height: "100%",
            px: 4,
            py: 3,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            borderRadius: "30px",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              textTransform: "uppercase",
              fontWeight: "bold",
              textShadow: "3px 3px 15px rgba(0, 0, 0, 0.8)",
              letterSpacing: "2px",
            }}
          >
            HealthConnect – Dedicated Doctors, Exceptional Care
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 4,
              color: "#f0f0f0",
              textShadow: "2px 2px 10px rgba(0,0,0,0.8)",
              fontSize: "22px",
              fontWeight: "400",
              lineHeight: 1.5,
              maxWidth: "75%",
              mx: "auto",
            }}
          >
            Your health is our commitment. Trust our experienced professionals
            to guide you every step of the way. Schedule appointments and manage
            your healthcare seamlessly.
          </Typography>
          <Button
            component={Link}
            to="/register"
            variant="contained"
            color="secondary"
            size="large"
            sx={{
              letterSpacing: "1px",
              fontWeight: "600",
              px: 4,
              py: 1.5,
              textTransform: "uppercase",
            }}
          >
            Get Started Now <KeyboardArrowRightIcon />
          </Button>
        </Box>
      </Box>

      {/* Doctors Section */}
      <Container sx={{ my: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Meet Our Doctors
        </Typography>
        <Grid container spacing={4}>
          {Array.from({ length: 3 }).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ boxShadow: 3 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={DoctorImage}
                  alt={`Doctor ${index + 1}`}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Dr. John Doe {index + 1}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Specialization: Cardiology
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Experience: 10 years
                  </Typography>
                  <Button
                    component={Link}
                    to={`/doctors/${index + 1}`}
                    fullWidth
                    variant="outlined"
                    color="primary"
                    sx={{ mt: 2 }}
                  >
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Divider sx={{ my: 4 }} />

      {/* Appointment Section */}
      <Container sx={{ textAlign: "center", my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Register Now to Get an Appointment
        </Typography>
        <Typography variant="body1" paragraph>
          Become a member and enjoy seamless appointment scheduling and health
          management.
        </Typography>
        <Button
          component={Link}
          to="/register"
          variant="contained"
          color="secondary"
          size="large"
        >
          Register
        </Button>
      </Container>

      <Divider sx={{ my: 4 }} />

      {/* Why Choose Us Section */}
      <Box
        sx={{ textAlign: "center", my: 4, backgroundColor: "#f9f9f9", py: 4 }}
      >
        <Typography variant="h4" gutterBottom>
          Why Choose Us?
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ padding: 3, boxShadow: 2 }}>
              <Typography variant="h6">Quality Care</Typography>
              <Typography variant="body2" color="textSecondary">
                We provide the highest quality healthcare with our team of
                experts.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ padding: 3, boxShadow: 2 }}>
              <Typography variant="h6">Affordable Prices</Typography>
              <Typography variant="body2" color="textSecondary">
                We believe in providing healthcare that is affordable and
                accessible to all.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ padding: 3, boxShadow: 2 }}>
              <Typography variant="h6">24/7 Support</Typography>
              <Typography variant="body2" color="textSecondary">
                Our support team is here to assist you at any time of the day.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
