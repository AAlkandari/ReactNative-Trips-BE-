const Trip = require("../../db/models/Trip");

exports.fetchTripId = async (TripId, next) => {
  try {
    const trip = await Trip.findById(TripId);
    return trip;
  } catch (error) {
    next(error);
  }
};

exports.tripList = async (req, res, next) => {
  try {
    const trips = await Trip.find().populate({
      path: "owner",
      select: "profile",
    });
    return res.json(trips);
  } catch (error) {
    next(error);
  }
};

exports.tripCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `/${req.file.path}`;
    }
    req.body.owner = req.user._id;
    const newTrip = await Trip.create(req.body);
    await newTrip.populate({
      path: "owner",
      select: "profile",
    });
    return res.status(201).json(newTrip);
  } catch (error) {
    next(error);
  }
};

exports.tripDelete = async (req, res, next) => {
  try {
    const deleteTrip = await Trip.findByIdAndDelete({
      _id: req.trip.id,
    }).populate("owner");
    res.json(deleteTrip);
  } catch (error) {
    next(error);
  }
};
exports.tripUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/${req.file.path}`;
    }
    console.log(req.body); //new:true to to show the update after change immiditly
    const trip = await Trip.findByIdAndUpdate(
      { _id: req.trip.id, owner: req.trip.owner },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.json(trip);
  } catch (err) {
    next(err);
  }
};
