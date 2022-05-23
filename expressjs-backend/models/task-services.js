const taskModel = require("./task");
const userServices = require("./user-services");


async function findTasksByUserId(id) 
{
	try 
	{
		const user = await userServices.findUserById(id);
		const tasksIDList = user.tasks_list;
		const tasksList = [];
    
		let n = tasksIDList.length;
		for(let i=0; i<n; ++i)
			tasksList.push(await taskModel.findById(tasksIDList[i]));
		
		return tasksList;
	}
	catch (error) 
	{
		console.log(error);
		return undefined;
	}
}


/*async function findTaskByName(name) 
{
	return await taskModel.find({ name: name });
}
*/


async function deleleTaskByID(id, uid) 
{
	try 
	{
		await userServices.deleleTaskByID(uid, id);
		return await taskModel.findByIdAndDelete(id);
	}
	catch (error) 
	{
		console.log(error);
		return undefined;
	}
}  

exports.findTasksByUserId = findTasksByUserId;
exports.deleleTaskByID = deleleTaskByID;