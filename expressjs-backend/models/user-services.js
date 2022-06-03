const userModel = require("./user");
const scheduleModel = require("./schedule");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
import { MongoClient } from "mongodb";
const uri = "";
const client = new MongoClient(uri);
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

async function addTasktoUser(uid, taskID) 
{
	try{
		//checks if its a valid user
		const us = await userServices.findUserById(uid);
		if (us === undefined) 
		{
			console.log("Failed to retreive task for user with id " + uid + ".\n");
			return us;
		}
		const database = client.db("users");
		const taskDatabase = database.collection("Tasks");
		await taskDatabase.insertOne(newTask);
		/*await userModel.updateOne(
			{_id:uid},
			{$push:taskID},
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
		);*/
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
		userToAdd["schedule"] = scheduleToAdd._id;
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

exports.findUserById = findUserById;
exports.addUser = addUser;
exports.addTasktoUser = addTasktoUser;
exports.deleleUserByID = deleleUserByID;
exports.deleleTaskByID = deleleTaskByID;
