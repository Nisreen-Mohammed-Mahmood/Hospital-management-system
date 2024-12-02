const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const cors =require("cors")
require("./config/cronJobs");
require("dotenv").config()


// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

// Initialize Express
const app = express();

//use CORS
app.use(cors())

// Middleware for JSON parsing
app.use(express.json());

// Import Routes
const authRoutes = require("./routes/authRoutes");
const patientRoutes = require("./routes/patientRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const billingRoutes = require("./routes/billingRoutes");
const medicalRecordsRoutes = require("./routes/medicalRecordsRoutes"); 
const confirmationRoutes = require("./routes/confirmationRoutes"); 
const doctorSpecializationRoutes = require("./routes/DoctorSpecificationRoutes"); 

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/confirmation", confirmationRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/doctorSpecialization", doctorSpecializationRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/billings", billingRoutes);
app.use("/api/medicalRecords", medicalRecordsRoutes); 


// Error Handling
app.use(notFound);
app.use(errorHandler);

// Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
