import TasksDisplay from "./tasksdisplay";
import axios from "axios";
import React, {useState, useEffect}  from "react";

import HeaderHome from "../homepage/header_home";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

const userId = "62896e58b1cb8555ed799f3c";

function SearchPage() 
{
	const [searchInput, setSearchInput] = useState("");
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
    
		makeDelCall(id).then(result => 
		{
			if(result && result.status === 204)
				setTasks(updated);
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
	}

	return (
		<div className="container-fluid">
			<div className="row">
				<HeaderHome />
			</div>

			<div className="row" id="searchPage">

				<div className="d-flex flex-column"
					id="todolist_col">

					<div className="p-2" id="todolist_title">Tasks Lookup</div>

					<div className="p-2" id="searchBar">
						<div className="input-group input-group-lg mb-3"
							id="searchBar">

							<DropdownButton
								alignRight
								title={dropdownTitle}
								key="Secondary"
								id="searchFilter"
								variant="secondary"
								size="lg"
								onSelect={(e) => setSearchFilter(e)}
							>
								<Dropdown.Item eventKey="1">
									<div onClick={(e) => 
									{
										setDropdownTitle(e.target.textContent);
										setSearchPlaceHolder(
											"Enter a task name"
										);
									}}>
										Task Name
									</div>
								</Dropdown.Item>

								<Dropdown.Item eventKey="2">
									<div onClick={(e) =>
									{
										setDropdownTitle(e.target.textContent);
										setSearchPlaceHolder(
											"Enter a date in mm/dd/yyyy format"
										);
									}}>
										Due Date
									</div>
								</Dropdown.Item>

								<Dropdown.Item eventKey="3">
									<div onClick={(e) =>
									{
										setDropdownTitle(e.target.textContent);
										setSearchPlaceHolder(
											"Enter a priority level " + 
											"ex: normal, medium or high"
										);
									}}>
										Priority Level
									</div>
								</Dropdown.Item>
							</DropdownButton>

							<input id="searchInput" type="text" 
								className="form-control" 
								aria-label="Text input with dropdown button" 
								value={searchInput}
								placeholder={searchPlaceHolder}
								onChange={(e) => setSearchInput(e.target.value)}
							/>

							<button type="button"  id="searchButton"
								onClick={handleClick}
								className="btn btn-outline-secondary">
								<svg xmlns="http://www.w3.org/2000/svg" 
									width="25" height="25" fill="currentColor" 
									className="bi bi-search" 
									viewBox="0 0 16 16">
									<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 
									1.398h-.001c.03.04.062.078.098.115l3.85 
									3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 
									1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 
									1-11 0 5.5 5.5 0 0 1 11 0z"/>
								</svg>
								<span className="visually-hidden">Button</span>
							</button>
						</div>

					</div>

					<div className="p-2" id="todo_list">
						<TasksDisplay tasksData={tasks} 
							removeTask={removeOneTask} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default SearchPage;