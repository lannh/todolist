import HeaderHome from "./header_home";
// Import axios from "axios";
import React from "react";
import PrimaryView from "./PrimaryView";
import ToDoListView from "./ToDoListView";
import Sidebar from "./Sidebar";
import LoginReg from "./LoginReg";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";

function Homepage ()
{

	// Const [user, setUsers] = useState([]);

	/*
	 * Later use for fetching all tasks
	 * async function fetchAll()
	 * {
	 * try {
	 *   const response = await axios.get('http://localhost:5001/users');
	 *   return response.data.users_list;
	 * }
	 * catch(error) {
	 *   console.log(error);
	 *   return false;
	 * }
	 * }
	 *
	 * useEffect(() => {
	 * fetchAll().then( result => {
	 *   if(result)
	 *     setCharacters(result);
	 * });
	 * }, [] );
	 *
	 * async function getUsersInfoById(id)
	 * {
	 * try
	 * {
	 * const response =
	 * await axios.get("http://localhost:5001/users/" + id);
	 * return response;
	 * }
	 * catch (error)
	 * {
	 * console.log(error);
	 * return false;
	 * }
	 * }
	 *
	 * useEffect(() =>
	 * {
	 * // change background color with a random color
	 * const color = Math.floor(Math.random() * 16777215).toString(16);
	 * document.body.style.background = color;
	 * });
	 */

	return (
		<div className="container-fluid">
			<div className="row">
				<HeaderHome />
			</div>

			<div className="row" id="primary_view">
				<div className="col-8" id="calendar_view">
					<PrimaryView />
				</div>

				<div className="col-4" id="todolist_view">
					<ToDoListView />
				</div>
			</div>

			<button type="button" 
				className="btn btn-secondary btn-lg" id="add_task">
				+
			</button>

			<Router>
				<Sidebar />

				<Routes>
					<Route
						path="/homepage"
						component={Homepage}
					/>
				</Routes>
			</Router>

			<Router>
				<LoginReg />

				<Routes>
					<Route
						path="/homepage"
						component={Homepage}
					/>
				</Routes>
			</Router>
		</div>
	);

}

export default Homepage;
