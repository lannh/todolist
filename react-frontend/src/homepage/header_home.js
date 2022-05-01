import React from "react";
import 'bootstrap/dist/css/bootstrap.css';


function HeaderHome(props)
{
    return (
        <div className="header_home">
            <h1 className="header_title">Dialed In</h1>

            <div className="userNMenu">
                <img class="user_avatar" src="https://yt3.ggpht.com/ytc/AKedOLTjWeLVEfOwpOW2VApxNxs6FW1Z0WbvQly_TruQjA=s900-c-k-c0x00ffffff-no-rj" alt=""/>

                <div className="user_name"> John Doe </div>

                <div class="dropdown">
                    <button class="btn btn-secondary" type="button" 
                            id="dropdownMenuButton" data-bs-toggle="dropdown" 
                            aria-haspopup="true" aria-expanded="false">
                    </button>

                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeaderHome;