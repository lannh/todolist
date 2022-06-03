const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
	{
		taskName: {
			type: String,
			required: true,
			trim: true,
		},
		length: {
			type: Number, 
			required: true,
			default: 15
		},
		date: {
			type: Date,
			default: new Date(Date.now),
		},
		priority_level: {
			type: String,
			trim: true,
			default: "normal",
		},
	},
	{ collection: "Tasks" }
);

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;