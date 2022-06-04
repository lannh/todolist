const userModel = require("./user");
const scheduleModel = require("./schedule");
const dotenv = require("dotenv");
dotenv.config();

async function findUserById(id) 
{
	try 
	{
		return await userModel.findById(id);
	}
	catch (error) 
	{
		console.log(error);
		return undefined;
	}
}

//ADDS TASK TO A SPECIFIED USER
async function addTasktoUser(uid, taskID) 
{

	try
	{		

		//checks if its a valid user
		const us = await findUserById(uid);	//finds the user

		if (us === undefined) 
		{
			console.log("Failed to retreive task for user with id " + uid + ".\n");
			return us;
		}
		//USER IS FOUND
		await userModel.updateOne(	//ERROR RIGHT HERE
			{ _id: us._id },
			{ $push: {tasks_list : taskID} },
			function (error, success) 
			{
				if (error) 
				{
					console.log(error);
				}
				else 
				{
					console.log(success);
				}
			}
		)
		return true;	
	}
	catch (error) 
	{
		console.log(error);
		return false;
	}
}

async function addUser(user) 
{
	try 
	{
		const userToAdd = new userModel(user);
		const scheduleToAdd = new scheduleModel();
		//const tasksListToAdd = [];
		userToAdd["schedule"] = scheduleToAdd._id;
		userToAdd["tasks_list"] = [];
		const savedUser = await userToAdd.save();
		await scheduleToAdd.save();
		return savedUser;
	}
	catch (error) 
	{
		console.log(error);
		return false;
	}
}

 
async function deleleUserByID(id) 
{
	try 
	{
		const user = await userModel.findById(id);
		await scheduleModel.findByIdAndDelete(user["schedule"]);
		return await userModel.findByIdAndDelete(id);
	}
	catch (error) 
	{
		console.log(error);
		return undefined;
	}
}

//this function is to delete a task inside the task_list of a user
async function deleleTaskByID(uid,id) 
{
	try 
	{
		return await userModel.updateOne( 
			{ _id: uid },
			{ $pull: {tasks_list: id} }
		);
	}
	catch (error) 
	{
		console.log(error);
		return undefined;
	}
}

exports.findUserById = findUserById;
exports.addUser = addUser;
exports.addTasktoUser = addTasktoUser;
exports.deleleUserByID = deleleUserByID;
exports.deleleTaskByID = deleleTaskByID;

