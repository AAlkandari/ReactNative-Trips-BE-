const express = require("express");
const passport = require("passport");
const upload = require("../../middleware/multer");
const router = express.Router();

const {
  findProfileById,
  newUserProfile,
  profileList,
  editProfile,
} = require("./profiles.controllers");

router.param("profileId", async (req, res, next, profileId) => {
  const profile = await findProfileById(profileId, next);
  if (profile) {
    req.profile = profile;
    next();
  } else {
    next({ status: 404, message: "Profile Not Found !" });
  }
});

router.get("/", profileList);
router.get(
  "/newProfile",
  passport.authenticate("jwt", { session: false }),
  newUserProfile
);
router.put(
  "/:profileId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  editProfile
);

module.exports = router;
