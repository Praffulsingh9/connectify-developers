const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const User = require("../../models/User");
const Profile = require("../../models/Profile");

router.get("/test", (req, res) => res.json({ msg: "Profile works" }));

// @route GET api/profile
// @desc Get current user profile
// @access Private

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const error = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.status(200).json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
