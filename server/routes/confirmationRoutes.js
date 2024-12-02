const express = require("express");
const { confirmAccount } = require("../controllers/confirmationController");

const router = express.Router();

router.get("/confirm-account", confirmAccount);

module.exports = router;
