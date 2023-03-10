const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./uploads");
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

const mongoUrl =
	"mongodb+srv://anamul:anamul12345@cluster0.jaywm49.mongodb.net/?retryWrites=true&w=majority";

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

const upload = multer({ storage: storage });

// var nodemailer = require("nodemailer");

mongoose
	.connect(mongoUrl, {
		useNewUrlParser: true,
	})
	.then(() => {
		console.log("Connected to database");
	})
	.catch((e) => console.log(e));

app.get("/", async (req, res) => {
	try {
		res.send("hello world!");
	} catch (err) {
		res.send("Error " + err);
	}
});

const userRouter = require("./routes/user.router");
const authRouter = require("./routes/auth.router");
const thesisRouter = require("./routes/thisis.router");

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/thesis", thesisRouter);
app.post("/upload", upload.single("pdf"), (req, res) => {
	// req.file contains information about the uploaded file
	res.json({ message: "File uploaded successfully!", data: req.file });
});

// require("./model/user.model");

// const User = mongoose.model("UserModel");

// app.post("/userData", async (req, res) => {
// 	const { token } = req.body;
// 	try {
// 		const user = jwt.verify(token, JWT_SECRET, (err, res) => {
// 			if (err) {
// 				return "token expired";
// 			}
// 			return res;
// 		});
// 		console.log(user);
// 		if (user == "token expired") {
// 			return res.send({ status: "error", data: "token expired" });
// 		}

// 		const useremail = user.email;
// 		User.findOne({ email: useremail })
// 			.then((data) => {
// 				res.send({ status: "ok", data: data });
// 			})
// 			.catch((error) => {
// 				res.send({ status: "error", data: error });
// 			});
// 	} catch (error) {}
// });

app.listen(3000, () => {
	console.log("Server Started at 3000");
});
