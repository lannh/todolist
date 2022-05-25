import React, {useState} from "react";
import TimePicker from "react-time-picker";

function Form(props)
{
	const [time, setTime] = useState(
		{
			startTime: "0:00",
			endTime: "1:00"
		}
	);

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