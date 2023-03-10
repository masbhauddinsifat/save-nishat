const express = require("express");
const router = express.Router();
const Thesis = require("../model/thisis.model");

router.post("/", async (req, res) => {
	const thesis = await Thesis.save(req.body);
	res.json({ status: "success", data: thesis });
});

router.get("/", async (req, res) => {
	try {
		const users = await Thesis.find();
		res.json(users);
	} catch (err) {
		res.send("Error " + err);
	}
});

router.get("/:id", async (req, res) => {
	try {
		const user = await Thesis.findById(req.params.id);
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
