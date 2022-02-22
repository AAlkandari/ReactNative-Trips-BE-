const express = require("express");
const passport = require("passport");
const upload = require("../../middleware/multer");

const {
  tripList,
  fetchTripId,
  tripCreate,
  tripDelete,
  tripUpdate,
} = require("./trips.controllers");

const router = express.Router();

router.param("tripId", async (req, res, next, tripId) => {
  const trip = await fetchTripId(tripId, next);
  if (trip) {
    req.trip = trip;
    next();
  } else {
    next({ status: 404, message: "Trip not found !" });
  }
});

router.get("/", tripList);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  tripCreate
);
router.delete(
  "/:tripId",
  passport.authenticate("jwt", { session: false }),
  tripDelete
);
router.put("/:tripId", upload.single("image"), tripUpdate);

module.exports = router;
