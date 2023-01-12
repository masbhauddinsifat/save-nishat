const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../model/user.model");

const JWT_SECRET =
	"hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

router.post("/sign-up", async (req, res) => {
	const { firstName, lastName, email, password, registrationNumber } = req.body;

	const encryptedPassword = await bcrypt.hash(password, 10);
	try {
		const oldUser = await User.findOne({ email });

		if (oldUser) {
			return res.json({ error: "User Exists" });
		}
		await User.create({
			firstName,
			lastName,
			email,
			password: encryptedPassword,
			registrationNumber,
		});
		res.send({ status: 200, message: "Sign Up Success" });
	} catch (error) {
		res.send({ status: 400, error });
	}
});

router.post("/login", async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });
	if (!user) {
		return res.json({ error: "User Not found" });
	}
	if (await bcrypt.compare(password, user.password)) {
		const token = jwt.sign({ email: user.email }, JWT_SECRET, {
			expiresIn: "1h",
		});

		if (res.status(201)) {
			return res.json(token);
		} else {
			return res.json({ error: "error" });
		}
	}
	res.json({ status: "error", error: "Invalid Password" });
});

// app.get("/reset-password/:id/:token", async (req, res) => {
// 	const { id, token } = req.params;
// 	console.log(req.params);
// 	const oldUser = await User.findOne({ _id: id });
// 	if (!oldUser) {
// 		return res.json({ status: "User Not Exists!!" });
// 	}
// 	const secret = JWT_SECRET + oldUser.password;
// 	try {
// 		const verify = jwt.verify(token, secret);
// 		res.render("index", { email: verify.email, status: "Not Verified" });
// 	} catch (error) {
// 		console.log(error);
// 		res.send("Not Verified");
// 	}
// });

// app.post("/reset-password/:id/:token", async (req, res) => {
// 	const { id, token } = req.params;
// 	const { password } = req.body;

// 	const oldUser = await User.findOne({ _id: id });
// 	if (!oldUser) {
// 		return res.json({ status: "User Not Exists!!" });
// 	}
// 	const secret = JWT_SECRET + oldUser.password;
// 	try {
// 		const verify = jwt.verify(token, secret);
// 		const encryptedPassword = await bcrypt.hash(password, 10);
// 		await User.updateOne(
// 			{
// 				_id: id,
// 			},
// 			{
// 				$set: {
// 					password: encryptedPassword,
// 				},
// 			}
// 		);

// 		res.render("index", { email: verify.email, status: "verified" });
// 	} catch (error) {
// 		console.log(error);
// 		res.json({ status: "Something Went Wrong" });
// 	}
// });

// app.post("/forgot-password", async (req, res) => {
// 	const { email } = req.body;
// 	try {
// 		const oldUser = await User.findOne({ email });
// 		if (!oldUser) {
// 			return res.json({ status: "User Not Exists!!" });
// 		}
// 		const secret = JWT_SECRET + oldUser.password;
// 		const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
// 			expiresIn: "5m",
// 		});
// 		const link = `http://localhost:5000/reset-password/${oldUser._id}/${token}`;
// 		var transporter = nodemailer.createTransport({
// 			service: "gmail",
// 			auth: {
// 				user: "adarsh438tcsckandivali@gmail.com",
// 				pass: "rmdklolcsmswvyfw",
// 			},
// 		});

// 		var mailOptions = {
// 			from: "youremail@gmail.com",
// 			to: "thedebugarena@gmail.com",
// 			subject: "Password Reset",
// 			text: link,
// 		};

// 		transporter.sendMail(mailOptions, function (error, info) {
// 			if (error) {
// 				console.log(error);
// 			} else {
// 				console.log("Email sent: " + info.response);
// 			}
// 		});
// 		console.log(link);
// 	} catch (error) {}
// });

module.exports = router;
