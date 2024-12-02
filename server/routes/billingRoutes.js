const express = require("express");
const {
  createBilling,
  getBillingByPatient,
  updateBilling,
  deleteBilling,
} = require("../controllers/billingControllers");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const router = express.Router();

router
  .route("/")
  .post(protect, authorizeRoles("admin", "doctor"), createBilling);

router
  .route("/:patient_id")
  .get(
    protect,
    authorizeRoles("patient", "admin", "doctor"),
    getBillingByPatient
  );

router
  .route("/:id")
  .put(protect,authorizeRoles("admin", "doctor"), updateBilling) 
  .delete(protect,authorizeRoles("admin"), deleteBilling);

module.exports = router;
