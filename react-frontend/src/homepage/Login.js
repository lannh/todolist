import React from "react";
//import {Link} from "react-router-dom";

function Login ()
{
	return (
		<>
			<div className="offcanvas offcanvas-end w-25" tabIndex="-1"
				id="offcanvas_login" data-bs-keyboard="false" 
				data-bs-backdrop="true">
				<div className="offcanvas-header">
					<h6 className="offcanvas-title d-none d-sm-block"
						id="offcanvas">
						Login
					</h6>

					<button type="button" className="btn-close text-reset"
						data-bs-dismiss="offcanvas" ria-label="Close"
						id="close_sidebar" />
				</div>

				<div className="offcanvas-body px-2">
					<form>
						<div className="form-group">
							<label htmlFor="input_email" 
								className="form-label">
								Email
							</label>
										
							<input
								type="email"
								className="form-control"
								id="input_email"
							/>

							<label htmlFor="input_email" 
								className="form-label">
								Password
							</label>
										
							<input
								type="password"
								className="form-control"
								id="input_password"
							/>
							<br></br>
							<button className="btn btn-primary"
								data-bs-toggle="offcanvas"
								data-bs-target="#offcanvas_login"
								id="submit_login_button"> Login</button>

						</div>
					</form>
				</div>
			</div>
		</>
	);
}

export default Login;