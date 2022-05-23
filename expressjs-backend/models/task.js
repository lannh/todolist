const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
	{
		task_name: {
			type: String,
			required: true,
			trim: true,
		},
		start_time: {
			type: Date,
			required: true,
		},
		end_time: {
			type: Date,
			required: true,
		},
		priority_level: {
			type: String,
			required: true,
		}
	},
	{ collection: "Tasks" }
);

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;