require("dotenv").config();
const mongoose = require("mongoose");
const taskServices = require("../models/task-services");
const taskModel = require("../models/task");
/*const userServices = require("./user-services");*/

let testingTask = {};

/*const testingTask2 = 
{
	_id: "6295985301c23681eed3ef5d",
	task_name: "tesing-task2",
	due_date: new Date("11-30-2030"),
	priority_level: "high",
	length: 19000
};*/

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

		const newTask = 
			{taskName: "testing-test", due_date: new Date("12-31-2029"), priority_level: "normal", length: 10001};
		const taskToSave = new taskModel(newTask);
		testingTask = await taskToSave.save();
	});

	function compareTasks(lhs, rhs)
	{
		if(rhs === undefined || rhs === null)
			return false;
        
		const lhsDueDate = new Date(lhs.due_date);
		const rhsDueDate = new Date (rhs.due_date);

		return String(lhs._id) === String(rhs._id) && lhs.taskName === rhs.taskName &&
            lhsDueDate.toISOString()===rhsDueDate.toISOString() &&
            lhs.priority_level === rhs.priority_level && lhs.length === rhs.length;
	}

	test("find task by id", async () => 
	{
		const result = await taskServices.findTaskById(testingTask._id);

		expect(compareTasks(testingTask, result)).toBeTruthy();
	});

	test("find task by id  -- will fail", async () => 
	{

		let testID = "";
		for(let i=0; i<100000; ++i)
			testID += String(i);

		const result = await taskServices.findTaskById(testID);

		expect(result).toBe(undefined);
	});

	function compareTasksList(lhs, rhs)
	{
		let res = true;
		if(lhs.length !== rhs.length)
			res = false;
		else
		{
			let n = lhs.length;
			for(let i=0; i<n; ++i)
				if(lhs[i] !== String(rhs[i]._id))
				{
					res = false;
					break;
				}
		}
		return res;
	}

	test("find task by user id", async () => 
	{
		const testUserId = "62896e58b1cb8555ed799f3c";
		const expectedTasksList = [
			"627d828d7ba44d05e54b5781",
			"627d85a67ba44d05e54b5782",
			"627d86197ba44d05e54b5783",
			"627d87cb7ba44d05e54b5787",
			"627d88157ba44d05e54b5788",
			"628e77b910f5bcd30f2a0eeb",
			"628e77e710f5bcd30f2a0eec",
			"628e782510f5bcd30f2a0eed"            
		];

		const result = await taskServices.findTasksByUserId(testUserId);

		expect(compareTasksList(expectedTasksList, result)).toBeTruthy();
	});

	test("find task by user id  -- will fail", async () => 
	{

		let testID = "";
		for(let i=0; i<100000; ++i)
			testID += String(i);

		const result = await taskServices.findTasksByUserId(testID);

		expect(result).toBe(undefined);
	});

	test("delete task by id", async () => 
	{
		const newTask = 
			{taskName: "testing-test", due_date: new Date("12-31-2029"), priority_level: "normal", length: 10001};
		const taskToSave = new taskModel(newTask);
		const taskToDel = await taskToSave.save();

		await taskServices.deleleTaskByID(taskToDel._id,null);

		const result = await taskModel.findById(taskToDel._id);

		expect(result).toBe(null);
	});

	test("delete task by id  -- will fail", async () => 
	{

		let testID = "";
		for(let i=0; i<100000; ++i)
			testID += String(i);

		const result = await taskServices.deleleTaskByID(testID, null);

		expect(result).toBe(undefined);
	});

	test("update task by id", async () => 
	{
		testingTask.priority_level= "high";
		testingTask.length = 20000;

		await taskServices.updateTaskByID(testingTask._id, testingTask);
        
		const updatedTask = await taskModel.findById(testingTask._id);

		expect(compareTasks(testingTask, updatedTask)).toBeTruthy();
	});

	test("update task by id  -- will fail", async () => 
	{

		/*let testID = "";
		for(let i=0; i<100000; ++i)
			testID += String(i);*/

		const result = await taskServices.updateTaskByID(testingTask._id,null);

		expect(result).toBe(undefined);
	});

	afterAll(async () => 
	{
		await taskModel.findByIdAndDelete(testingTask._id);
		mongoose.disconnect();
	});
});