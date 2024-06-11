const Listing = require("../models/listing");

async function index(req, res) {
  try {
    const populatedListings = await Listing.find({}).populate("owner");
    res.render("listings/index.ejs", {
      listings: populatedListings,
    });
  } catch (error) {
    console.log(error);
  }
}

function newPage(req, res) {
  res.render("listings/new.ejs");
}

async function create(req, res) {
  try {
    req.body.owner = req.session.user._id;
    await Listing.create(req.body);
    res.redirect("/listings");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
}

async function show(req, res) {
  try {
    const populatedListing = await Listing.findById(
      req.params.listingId
    ).populate("owner");
    res.render("listings/show.ejs", {
      listing: populatedListing,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
}

async function deleteListing(req, res) {
  try {
    const listing = await Listing.findById(req.params.listingId);
    if (listing.owner.equals(req.session.user._id)) {
      await listing.deleteOne();
      res.redirect("/listings");
    } else {
      res.send("You don't have permission to do that");
    }
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
}

async function edit(req, res) {
  try {
    const currentListing = await Listing.findById(req.params.listingId);
    res.render("listings/edit.ejs", {
      listing: currentListing,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
}

async function update(req, res) {
  try {
    const currentListing = await Listing.findById(req.params.listingId);
    if (currentListing.owner.equals(req.session.user._id)) {
      await currentListing.updateOne(req.body);
      res.redirect("/listings");
    } else {
      res.send("You do not have permission to do that");
    }
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
}

module.exports = {
  index,
  new: newPage,
  create,
  show,
  delete: deleteListing,
  edit,
  update,
};
