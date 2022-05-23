import React, {useState} from "react";
import TimePicker from "react-time-picker";

function Form(props) 
{
	/*const [slot, setSlot] = useState(
		{
			startTimeHr: 0,
			startTimeMin: 0,
			endTimeHr: 0,
			endTimeMin: 0
		}
	);*/
	const [time, setTime] = useState(
		{
			startTime: "0:00",
			endTime: "1:00"
		}
	);

	/*function handleChange(event) 
	{
		const { name, value } = event.target;
		if (name === "startTimeHr")
			setSlot(
				{startTimeHr: value,
					startTimeMin: slot["startTimeMin"],
					endTimeHr: slot["endTimeHr"],
					endTimeMin: slot["endTimeMin"]}
			);
		else if (name === "startTimeMin")
			setSlot(
				{startTimeHr: slot["startTimeHr"],
					startTimeMin: value,
					endTimeHr: slot["endTimeHr"],
					endTimeMin: slot["endTimeMin"]}
			);
		else if (name === "endTimeHr")
			setSlot(
				{startTimeHr: slot["startTimeHr"],
					startTimeMin: slot["startTimeMin"],
					endTimeHr: value,
					endTimeMin: slot["endTimeMin"]}
			);
		else
			setSlot(
				{startTimeHr: slot["startTimeHr"],
					startTimeMin: slot["startTimeMin"],
					endTimeHr: slot["endTimeHr"],
					endTimeMin: value}
			);
	}*/

	function setStartTime(sTime) 
	{
		console.log(sTime);

		setTime(
			{startTime: sTime,
				endTime: time["endTime"]}
		);
	}

	function setEndTime(eTime) 
	{
		console.log(eTime);

		setTime(
			{startTime: time["startTime"],
				endTime: eTime}
		);
	}

	function submitForm() 
	{
		props.handleSubmit(props.dayIndex, time);
		setTime({startTime: "0:00", endTime: "1:00"});
	}

	return (
		<form>
			<label htmlFor="startTimeHr">Start Time</label>
			<div>
				<TimePicker onChange={setStartTime} value={time.startTime} />
			</div>
			<br />
			<label htmlFor="endTimeHr">End Time</label>
			<div>
				<TimePicker onChange={setEndTime} value={time.endTime} />
			</div>
			<input type="button" value="Submit" onClick={submitForm} />
		</form>
	);
}

export default Form;