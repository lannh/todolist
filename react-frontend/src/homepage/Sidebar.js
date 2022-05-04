import React, { useState } from "react";
import {Link} from "react-router-dom";


function Sidebar()
{
	return(
		<>
			<div class="offcanvas offcanvas-end w-25" tabindex="-1" 
				id="offcanvas" data-bs-keyboard="false" data-bs-backdrop="true">
    			<div class="offcanvas-header">
        			<h6 class="offcanvas-title d-none d-sm-block" id="offcanvas">Menu</h6>
        			<button type="button" class="btn-close text-reset" 
						data-bs-dismiss="offcanvas" aria-label="Close" id="close_sidebar"></button>
    			</div>
    
				<div class="offcanvas-body px-0">
        			<ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start" id="menu">
						<li>
							<Link to="/" class="nav-link text-truncate">
                    			<i class="fs-5 bi-speedometer2"></i>
								<span class="ms-1 d-none d-sm-inline">Dashboard</span> </Link>
            			</li>

            			<li>
                			<a href="/" class="nav-link text-truncate">
                    			<i class="fs-5 bi-table"></i>
								<span class="ms-1 d-none d-sm-inline">Manage Tasks</span>
							</a>
            			</li>

						<li>
							<a href="#" class="nav-link text-truncate">
								<i class="fs-5 bi-gear"></i>
								<span class="ms-1 d-none d-sm-inline">Account Setting</span>
							</a>
						</li>

						<li>
							<a href="#" class="nav-link text-truncate">
								<i class="fs-5 bi-box-arrow-left"></i>
								<span class="ms-1 d-none d-sm-inline">Logout</span> 	
							</a>
						</li>
        			</ul>
    			</div>
			</div>

			<button className="btn btn-outline-success" data-bs-toggle="offcanvas" 
				data-bs-target="#offcanvas" role="button" id="menu_button">
			</button>

	</>
	);
}

export default Sidebar;
