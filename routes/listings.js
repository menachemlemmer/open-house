const express = require("express");
const router = express.Router();
const listingCtrl = require("../controllers/listings");

router.get("/", listingCtrl.index);

router.get("/new", listingCtrl.new);

router.post("/", listingCtrl.create);

module.exports = router;
