//import axios from "axios";
import React, {useState}  from "react";

import HeaderHome from "../homepage/header_home";
//import DropdownButton from "react-bootstrap/DropdownButton";
//import Dropdown from "react-bootstrap/Dropdown";

import Form from "react-bootstrap/Form";
//import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
//import InputGroup from "react-bootstrap/InputGroup";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import HoursOptions from "./hoursoptions";

function EditTaskPage() 
{
	const [dateState, setDateState] = useState(new Date());
	const changeDate = (e) => 
	{
		setDateState(e);
	};
	/*const [searchInput, setSearchInput] = useState("");
	const [searchFilter, setSearchFilter] = useState("1");
	const [dropdownTitle, setDropdownTitle] = useState("Task Name");
	const [searchPlaceHolder, setSearchPlaceHolder] 
		= useState("Enter a task name");

	const [tasks, setTasks] = useState([]);
	const [allTasks, setAllTasks] = useState([]);

	async function fetchAll()
	{
		try 
		{
			const response = 
				await axios.get("http://localhost:5001/user/tasks/"+userId);
			return response.data.tasks_list;
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
				setAllTasks(result);
		});
	}, []);

	function removeOneTask(id)
	{
		const updated = tasks.filter(task => 
		{
			return task._id !== id;
		});

		const updatedAllTasks = allTasks.filter(task => 
		{
			return task._id !== id;
		});
    
		makeDelCall(id).then(result => 
		{
			if(result && result.status === 204)
			{
				setTasks(updated);
				setAllTasks(updatedAllTasks);
			}
		});
	}

	async function makeDelCall(id)
	{
		try 
		{
			const response = 
				await axios.delete("http://localhost:5001/tasks/"
					+userId+"/"+id);
			return response;
		}
		catch(error) 
		{
			console.log(error);
			return false;
		}
	}


	function handleClick(e) 
	{
		e.preventDefault();

		// Variable to hold the filtered list before putting into state
		let newList = [];

		if(allTasks === undefined)
			setTasks([]);
		else
		{
		// If the search bar isn't empty
			if (searchInput !== "") 
			{
				newList = allTasks.filter(task => 
				{
					let curTask;
					let curFilter;

					switch(searchFilter) 
					{
					case "1":
						curTask = task.task_name.toLowerCase();
						curFilter = searchInput.toLowerCase();
						return curTask.includes(curFilter);
					case "2":
						curTask = new Date(task.end_time);
						curFilter = new Date(searchInput);

						return curTask.getFullYear() === curFilter.getFullYear()
						&& curTask.getDate() === curFilter.getDate()
						&& curTask.getMonth() === curFilter.getMonth();
					case "3":
						curTask = task.priority_level.toLowerCase();
						curFilter = searchInput.toLowerCase();
						return curTask.includes(curFilter);
					}
				});
			}
			else 
			{
			// If the search bar is empty, set newList to original task list
				newList = allTasks;
			}
		}
		// Set the filtered state based on what our rules added to newList
		setTasks(newList);
	}*/

	const [validated, setValidated] = useState(false);

	const handleSubmit = (event) => 
	{
		const form = event.currentTarget;
		if (form.checkValidity() === false) 
		{
			event.preventDefault();
			event.stopPropagation();
		}
  
		setValidated(true);
	};

	return (
		<div className="container-fluid">
			<div className="row">
				<HeaderHome />
			</div>

			<div className="row" id="editTaskPage">

				<div className="d-flex flex-column"
					id="editTask_col">
    
					<div className="p-2" id="editTaskPage_title">Edit Task</div>
    
					<div className="p-2" id="editTaskPage">
						<Form noValidate validated={validated} onSubmit={handleSubmit}>

							<div className="d-flex flex-sm-row justify-content-around" id="editTaskBody">
								<div className="col-sm-7" id="taskEditInfo">
									<Form.Group as={Row} sm="auto" controlId="validationCustom03">
										<Form.Label>Task Name:</Form.Label>
										<Form.Control type="text" placeholder="Task name" required />
										<Form.Control.Feedback type="invalid">
                            Please provide a valid task name.
										</Form.Control.Feedback>
									</Form.Group>
									<Form.Group as={Row} sm="auto" controlId="validationCustom04">
										<Form.Label>Estimate Working Time (Hrs):</Form.Label>
										<HoursOptions />
									</Form.Group>
									<Form.Group as={Row} sm="auto" controlId="validationCustom05">
										<Form.Label>Priority Level:</Form.Label>
										<Form.Select aria-label="Default select example">
											<option value="1">Normal</option>
											<option value="2">Medium</option>
											<option value="3">High</option>
										</Form.Select>
										<Form.Control.Feedback type="invalid">
                            Please provide a valid zip.
										</Form.Control.Feedback>
									</Form.Group>

									<div className="row row-cols" id="submitEdit">
										<button  id="editSubmit" type="submit">Update Task</button>
									</div>
								</div>

								<div className="col-sm-auto" id="editTaskDate">
									<Calendar 
										value={dateState}
										onChange={changeDate}
									/>
								</div>
							</div>

						</Form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default EditTaskPage;
