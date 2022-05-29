import HeaderHome from "../homepage/header_home";
import axios from "axios";
import React, {useState, useEffect} from "react";
import WeeklyAvailability from "./WeeklyAvailability";

function InputSchedule (props)
{
	const [slots, setTimeSlots] = useState({Mon: [], Tue: [], Wed: [], Thu: [], Fri: [], Sat: [], Sun: [],});
	const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
	async function removeTimeSlot (dayIndex, index) 
	{
		const updated = JSON.parse(JSON.stringify(slots));
		const id = updated[days[dayIndex]][index].id;
		updated[days[dayIndex]] = updated[days[dayIndex]].filter((slot, i) => 
		{
			return i !== index;
		});
		setTimeSlots(updated);
		try 
		{
			const response = await axios.delete("http://localhost:5001/user/"
				+ props.id + "/schedule/" + dayIndex + "/" + id);
			if (!(response && response.status === 204))
				console.log(
					"Could not delete time slot for user with id '" +
				props.id + "' in backend.");
		}
		catch (error)
		{
			console.log(error);
		}
	}

	function sortTimeSlots(slots, index)
	{
		let st = (index === -1)?0:index;
		let end = (index === -1)?7:index + 1;
		for (let i = st; i < end; i++)
			slots[days[i]].sort((a, b) => a.startTime - b.startTime);
	}

	function noOverlap(dayIndex, slot) 
	{
		const checkSlots = JSON.parse(JSON.stringify(slots));
		let m = checkSlots[days[dayIndex]].length;
		for (let i = 0; i < m; i++) 
		{
			if (checkSlots[days[dayIndex]][i].startTime <= slot.startTime
				&& checkSlots[days[dayIndex]][i].endTime > slot.startTime
				|| checkSlots[days[dayIndex]][i].startTime < slot.endTime
				&& checkSlots[days[dayIndex]][i].endTime >= slot.endTime)
				return false;
		}
		return true;
	}

	function updateList(dayIndex, slot)
	{
		const startTime = parseInt(slot.startTime.substring(0, slot.startTime.indexOf(":"))) * 60
							+ parseInt(slot.startTime.substring(slot.startTime.indexOf(":") + 1));
		const endTime = parseInt(slot.endTime.substring(0, slot.endTime.indexOf(":"))) * 60
							+ parseInt(slot.endTime.substring(slot.endTime.indexOf(":") + 1));
		let dbSlot = {
			startTime: startTime,
			endTime: endTime,
			startTimeFlexibility: slot.startTimeFlexibility,
			endTimeFlexibility: slot.endTimeFlexibility
		};

		if (noOverlap(dayIndex, dbSlot))
		{
			postSlot(dayIndex, dbSlot).then(result => 
			{
				if (result && result.status === 201) 
				{
					const updated = JSON.parse(JSON.stringify(slots));
					dbSlot.id = result.data.savedSlot._id;
					updated[days[dayIndex]].push(dbSlot);
					sortTimeSlots(updated, dayIndex);
					setTimeSlots(updated);
				}
			});
		}
	}

	async function fetchSchedule() 
	{
		try 
		{
			const response = await axios.get("http://localhost:5001/user/"
				+ props.id + "/schedule");
			return response.schedule;     
		}
		catch (error)
		{
			console.log(error); 
			return false;         
		}
	}
	
	async function postSlot(dayIndex, slot)
	{
		try 
		{
			const response = await axios.post("http://localhost:5001/user/"
				+ props.id + "/schedule/" + dayIndex, slot);
			return response;
		}
		catch (error)
		{
			console.log(error);
			return false;
		}
	}

	useEffect(() => 
	{
		fetchSchedule().then(result => 
		{
			if (result) 
			{
				sortTimeSlots(result, -1);
				setTimeSlots(result);
			}
		});
	}, []);

	return (
		<div className="container-fluid">
			<div className="row">
				<HeaderHome />
			</div>

			<div className="row" id="primary_view">
				<div className="col-7" id="input_schedule_view">
					<WeeklyAvailability slotData={slots} 
						removeSlot={removeTimeSlot} handleSubmit={updateList} 
					/>
				</div>
			</div>

			<button type="button" 
				className="btn btn-secondary btn-lg" id="add_task">
				+
			</button>
		</div>
	);

}

export default InputSchedule;
