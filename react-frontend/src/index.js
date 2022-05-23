import React from "react";
import ReactDOM from "react-dom";
import {Route, BrowserRouter, Routes} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap-icons/font/bootstrap-icons.css";


import "./index.css";

import "./homepage/homepage.css";
import "./searchpage/searchpage.css";

import SearchPage from "./searchpage/searchpage";
import Homepage from "./homepage/homepage";


ReactDOM.render(
	<BrowserRouter>
		<Routes>
			<Route path="/homepage" element={<Homepage/ >}/>
			<Route path="/search" element={<SearchPage />}/>
		</Routes>
	</BrowserRouter>,
	document.getElementById("root")
);	