
import Form from 'react-bootstrap/Form';
import React, { useState, useEffect } from "react";

/*const [tasks, setCompleteTasks] = React.useState([]);
const handleStyleComplete = (id) => {
    // tell your state here, that these task is complete.
    setCompleteTasks([...tasks, id]);
  };

tasks = ["task1", "task2", "task3","task4", "task5"];*/
/*max task_name = 20 chars*/

function ToDoListView()
{
/*
    useEffect(()=>
    {
        tasks.map((x, key) => 
        {
            // using this derived state you could apply styles here
            const isCompleteTask = tasks.includes(x.id);
            return (
            <div className="task-list-item">
                <ul>
                <li className={isCompleteTask ? 'lineThroughStyles' : 'li-title'} id="title" key={key}>
                    {x.title}
                </li>
                <li className="li-desc" id="desc" key={key}>
                    {x.description}
                </li>
                </ul>
                <div className="btn-container">
            <button onClick={() => completeTasks(x.id)} className={isCompleteTask ? 'taskCompleteButtonStyles' : 'task-btns'}>
                    Complete
                </button>
                <button className="task-btn-del">Delete</button>
                </div>
            </div>
            );
        });
    }, []);*/

    return (
        <div className="d-flex flex-column" id="todolist_col">
			<div className="p-2" id="todolist_title">
				<span>To-Do</span>
			</div>

            <div className="p-2" id="todo_list">
        
                <div class="card" id="todo_item">
                    <div class="card-body">
                        <div class="row row-2" id="task_info">
                            <div class="col-sm-auto" id="time_task">
                                <span>AM<br></br>12:00</span>
                            </div>

                            <div class="col col-sm-fill" id="task_name">
                                <span>Task Name 1</span>
                            </div>

                            <div class="col-sm-auto" id="priority_level">
                                <i className="bi bi-star-fill" id="high_priority" 
                                    data-toggle="tooltip" data-placement="auto" 
                                    title="Priority: High">
                                </i>
                            </div>

                            <div class="col-sm-auto" id="task_checkDone">
                                <Form.Check aria-label="option 1" type={"checkbox"}>
                                    <Form.Check.Input
                                    type={"checkbox"}
                                    defaultChecked={false}
                                    onClick={(e) => {
                                        console.log(e.target.checked);
                                    }}
                                    />
                                </Form.Check>
                            </div>

                        </div>
                    </div>
                </div>


                <div class="card" id="todo_item">
                    <div class="card-body">
                        <div class="row row-2" id="task_info">
                            <div class="col-sm-auto" id="time_task">
                                <span>AM<br></br>14:00</span>
                            </div>

                            <div class="col col-sm-fill" id="task_name">
                                <span>Task Name 2</span>
                            </div>

                            <div class="col-sm-auto" id="priority_level">
                                <i className="bi bi-star-fill" id="normal_priority" 
                                    data-toggle="tooltip" data-placement="auto" 
                                    title="Priority: Normal">
                                </i>
                            </div>

                            <div class="col-sm-auto" id="task_checkDone">
                                <Form.Check aria-label="option 1" type={"checkbox"}>
                                    <Form.Check.Input
                                    type={"checkbox"}
                                    defaultChecked={false}
                                    onClick={(e) => {
                                        console.log(e.target.checked);
                                    }}
                                    />
                                </Form.Check>
                            </div>

                        </div>
                    </div>
                </div>


                <div class="card" id="todo_item">
                    <div class="card-body">
                        <div class="row row-2" id="task_info">
                            <div class="col-sm-auto" id="time_task">
                                <span>AM<br></br>17:00</span>
                            </div>

                            <div class="col col-sm-fill" id="task_name">
                                <span>Task Name 3</span>
                            </div>

                            <div class="col-sm-auto" id="priority_level">
                                <i className="bi bi-star-fill" id="normal_priority" 
                                    data-toggle="tooltip" data-placement="auto" 
                                    title="Priority: Normal">
                                </i>
                            </div>

                            <div class="col-sm-auto" id="task_checkDone">
                                <Form.Check aria-label="option 1" type={"checkbox"}>
                                    <Form.Check.Input
                                    type={"checkbox"}
                                    defaultChecked={false}
                                    onClick={(e) => {
                                        console.log(e.target.checked);
                                    }}
                                    />
                                </Form.Check>
                            </div>

                        </div>
                    </div>
                </div>


                <div class="card" id="todo_item">
                    <div class="card-body">
                        <div class="row row-2" id="task_info">
                            <div class="col-sm-auto" id="time_task">
                                <span>AM<br></br>20:00</span>
                            </div>

                            <div class="col col-sm-fill" id="task_name">
                                <span>Task Name 4</span>
                            </div>

                            <div class="col-sm-auto" id="priority_level">
                                <i className="bi bi-star-fill" id="high_priority" 
                                    data-toggle="tooltip" data-placement="auto" 
                                    title="Priority: High">
                                </i>
                            </div>

                            <div class="col-sm-auto" id="task_checkDone">
                                <Form.Check aria-label="option 1" type={"checkbox"}>
                                    <Form.Check.Input
                                    type={"checkbox"}
                                    defaultChecked={false}
                                    onClick={(e) => {
                                        console.log(e.target.checked);
                                    }}
                                    />
                                </Form.Check>
                            </div>

                        </div>
                    </div>
                </div>


                <div class="card" id="todo_item">
                    <div class="card-body">
                        <div class="row row-2" id="task_info">
                            <div class="col-sm-auto" id="time_task">
                                <span>AM<br></br>21:00</span>
                            </div>

                            <div class="col col-sm-fill" id="task_name">
                                <span>Task Name 5</span>
                            </div>

                            <div class="col-sm-auto" id="priority_level">
                                <i className="bi bi-star-fill" id="normal_priority" 
                                    data-toggle="tooltip" data-placement="auto" 
                                    title="Priority: Normal">
                                </i>
                            </div>

                            <div class="col-sm-auto" id="task_checkDone">
                                <Form.Check aria-label="option 1" type={"checkbox"}>
                                    <Form.Check.Input
                                    type={"checkbox"}
                                    defaultChecked={false}
                                    onClick={(e) => {
                                        console.log(e.target.checked);
                                    }}
                                    />
                                </Form.Check>
                            </div>

                        </div>
                    </div>
                </div>


                <div class="card" id="todo_item">
                    <div class="card-body">
                        <div class="row row-2" id="task_info">
                            <div class="col-sm-auto" id="time_task">
                                <span>AM<br></br>21:30</span>
                            </div>

                            <div class="col col-sm-fill" id="task_name">
                                <span>Task Name 6</span>
                            </div>

                            <div class="col-sm-auto" id="priority_level">
                                <i className="bi bi-star-fill" id="high_priority" 
                                    data-toggle="tooltip" data-placement="auto" 
                                    title="Priority: High">
                                </i>
                            </div>

                            <div class="col-sm-auto" id="task_checkDone">
                                <Form.Check aria-label="option 1" type={"checkbox"}>
                                    <Form.Check.Input
                                    type={"checkbox"}
                                    defaultChecked={false}
                                    onClick={(e) => {
                                        console.log(e.target.checked);
                                    }}
                                    />
                                </Form.Check>
                            </div>

                        </div>
                    </div>
                </div>


			</div>

        </div>
    );
}

export default ToDoListView;