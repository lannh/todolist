import React, {useState} from "react";

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
				{taskName: task["taskName"], date: value, location:task["location"]}
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

		return ( props.trigger) ? (
			<div className="form"  id="offform" >
				<h3> HELLO </h3>
				<form>
					<label htmlFor="taskName">Task Name</label>
					<input
						type="text"
						name="taskName"
						id="taskName"
						value={task.taskName}
						onChange={handleChange} />
					
					<label htmlFor="date">Date</label>
					<input 
						type="text"
						name="date"
						id="date"
						value={task.date}
						onChange={handleChange} />
					<label htmlFor="location">Location</label>
					<input 
						type="text"
						name="location"
						id="location"
						value={task.location}
						onChange={handleChange} />
					<input type="button" value="Submit" onClick={submitForm} />    
				</form>
				<button onClick = {() => props.setTrigger(false)} > Close Popup </button> 
			</div>
		) : "";
}
export default Form;