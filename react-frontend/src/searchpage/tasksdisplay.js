import React from "react";
import Form from "react-bootstrap/Form";
import {Link} from "react-router-dom";


function TasksDisplayBody(props) 
{
	const tasks_list = props.tasksData.map(row => 
	{
		const dueDate = new Date(row.due_date);
			
		let tmp = dueDate.toDateString();
		let n = tmp.length;
		row.dueDate = tmp.substring(4,n-4);
			
		tmp = dueDate.toLocaleTimeString();
		n = tmp.length;
		row.dueTime= 
			{
				time : 
					("0" + tmp.substring(0,tmp.search(":"))).slice(-2) +
					tmp.substring(tmp.search(":"),n-6),
				AmPm : tmp.substring(n-2),
			};		
		return row;
	});

	const rows = tasks_list.map((row, index) => 
	{
		return (
			<div className="d-flex flex-sm-row justify-content-around" 
				key={index}>
				<div className="p-2 w-100">
					<div className="card" id="todo_item1">
						<div className="card-body">
							<div className="row row-2" id="task_info">
								<div className="col-sm-auto" id="time_task">
									<span>Due:<br />
										{row.dueDate}
									</span>
								</div>

								<div className="col-sm-auto" id="time_task">
									<span>{row.dueTime.AmPm}<br />
										{row.dueTime.time}
									</span>
								</div>

								<div className="col col-sm-fill" id="task_name">
									<span>{row.task_name}</span>
								</div>

								<div className="col-sm-auto" 
									id="priority_level">
									<i  className="bi bi-star-fill"
										id={row.priority_level+"_priority"}
										data-toggle="tooltip" 
										data-placement="auto"
										title={"Priority: " + 
											row.priority_level}
									/>
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
												console.log(e.target.checked);
											}}
										/>
									</Form.Check>
								</div>
							</div>
						</div>
					</div>

				</div>

				<div className="p-2"
					id="button_sp">
					<Link to="/edit-task" state={{ taskID: row._id }}>

						<button type="button" 
							className="btn btn-secondary"
							id="edit_task"
						//onClick={()}
						>
							Edit
						</button>
					</Link>
				</div>
				<div className="p-2"
					id="button_sp">
					<button 
						type="button" 
						className="btn btn-secondary"
						id="del_task"
						onClick={() => props.removeTask(row._id)}>
							Delete
					</button>
				</div>
			</div>
		);
	}
	);
	return (
		<div className="d-flex flex-sm-column justify-content-around"
			id="tasksList">
			{rows}
		</div>
	);
}

function TasksDisplay(props) 
{
	return (
		<>
			<TasksDisplayBody tasksData={props.tasksData} 
				removeTask={props.removeTask} />  
		</>
	);  
}

export default TasksDisplay;