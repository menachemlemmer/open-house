const Listing = require("../models/listing");

async function index(req, res) {
  try {
    const listings = await Listing.find();
    console.log(listings);
    res.render("listings/index.ejs");
  } catch (error) {
    console.log(error);
  }
}

function newPage(req, res) {
  res.render("listings/new.ejs");
}

async function create(req, res) {
  req.body.owner = req.session.user._id;
  await Listing.create(req.body);
  res.redirect("/listings");
}

module.exports = {
  index,
  new: newPage,
  create,
};
