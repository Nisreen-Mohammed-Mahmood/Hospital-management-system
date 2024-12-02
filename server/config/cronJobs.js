const cron = require("node-cron");
const Appointment = require("../models/Appointment");
const sendEmail = require("../config/mailer");

cron.schedule("0 9 * * *", async () => {
  try {
    // Get appointments happening tomorrow
    const tomorrow = new Date(Date.now() + 86400000);
    const appointments = await Appointment.find({
      appointment_date: { $gte: tomorrow, $lte: tomorrow },
      status: "confirmed",
    });

    appointments.forEach(async (appointment) => {
      const patient = appointment.patient_id;
      const doctor = appointment.doctor_id;

      // Send reminder to patient
      await sendEmail(
        patient.email,
        "Appointment Reminder",
        `Dear ${patient.name}, you have an appointment tomorrow with Dr. ${doctor.name} at ${appointment.time}.`,
        `<p>Dear ${patient.name},</p><p>Reminder: You have an appointment tomorrow with Dr. ${doctor.name} at ${appointment.time}.</p>`
      );

      // Send reminder to doctor
      await sendEmail(
        doctor.email,
        "Appointment Reminder",
        `Dear Dr. ${doctor.name}, you have an appointment tomorrow with ${patient.name} at ${appointment.time}.`,
        `<p>Dear Dr. ${doctor.name},</p><p>Reminder: You have an appointment tomorrow with ${patient.name} at ${appointment.time}.</p>`
      );
    });
  } catch (err) {
    console.log("Error sending appointment reminder:", err);
  }
});
