import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import image from "../homepage/default_avatar.jpeg";
import Sidebar from "./Sidebar";

function HeaderHome ()
{
	return (
		<>
			<div className="header_home">
				<div>
					<h1 className="header_title">Dialed In</h1>
				</div>

				<div className="user_info">
					<div className="avatar_col">
						<img className="user_avatar" 
							src={image} alt="user avatar"/>
					</div>

					<div className="user_name">{" "}Oneders{" "}</div>

					<div className="menu_button_col">
						<button className="btn btn-outline-success"
							data-bs-toggle="offcanvas" 
							data-bs-target="#offcanvas"
							id="menu_button" />
					</div>
				</div>
			</div>
			<Sidebar />
		</>
	);

}

export default HeaderHome;
