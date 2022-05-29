const scheduleModel = require("./schedule");
const blockModel = require("./block");
const userServices = require("./user-services");

async function getSchedule(id) 
{
	try 
	{
		const us = await userServices.findUserById(id);
		if (us === undefined) 
		{
			console.log("Failed to retreive schedule for user with id " + id + ".\n");
			return us;
		}
		const scheduleID = us.schedule;
		const scheduleRef = await scheduleModel.findById(scheduleID);
		const schedule = {Mon: [], Tue: [], Wed: [], Thu: [], Fri: [], Sat: [], Sun: []};

		let m = scheduleRef.Mon.length;
		if (m !== 0) 
		{
			try 
			{
				for (let j = 0; j < m; j++) 
					schedule.Mon.push(await blockModel.findById(scheduleRef.Mon[j]));
			}
			catch (err)
			{
				console.log(err);
				return undefined;
			}
		}

		m = scheduleRef.Tue.length;
		if (m !== 0) 
		{
			try 
			{
				for (let j = 0; j < m; j++) 
					schedule.Tue.push(await blockModel.findById(scheduleRef.Tue[j]));
			}
			catch (err)
			{
				console.log(err);
				return undefined;
			}
		}
        
		m = scheduleRef.Wed.length;
		if (m !== 0) 
		{
			try 
			{
				for (let j = 0; j < m; j++) 
					schedule.Wed.push(await blockModel.findById(scheduleRef.Wed[j]));
			}
			catch (err)
			{
				console.log(err);
				return undefined;
			}
		}
        
		m = scheduleRef.Thu.length;
		if (m !== 0) 
		{
			try 
			{
				for (let j = 0; j < m; j++) 
					schedule.Thu.push(await blockModel.findById(scheduleRef.Thu[j]));
			}
			catch (err)
			{
				console.log(err);
				return undefined;
			}
		}
        
		m = scheduleRef.Fri.length;
		if (m !== 0) 
		{
			try 
			{
				for (let j = 0; j < m; j++) 
					schedule.Fri.push(await blockModel.findById(scheduleRef.Fri[j]));
			}
			catch (err)
			{
				console.log(err);
				return undefined;
			}
		}

		m = scheduleRef.Sat.length;
		if (m !== 0) 
		{
			try 
			{
				for (let j = 0; j < m; j++) 
					schedule.Sat.push(await blockModel.findById(scheduleRef.Sat[j]));
			}
			catch (err)
			{
				console.log(err);
				return undefined;
			}
		}
        
		m = scheduleRef.Sun.length;
		if (m !== 0) 
		{
			try 
			{
				for (let j = 0; j < m; j++) 
					schedule.Sun.push(await blockModel.findById(scheduleRef.Sun[j]));
			}
			catch (err)
			{
				console.log(err);
				return undefined;
			}
		}
        
		return schedule;
	}
	catch (err) 
	{
		console.log(err);
		return undefined;
	}
}

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

async function addBlockOnDay(uid, day, slotID) 
{
	try 
	{
		if (slotID === undefined) 
		{
			return false;
		}
		const us = await userServices.findUserById(uid);
		if (us === undefined) 
		{
			console.log("Failed to retreive schedule for user with id " + uid + ".\n");
			return us;
		}
		const scheduleID = us.schedule;
		var query = {};
		query[days[parseInt(day)]] = slotID;
		await scheduleModel.updateOne(
			{ _id: scheduleID },
			{ $push: query },
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

async function deleteBlockById(uid, day, id) 
{
	try 
	{
		const us = await userServices.findUserById(uid);
		if (us === undefined) 
		{
			console.log("Failed to retreive schedule for user with id " + uid + ".\n");
			return us;
		}
		const scheduleID = us.schedule;
		var query = {};
		query[days[parseInt(day)]] = id;
		let result = await scheduleModel.updateOne( 
			{ _id: scheduleID },
			{ $pull: query }
		);
		return result;
	}
	catch (error) 
	{
		console.log(error);
		return undefined;
	}
}

exports.getSchedule = getSchedule;
exports.addBlockOnDay = addBlockOnDay;
exports.deleteBlockById = deleteBlockById;