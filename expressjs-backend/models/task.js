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
			default: new Date(),
		},
		end_time: {
			type: Date,
			default: new Date(+new Date() + 7*24*60*60*1000),
		},
		priority_level: {
			type: String,
			trim: true,
			default: "normal",
		}
	},
	{ collection: "Tasks" }
);

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;