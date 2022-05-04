import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Sidebar from "./Sidebar";
import Homepage from "./homepage";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";



function HeaderHome(props)
{


    return (
        <div className="header_home">
            <h1 className="header_title">Dialed In</h1>

            <div className="user_info">
                <img className="user_avatar" src="https://yt3.ggpht.com/ytc/AKedOLTjWeLVEfOwpOW2VApxNxs6FW1Z0WbvQly_TruQjA=s900-c-k-c0x00ffffff-no-rj" alt=""/>
                

                <div className="user_name">  Oneders </div>
            </div>


            <Router>
                <Sidebar />
                <Routes>

                    <Route path="/" component={Homepage} />
                </Routes>
            </Router>

        </div>
    );
}

export default HeaderHome;