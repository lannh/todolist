import HeaderHome from "./header_home";
import axios from "axios";
import React, {useState, useEffect} from "react";

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
    <div class="container-fluid">
        <div class="row"><HeaderHome user={user} /></div>
        <div class="row">
            <div class="col-8"></div>
            <div class="col-4"></div>
        </div>
    </div>
  )
}

export default Homepage;