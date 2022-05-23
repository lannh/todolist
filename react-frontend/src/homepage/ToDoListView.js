import Form from "react-bootstrap/Form";
import React from "react";
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

function csts(t)
{
	// t = t / (24 * 60); for later
	if(t > 12)
		return (t - 12) + "PM";

	if(t == 0)
		t = 12;

	return t + "AM";
}

function gbs(bd)
{
	var s = csts(bd.start_time);
	var e = csts(bd.end_time);

	return s + " - " + e;
}

function ToDoListView() 
{
	var schedule_data = scheduler.solve_schedule(scheduler.debug_tasks,
		scheduler.debug_schedule_blocks);

	/*
	 *UseEffect(()=>
	 *{
	 *    tasks.map((x, key) =>
	 *    {
	 *        // using this derived state you could apply styles here
	 *        const isCompleteTask = tasks.includes(x.id);
	 *        return (
	 *        <div className="task-list-item">
	 *            <ul>
	 *            <li className={isCompleteTask ?
	 *		'lineThroughStyles' : 'li-title'}
	 *	id="title" key={key}>
	 *                {x.title}
	 *            </li>
	 *            <li className="li-desc" id="desc" key={key}>
	 *                {x.description}
	 *            </li>
	 *            </ul>
	 *            <div className="btn-container">
	 *        <button onClick={() => completeTasks(x.id)}
	 *className={isCompleteTask ? 'taskCompleteButtonStyles'
	 *			: 'task-btns'}>
	 *                Complete
	 *            </button>
	 *            <button className="task-btn-del">Delete</button>
	 *            </div>
	 *        </div>
	 *        );
	 *    });
	 *}, []);
	 */

	return (
		<div className="d-flex flex-column" id="todolist_col">
			<div className="p-2" id="todolist_title">
				<span>To-Do</span>
			</div>

			{schedule_data.map((schedule_block, index) => (
				console.log(index, schedule_block.block_data.start_time),
				
				<div className="p-2" id="todo_list">
					<span style={{ color: "white", fontSize: 32}}>
						{gbs(schedule_block.block_data)}
					</span>
					
					{schedule_block.activities.map((task_data, index) => (
						
						console.log(index, 
							schedule_block.block_data.start_time),
						
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
