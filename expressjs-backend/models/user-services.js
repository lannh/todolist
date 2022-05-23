const userModel = require("./user");


async function getUsers(name, job) 
{
	let result;
	if (name === undefined && job === undefined) 
	{
		result = await userModel.find();
	}
	else if (name && !job) 
	{
		result = await findUserByName(name);
	}
	else if (job && !name) 
	{
		result = await findUserByJob(job);
	}
	else
	{
		result = await findUserByNameNJob(name, job);
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

async function findUserByName(name) 
{
	return await userModel.find({ name: name });
}

async function findUserByJob(job) 
{
	return await userModel.find({ job: job });
}

async function findUserByNameNJob(name, job) 
{
	return await userModel.find({ name: name, job: job });
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
exports.deleleUserByID = deleleUserByID;
exports.deleleTaskByID = deleleTaskByID;