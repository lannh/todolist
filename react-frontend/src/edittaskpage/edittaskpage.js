import axios from "axios";
import React, {useState, useEffect}  from "react";

import HeaderHome from "../homepage/header_home";


import Form from "react-bootstrap/Form";

import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";


import Calendar from "react-calendar";
import HoursOptions from "./hoursoptions";

function EditTaskPage(props) 
{
	const [curTask, setCurTask] = useState({});

	const [dateState, setDateState] = useState(new Date());
	const [taskName, setTaskName] = useState("");
	const [duration, setDuration] = useState({hrs:"00", mins:"00"});
	const [priority, setPriority] = useState("");

	async function fetchAll()
	{
		try 
		{
			const response = 
				await axios.get("http://localhost:5001/tasks/"+props.taskID);
			return response.data;
		}
		catch(error) 
		{
			console.log(error);
			return false;
		}
	}

	useEffect(() => 
	{
		fetchAll().then(result => 
		{
			if(result)
			{
				setCurTask(result);

				setPriority(result.priority_level);
				setTaskName(result.task_name);
				setDateState(new Date(result.due_date));

				let curDuration = result.estimated_duration;
				setDuration({
					hrs: ("0"+String(parseInt(curDuration/60))).slice(-2), 
					mins: String(curDuration%60)
				});
			}
		});
	}, []);

	function updateTask()
	{
		let newTask = curTask;

		newTask.task_name = taskName;
		newTask.due_date = new Date(dateState);
		newTask.priority_level = priority;

		let intDuration = parseInt(duration.hrs)*60 + parseInt(duration.mins);
		newTask.estimated_duration = intDuration;
    
		makeUpdateCall(props.taskID, newTask).then(result => 
		{
			if(result && result.status === 204)
			{
				setCurTask(newTask);
				setIsSuccessfullySubmitted(true);
			}
			else 
				setIsSuccessfullySubmitted(false);
		});
	}

	async function makeUpdateCall(id, newTask)
	{
		try 
		{
			const response = 
				await axios.put("http://localhost:5001/update/tasks"
					+"/"+id, newTask);
			return response;
		}
		catch(error) 
		{
			console.log(error);
			return false;
		}
	}

	const [validated, setValidated] = useState(false);
	const [isSuccessfullySubmitted,setIsSuccessfullySubmitted] = useState(false);

	const handleSubmit = (event) => 
	{
		const hrsValidation = document.getElementById("hoursSelect");
		const minsValidation = document.getElementById("minsSelect");
		
		const form = event.currentTarget;

		event.preventDefault();

		if(duration.hrs==="00" && duration.mins==="00")
		{
			event.stopPropagation();
			hrsValidation.setCustomValidity(" ");
			minsValidation.setCustomValidity("Estimated working time cannot be 0");

			setIsSuccessfullySubmitted(false);
		}
		else
		{
			hrsValidation.setCustomValidity("");
			minsValidation.setCustomValidity("");
		}

		if (form.checkValidity() === false) 
		{
			event.stopPropagation();
			setIsSuccessfullySubmitted(false);
		}
		else
			updateTask();

		hrsValidation.reportValidity();
		minsValidation.reportValidity();
		setValidated(true);
	};
	const [show, setShow] = useState(true);

	return (
		<div className="container-fluid">
			<div className="row">
				<HeaderHome />
			</div>

			<div className="row" id="editTaskPage">

				<div className="d-flex flex-column"
					id="editTask_col">
    
					<div className="p-2" id="editTaskPage_title">Edit Task</div>

					{isSuccessfullySubmitted && show && (
						<Alert variant="success" onClose={() => setShow(false)} dismissible>
							<Alert.Heading>Your task has been updated successfully.</Alert.Heading>
						</Alert>)}
						
					<div className="p-2" id="editTaskPage">
						<Form id="editTaskForm" noValidate validated={validated} onSubmit={handleSubmit}>
							<div className="d-flex flex-row">
								<div className="d-flex flex-column" id="taskEditInfo">
									<div className="p-2">
										<Form.Label for="inputTaskName">Task Name</Form.Label>
										<Form.Control 
											id="inputTaskName" type="text"
											defaultValue={taskName} 
											placeholder="Task name" required
											onChange={(e) => setTaskName(e.target.value)} />
										<Form.Control.Feedback type="invalid" id="taskNameValidation"> 
											Please provide a valid task name. 
										</Form.Control.Feedback>
									</div>

									<div className="p-2" id="estimatedTimeLabel">
										<Form.Label>Estimated Working Time (hh:mm)</Form.Label>
										<HoursOptions 
											defaultDuration={duration}
											setDuration={setDuration} 
											validated={validated}
										/>
									</div>

									<div className="p-2">
										<Form.Label for="priorityEdit">Priority Level</Form.Label>
										<Form.Select 
											value={priority} 
											onChange={(e) => setPriority(e.target.value)}
											id="priorityEdit" aria-label="Default select example">
											<option value="normal">Normal</option>
											<option value="medium">Medium</option>
											<option value="high">High</option>
										</Form.Select>
									</div>
								</div>
									
								<div className="d-flex flex-column" id="editDueDate">
									<Form.Label id="dueDateLabel" as={Row} sm="w-100">Due date</Form.Label> 
									<Calendar 
										id="editDate"
										as={Row}
										defaultValue={dateState}
										value={dateState}
										onChange={(e) => setDateState(new Date(e))}
									/>
								</div>
							</div>
							<div className="d-flex flex-row" id="editSubmitRow">
								<button  
									className="btn btn-secondary"
									id="editSubmitButton"type="submit">Update Task</button>
							</div>
						</Form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default EditTaskPage;
