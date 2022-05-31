import React from "react";
import DatePicker from "react-datepicker";
//import TimePicker from "react-time-picker";
import "react-datepicker/dist/react-datepicker.css";
//import "bootstrap/dist/css/bootstrap.min.css";
function Form (props)
{

	const [task, settask] = React.useState(
		{
			taskName: "",
			date: "",
			location:""
		}
	);

	function handleChange(event)
	{
		const{name, value} = event.target;
		if(name === "taskName")
			settask(
				{ taskName:value, date: task["date"], location:task["location"]}
			);
		else if(name === "date")
			settask(
				{taskName:task["taskName"],date: value,
					location:task["location"]}
			);
		else
			settask(
				{taskName:task["taskName"] , date: task["date"],location :value}
			);
	}

	function submitForm()
	{
		props.handleSubmit(task);
		settask({taskName: "", job: "", location: ""});
	}

	return (props.trigger) ? (
		<div className="form"  id="offform" >
			<form>
				<label className = "labels" id = "taskNameLabel" 
					htmlFor="taskName">Task Name</label>
				<input
					type="text"
					name="taskName"
					id="taskName"
					value={task.taskName}
					onChange={handleChange} />
				<div id= "dates">
					<DatePicker 
						className ="datePicker" 
						name="startDate" 
						placeholderText="Start Date"
						dateFormat ="MM/dd/yyyy" />
					<DatePicker 
						className ="datePicker" 
						name="endDate" 
						placeholderText="End Date"
						dateFormat ="MM/dd/yyyy"/>
				</div> 
				<label className = "labels" id = "dayLabel "
					htmlFor="date">Days</label>
				<label className="letterLabel"> M  </label>
				<label className="letterLabel"> T  </label>
				<label className="letterLabel"> W  </label>
				<label className="letterLabel"> T  </label>
				<label className="letterLabel"> F  </label>
				<label className="letterLabel"> S  </label>
				<label className="letterLabel"> S  </label>
				<div id="allLabels">
					<input 
						type = "checkbox"
						name="days"
						id="monday"
						className="dayCheck" />
					<input 
						type = "checkbox"
						name="days"
						id="tuesday"
						className="dayCheck" />
					<input 
						type = "checkbox"
						name="days"
						id="wednesday"
						className="dayCheck" />
					<input 
						type = "checkbox"
						name="days"
						id="thursday" 
						className="dayCheck"/>
					<input 
						type = "checkbox"
						name="days"
						id="friday"
						className="dayCheck" />
					<input 
						type = "checkbox"
						name="days"
						id="saturday"
						className="dayCheck" />
					<input 
						type = "checkbox"
						name="days"
						id="sunday"
						className="dayCheck" />
				</div>
				<label className = "labels" id = "dateLabel "
					htmlFor="date">Date</label>
				<input 
					type="text"
					name="date"
					id="date"
					value={task.date}
					onChange={handleChange} />
				<label className = "labels" id = "dateLabel "
					htmlFor="date">Start Time</label>
				<input 
					type="text"
					name="startTime"
					id="startTime"
					/*value={task.location}
					onChange={handleChange}*/ />
				<input 
					type="text"
					name="endTime"
					id="endTime"
					/*value={task.location}
					onChange={handleChange}*/ />
				
				<label className = "labels" htmlFor="location">Location</label>
				<input 
					type="text"
					name="location"
					id="location"
					value={task.location}
					onChange={handleChange} />
				<input id ="submitButton" type="button"
					value="Submit"onClick={submitForm}/>    
			</form>
			<button id="closeButton" onClick = {() => 
				props.setTrigger(false)} > 
			Close Popup </button> 
		</div>
	) : "";
}
export default Form;