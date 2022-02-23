const Profile = require("../../db/models/Profile");

exports.findProfileById = async (profileId, next) => {
  try {
    const findProfile = await Profile.findById(profileId);
    return findProfile;
  } catch (error) {
    next(error);
  }
};

exports.newUserProfile = async (req, res, next) => {
  try {
    const findProfile = await Profile.findOne({
      user: req.user._id,
    }).populate({
      path: "user",
      select: "username",
    });
    res.status(200).json(findProfile);
  } catch (error) {
    console.log(error);
  }
};

exports.profileList = async (req, res, next) => {
  try {
    const profiles = await Profile.find().populate({
      path: "user",
      select: "username",
    });
    res.status(200).json(profiles);
  } catch (error) {
    console.log(error);
  }
};

exports.editProfile = async (req, res, next) => {
  try {
    await Profile.findByIdAndUpdate(req.profile, req.body, {
      new: true,
      runValidators: true,
    });
    const findProfile = await Profile.findOne({ user: req.body._id }).populate({
      path: "user",
      select: "username",
    });
    return res.status(201).json(findProfile);
  } catch (error) {
    return next(error);
  }
};
