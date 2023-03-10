const mongoose = require("mongoose");

const ThisisSchema = new mongoose.Schema(
	{
		thesisName: { type: String, required: true },
		batch: { type: String, required: true },
		department: { type: String, required: true },
		studentOne: { type: String, required: true },
		studentTwo: { type: String },
		studentThree: { type: String },
		studentFour: { type: String },
		supervisorName: { type: String, required: true },
		registrationNumber: { type: String },
		document: { type: String, required: true },
	},
	{
		collection: "Thisis",
	}
);

module.exports = mongoose.model("ThisisModel", ThisisSchema);
