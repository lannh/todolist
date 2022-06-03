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
		const testUserId = "62997f873db1beea8cd74d15";
		const expectedTasksList = [
			"629978af1612f4476fe554c9",
			"6299786b27c503e398ae778a",
			"629977c10df9585e1799b280",
			"62997639c19ecce01a612ad5",
			"629974f9b7e8b8e88d6f8b2b",
			"6299738339b014f0491e3186"          
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
		await taskModel.deleteMany({_id:testingTask._id});
		mongoose.disconnect();
	});
});