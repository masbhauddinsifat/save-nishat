const express = require("express");
const router = express.Router();
const User = require("../model/user.model");

router.get("/", async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (err) {
		res.send("Error " + err);
	}
});

router.get("/:id", async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		res.send(user);
	} catch (err) {
		res.send("Error " + err);
	}
});

// router.patch("/:id", async (req, res) => {
// 	try {
// 		const user = await User.findById(req.params.id);
// 		const a1 = await user.save();
// 		res.json(a1);
// 	} catch (err) {
// 		res.send("Error");
// 	}
// });

module.exports = router;
