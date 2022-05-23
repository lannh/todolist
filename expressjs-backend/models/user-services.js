const mongoose = require("mongoose");
const userModel = require("./user");
const dotenv = require("dotenv");

dotenv.config();

mongoose.set("debug", true);

mongoose
  .connect("mongodb://127.0.0.1", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));


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
	else if (taskName && !job && !location) 
	{
		result = await findUserByName(taskName);
	}
	else if (job && !taskName && !location) 
	{
		result = await findUserByJob(job);
	}
	else if (location && !job && !taskName) 
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

async function addUser(user) 
{
	try 
	{
		const userToAdd = new userModel(user);
		const savedUser = await userToAdd.save();
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
	return await userModel.find({ taskName: taskName, date: date,location:location });
}


async function deleleUserByID(id) 
{
	try 
	{
		return await userModel.findByIdAndDelete(id);
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
exports.deleleUserByID = deleleUserByID;