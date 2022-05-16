import React from "react";
import {Link} from "react-router-dom";

function Sidebar ()
{

	return (
		<>
			<div className="offcanvas offcanvas-end w-25" tabIndex="-1"
				id="offcanvas" data-bs-keyboard="false" 
				data-bs-backdrop="true">
				<div className="offcanvas-header">
					<h6 className="offcanvas-title d-none d-sm-block"
						id="offcanvas">
						Menu
					</h6>

					<button type="button" className="btn-close text-reset"
						data-bs-dismiss="offcanvas" ria-label="Close"
						id="close_sidebar" />
				</div>

				<div className="offcanvas-body px-0">
					<ul className="nav nav-pills flex-column 
						mb-sm-auto mb-0 align-items-start" id="menu">
						<li>
							<Link to="/homepage" class="nav-link text-truncate">
								<i className="fs-5 bi-speedometer2" />
								<span className="ms-1 d-none d-sm-inline">
									Dashboard
								</span>
							</Link>
						</li>

						<li>
							<a href="/" className="nav-link text-truncate">
								<i className="fs-5 bi-table" />
								<span className="ms-1 d-none d-sm-inline">
									Manage Tasks
								</span>
							</a>
						</li>

						<li>
							<a href="/#" className="nav-link text-truncate">
								<i className="fs-5 bi-gear" />

								<span className="ms-1 d-none d-sm-inline">
									Account Setting
								</span>
							</a>
						</li>

						<li>
							<a href="/#" className="nav-link text-truncate">
								<i className="fs-5 bi-box-arrow-left" />

								<span className="ms-1 d-none d-sm-inline">
									Logout
								</span>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</>
	);

}

export default Sidebar;
