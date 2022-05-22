import React from "react";
import Form from "react-bootstrap/Form";


function TasksDisplayBody(props) 
{
	const rows = props.characterData.map((row, index) => 
	{
		return (
			<div className="d-flex flex-sm-row justify-content-around" 
				key={index}>
				<div className="p-2 w-100">
					<div className="card" id="todo_item1">
						<div className="card-body">
							<div className="row row-2" id="task_info">
								<div className="col-sm-auto" id="time_task">
									<span>05-27<br />2022</span>
								</div>

								<div className="col-sm-auto" id="time_task">
									<span>PM<br />02:00</span>
								</div>

								<div className="col col-sm-fill" id="task_name">
									<span>{row.name}</span>
								</div>

								<div className="col-sm-auto" 
									id="priority_level">
									<i  className="bi bi-star-fill"
										id="normal_priority"
										data-toggle="tooltip" 
										data-placement="auto"
										title="Priority: Normal"/>
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
					<button type="button" 
						className="btn btn-secondary"
						id="edit_task"
						//onClick={()}
					>
							Edit
					</button>
				</div>
				<div className="p-2"
					id="button_sp">
					<button 
						type="button" 
						className="btn btn-secondary"
						id="del_task"
						onClick={() => props.removeCharacter(index)}>
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
/*			<tr scope="row" key={index}>
				<td>{row._id}</td>
				<td>{row.name}</td>         
				<td>{row.job}</td>
				<td>
					<button onClick={() => props.removeCharacter(index)}>
						Delete
					</button>
				</td>
			</tr>*/
function TasksDisplay(props) 
{
	return (
		<>
			<TasksDisplayBody characterData={props.characterData} 
				removeCharacter={props.removeCharacter} />  
		</>
	);  
}

export default TasksDisplay;