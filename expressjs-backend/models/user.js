const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		taskName: {
			type: String,
			required: true,
			trim: true,
		},
		date: {
			type: String,
			required: true,
			trim: true,
			validate(value) 
			{
				if (value.length < 2)
					throw new Error("Invalid job," + 
						"must be at least 2 characters.");
			},
		},
		location: {
			type: String,
			required: true,
			trim: true,
		},
		tasks_list: {
			type: Array,
			default: [],
		},
	},
	{ collection: "tasks_list" }
);
	

const User = mongoose.model("User", UserSchema);

module.exports = User;