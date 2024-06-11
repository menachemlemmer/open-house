const express = require("express");
const router = express.Router();
const listingCtrl = require("../controllers/listings");

router.get("/", listingCtrl.index);

router.get("/new", listingCtrl.new);

router.post("/", listingCtrl.create);

router.get("/:listingId", listingCtrl.show);

router.delete("/:listingId", listingCtrl.delete);

router.get("/:listingId/edit", listingCtrl.edit);

router.put("/:listingId", listingCtrl.update);

module.exports = router;
