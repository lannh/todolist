require("dotenv").config();
const mongoose = require("mongoose");
const userModel = require("../models/user");
const userServices = require("../models/user-services");

let testingUser = {};

describe("Connection", () => 
{
	beforeAll(async () => 
	{
		await mongoose.connect("mongodb+srv://" +
        process.env.MONGO_USER +
        ":" +
        process.env.MONGO_PWD +
        "@" +
        process.env.MONGO_CLUSTER +
        "/" +
        process.env.MONGO_DB +
        "?retryWrites=true&w=majority",
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		const newUser = 
			{name: "testing-user", schedule: [], tasks_list: []};
		const userToSave = new userModel(newUser);
		testingUser = await userToSave.save();
	});

	function compareUsers(lhs, rhs)
	{
		if(rhs === undefined || rhs === null)
			return false;
        
		return String(lhs._id) === String(rhs._id) && lhs.name === rhs.name;
	}

	test("find user by id", async () => 
	{
		const result = await userServices.findUserById(testingUser._id);
		expect(compareUsers(testingUser, result)).toBeTruthy();
	});

	test("delete user by id", async () => 
	{
		const newUser = {name: "testing-user", schedule: [], tasks_list: []};
		const userToSave = new userModel(newUser);
		const userToDelete = await userToSave.save();

		await userServices.deleleUserByID(userToDelete._id);

		const result = await userModel.findById(userToDelete._id);

		expect(result).toBe(null);
	});

	afterAll(async () => 
	{
		await userModel.findByIdAndDelete(testingUser._id);
		mongoose.disconnect();
	});
});