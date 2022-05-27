import Form from "react-bootstrap/Form";
import React, {useState}  from "react";
import axios from "axios";
import * as scheduler from "../scheduler.js";

/*
 *Import { useState, useEffect } from "react";
 *const [tasks, setCompleteTasks] = React.useState([]);
 *const handleStyleComplete = (id) => {
 *  // tell your state here, that these task is complete.
 *  setCompleteTasks([...tasks, id]);
 *};
 *
 *tasks = ["task1", "task2", "task3","task4", "task5"];
 */
/* Max task_name = 20 chars*/

//convert start time to string
function csts(t)
{
	// t = t / (24 * 60); for later
	if(t > 12)
		return (t - 12) + "PM";

	if(t == 0)
		t = 12;

	return t + "AM";
}

//get block string
function gbs(bd)
{
	var s = csts(bd.start_time);
	var e = csts(bd.end_time);

	return s + " - " + e;
}

function ToDoListView() 
{
	const [tasks, setTasks] = useState([]);

	async function fetchAll()
	{
		try 
		{
			const response = 
				await axios.get("http://localhost:5001/user/tasks/"+
								"62896e58b1cb8555ed799f3c");
			return response.data.tasks_list;
		}
		catch(error) 
		{
			console.log(error);
			return false;
		}
	}

	fetchAll().then(result => 
	{
		if(result)
			setTasks(result);
	});

	for (let task_index = 0; 
		task_index < tasks.length; 
		task_index++)
	{
		tasks[task_index].length = 1;
		tasks[task_index].priority = 1;
	}
	var schedule_data = scheduler.solve_schedule(tasks,
		scheduler.debug_schedule_blocks);

	return (
		<div className="d-flex flex-column" id="todolist_col">
			<div className="p-2" id="todolist_title">
				<span>To-Do</span>
			</div>

			{schedule_data.map((schedule_block) => (
				console.log(schedule_block),
				
				<div className="p-2" id="todo_list">
					<span style={{ color: "white", fontSize: 32}}>
						{gbs(schedule_block.block_data)}
					</span>
					
					{schedule_block.activities.map((task_data) => (
						
						console.log(schedule_block),
						
						<div className="card" id="todo_item">
							<div className="card-body">
								<div className="row row-2" id="task_info">
									<div className="col-sm-auto" 
										id="time_task">
										{task_data.length + " hr"}
									</div>

									<div className="col col-sm-fill" 
										id="task_name">
										<span> Task Name </span>
									</div>

									<div className="col-sm-auto" 
										id="priority_level">
										<i className="bi bi-star-fill"
											id="high_priority" 
											data-toggle="tooltip"
											data-placement="auto"
											title="Priority: High" />
									</div>

									<div className="col-sm-auto" 
										id="task_checkDone">
										<Form.Check aria-label="option 1"
											type="checkbox">
											<Form.Check.Input
												type="checkbox"
												defaultChecked={false}
												onClick={(e) => 
												{
													console.log(
														e.target.checked);
												}}
											/>
										</Form.Check>
									</div>
								</div>
							</div>
						</div>
					))}
				</div >
			))}
		</div >
	);
}

export default ToDoListView;
