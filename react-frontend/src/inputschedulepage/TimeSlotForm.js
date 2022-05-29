import React, {useState} from "react";
import TimePicker from "react-time-picker";

function Form(props)
{
	const [time, setTime] = useState(
		{
			startTime: "0:00",
			endTime: "1:00",
			startTimeFlexibility: 0,
			endTimeFlexibility: 0
		}
	);

	function setStartTime(sTime)
	{
		setTime(
			{
				startTime: sTime,
				endTime: time["endTime"],
				startTimeFlexibility: time["startTimeFlexibility"],
				endTimeFlexibility: time["endTimeFlexibility"]
			}
		);
	}

	function setEndTime(eTime)
	{
		setTime(
			{
				startTime: time["startTime"],
				endTime: eTime,
				startTimeFlexibility: time["startTimeFlexibility"],
				endTimeFlexibility: time["endTimeFlexibility"]
			}
		);
	}

	function setStartTimeFlex(sFlex)
	{
		const flex = parseInt(sFlex.nativeEvent.data);
		setTime(
			{
				startTime: time["startTime"],
				endTime: time["endTime"],
				startTimeFlexibility: flex,
				endTimeFlexibility: time["endTimeFlexibility"]
			}
		);
	}

	function setEndTimeFlex(eFlex)
	{
		const flex = parseInt(eFlex.nativeEvent.data);
		setTime(
			{
				startTime: time["startTime"],
				endTime: time["endTime"],
				startTimeFlexibility: time["startTimeFlexibility"],
				endTimeFlexibility: flex
			}
		);
	}

	function submitForm()
	{
		if (isNaN(time.startTimeFlexibility) || isNaN(time.endTimeFlexibility)) 
		{
			console.log("Error - Flexibility should be a number. Please try again.");
		}
		else if (parseInt(time.startTime.substring(0, time.startTime.indexOf(":"))) >
				parseInt(time.endTime.substring(0, time.endTime.indexOf(":"))))
		{
			console.log("Error - Start time is chronologically after end time. Please try again.");
		}
		else if (parseInt(time.startTime.substring(0, time.startTime.indexOf(":"))) ===
				parseInt(time.endTime.substring(0, time.endTime.indexOf(":")))
				&& (parseInt(time.startTime.substring(time.startTime.indexOf(":") + 1))) >=
				parseInt(time.endTime.substring(time.endTime.indexOf(":") + 1)))
		{
			console.log("Error - Start time is chronologically at or after end time. Please try again.");
		}
		else
			props.handleSubmit(props.dayIndex, time);
		setTime({startTime: "0:00", endTime: "1:00", startTimeFlexibility: 0, endTimeFlexibility: 0});
	}

	return (
		<form>
			<label htmlFor="startTimeHr">Start Time</label>
			<div>
				<TimePicker onChange={setStartTime} value={time.startTime} />
			</div>
			<label htmlFor="startTimeFlex">Flexibility</label>
			<input
				type="number"
				className="time_bound"
				name="startTimeFlexibility"
				value={time.startTimeFlexibility}
				onChange={setStartTimeFlex} />
			<br />
			<label htmlFor="endTimeHr">End Time</label>
			<div>
				<TimePicker onChange={setEndTime} value={time.endTime} />
			</div>
			<label htmlFor="endTimeFlex">Flexibility</label>
			<input
				type="number"
				className="time_bound"
				name="endTimeFlexibility"
				value={time.endTimeFlexibility}
				onChange={setEndTimeFlex} />
			<input type="button" value="Submit" onClick={submitForm} />
		</form>
	);
}

export default Form;