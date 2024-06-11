const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/users");

router.get("/profile", userCtrl.profile);

module.exports = router;
