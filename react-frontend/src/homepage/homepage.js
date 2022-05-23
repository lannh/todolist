import HeaderHome from "./header_home";
import Form from "../Form";
import axios from "axios";
import Table from "../Table";
import React , {useState} from "react";
import PrimaryView from "./PrimaryView";
import ToDoListView from "./ToDoListView";
import Sidebar from "./Sidebar";
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
	/*
  state = {
    seen: false
  };

  togglePop = () => {
    this.setState({
      seen: !this.state.seen
    });
  };

  render() {
    return (
      <div>
        <div className="btn" onClick={this.togglePop}>
          <button>New User?</button>
        </div>
        {this.state.seen ? <PopUp toggle={this.togglePop} /> : null}
      </div>
    );
  }
	*/
	const [characters, setCharacters] = useState([]);
	const [formPopup, setFormPopup] = useState(false);
	function removeOneCharacter(index)
	{
		const updated = characters.filter((character,i) => 
		{
			return i!== index;
		});
		/*setCharacters(updated);*/

		const userToDel = characters.find((character, i) => i===index);
    
		makeDelCall(userToDel._id).then(result => 
		{
			if(result && result.status === 204)
				setCharacters(updated);
		});
	}

	function updateList(person)
	{
		//setCharacters([...characters,person]);
		makePostCall(person).then(result => 
		{
			if(result && result.status === 201)
				setCharacters([...characters, result.data]);
		});
	}

	async function fetchAll()
	{
		try 
		{
			const response = await axios.get("http://localhost:5001/users");
			return response.data.tasks_list;
		}
		catch(error) 
		{
			console.log(error);
			return false;
		}
	}

	/*useEffect(() => 
	{
		fetchAll().then(result => 
		{
			if(result)
				setCharacters(result);
		});
	}, []);
*/
	async function makePostCall(person)
	{
		try 
		{
			const response = 
				await axios.post("http://localhost:5001/users", person);
			return response;
		}
		catch (error) 
		{
			console.log(error);
			return false;
		}
	}

	async function makeDelCall(id)
	{
		try 
		{
			const response = 
				await axios.delete("http://localhost:5001/users/"+id);
			return response;
		}
		catch(error) 
		{
			console.log(error);
			return false;
		}
	}


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
					<Table characterData={characters} 
				removeCharacter={removeOneCharacter} />
				</div>
			</div>
			<div className="form_button_col">
				<button className="btn btn-secondary btn-lg" id="add_task" onClick = {() => setFormPopup(true)} >
					+
				</button>
			</div>
			<div className="container">
				<Form handleSubmit={updateList} trigger = {formPopup} setTrigger ={setFormPopup} />
			</div>
			<Router>
				  <Sidebar />
				<Routes>
					<Route
						path="/"
						component={Homepage}
					/>
				</Routes>
			</Router>
		</div>
	);

}

export default Homepage