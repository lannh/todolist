const blockModel = require("./block");
const scheduleServices = require("./schedule-services");

async function addBlockOnDay(uid, day, slot) 
{
	try 
	{
		const block = new blockModel(slot);
		const savedBlock = await block.save();
		await scheduleServices.addBlockOnDay(uid, day, savedBlock._id.valueOf());
		return savedBlock;
	}
	catch (err) 
	{
		console.log(err);
		return undefined;
	}
}

async function deleteBlockById(uid, day, id) 
{
	try 
	{
		await scheduleServices.deleteBlockById(uid, day, id);
		return await blockModel.findByIdAndDelete(id);
	}
	catch (err) 
	{
		console.log(err);
		return undefined;
	}
}

exports.addBlockOnDay = addBlockOnDay;
exports.deleteBlockById = deleteBlockById;