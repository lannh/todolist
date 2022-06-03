const userModel = require("./user");
const scheduleModel = require("./schedule");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");

dotenv.config();

//mongoose.set("debug", true);

/*mongoose
	.connect("mongodb://127.0.0.1", {
    	useNewUrlParser: true,
    	useUnifiedTopology: true,
  	})
  	.catch((error) => console.log(error));
*/

/*mongoose
	.connect(
		"mongodb+srv://" +
      process.env.MONGO_USER +
      ":" +
      process.env.MONGO_PWD +
      "@" +
      process.env.MONGO_CLUSTER +
      "/" +
      process.env.MONGO_DB +
      "?retryWrites=true&w=majority",
		// "mongodb://localhost:27017/users",
		{
			useNewUrlParser: true, //useFindAndModify: false,
			useUnifiedTopology: true,
		}
	)
	.catch((error) => console.log(error));
*/

async function getUsers(taskName, date,location) 
{
	let result;
	if (taskName === undefined && date === undefined && location === undefined) 
	{
		result = await userModel.find();
	}
	else if (taskName && !date && !location) 
	{
		result = await findUserByName(taskName);
	}
	else if (date && !taskName && !location) 
	{
		result = await findUserByJob(date);
	}
	else if (location && !date && !taskName) 
	{
		result = await findUserByLocation(location);
	}
	else
	{
		result = await findUserByNameNJobNLocation(taskName, date,location);
	}
	return result;
}

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
		await userModel.updateOne(
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
		);
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

async function findUserByName(taskName) 
{
	return await userModel.find({ taskName: taskName });
}

async function findUserByJob(date) 
{
	return await userModel.find({ date: date });
}
async function findUserByLocation(location) 
{
	return await userModel.find({ location: location });
}
async function findUserByNameNJobNLocation(taskName,date,location) 
{
	return await userModel.find({ taskName: taskName, 
		date: date,location:location });
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

exports.getUsers = getUsers;
exports.findUserById = findUserById;
exports.addUser = addUser;
exports.addTasktoUser = addTasktoUser;
exports.deleleUserByID = deleleUserByID;
exports.deleleTaskByID = deleleTaskByID;