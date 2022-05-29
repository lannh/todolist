const mongoose = require("mongoose");

const BlockSchema = new mongoose.Schema(
	{
		startTime: {
			type: Number,
			required: true,
		},
		endTime: {
			type: Number,
			required: true,
		},
		startTimeFlexibility: {
			type: Number,
			default: 0,
		},
		endTimeFlexibility: {
			type: Number,
			default: 0,
		},
	},
	{ collection: "Blocks"}
);

const Block = mongoose.model("Block", BlockSchema);

module.exports = Block;