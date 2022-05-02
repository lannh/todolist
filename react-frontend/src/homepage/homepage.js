import HeaderHome from "./header_home";
import axios from "axios";
import React, {useState, useEffect} from "react";
import PrimaryView from "./PrimaryView";

function Homepage() 
{
  const [user, setUsers] = useState([]);

/* later use for fetching all tasks
  async function fetchAll()
  {
    try {
      const response = await axios.get('http://localhost:5001/users');
      return response.data.users_list;
    }
    catch(error) {
      console.log(error);
      return false;
    }
  }

  useEffect(() => {
    fetchAll().then( result => {
      if(result)
        setCharacters(result);
    });
  }, [] );*/

  async function getUsersInfoById(id)
  {
    try {
      const response = await axios.get('http://localhost:5001/users/'+id)
      return response;
    }
    catch(error) {
      console.log(error);
      return false;
    }
  }

  useEffect(() => {
    // change background color with a random color
    const color = Math.floor(Math.random()*16777215).toString(16);
    document.body.style.background = color;
  });

  return (
    <div className="container-fluid">
        <div className="row"> <HeaderHome user={user} /> </div>

        <div className="row" id="primary_view">
            <div className="col-8"> 
                <PrimaryView />
            </div>

            <div className="col-4"></div>
        </div>
        <button type="button" class="btn btn-secondary btn-lg" id="add_task">+</button>
    </div>
  )
}

export default Homepage;