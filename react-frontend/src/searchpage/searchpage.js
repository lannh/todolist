import TasksDisplay from "./tasksdisplay";
//import Form from "./Form";
import axios from "axios";
import React, {useState, useEffect}  from "react";
//{useState, useEffect}
import HeaderHome from "../homepage/header_home";


//const characters = [];

function SearchPage() 
{
	const [characters, setCharacters] = useState([]);

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

	/*function updateList(person)
	{
		//setCharacters([...characters,person]);
		makePostCall(person).then(result => 
		{
			if(result && result.status === 201)
				setCharacters([...characters, result.data]);
		});
	}*/

	async function fetchAll()
	{
		try 
		{
			const response = await axios.get("http://localhost:5001/users");
			return response.data.users_list;
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
				setCharacters(result);
		});
	}, []);

	/*async function makePostCall(person)
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
	}*/

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

			<div className="row" id="searchPage">

				<div className="d-flex flex-column"
					id="todolist_col">

					<div className="p-2" id="todolist_title">Search</div>

					<div className="p-2" id="todo_list">
						<TasksDisplay characterData={characters} 
							removeCharacter={removeOneCharacter} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default SearchPage;