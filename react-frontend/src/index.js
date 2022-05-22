import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap-icons/font/bootstrap-icons.css";

//import MyApp from "./MyApp";
// import "./index.css";

import "./homepage/homepage.css";
import "./searchpage/searchpage.css";

import SearchPage from "./searchpage/searchpage";
//import Homepage from "./homepage/homepage";

ReactDOM.render(
	//<Homepage />,
	<SearchPage />,
	//<MyApp />,
	document.getElementById("root")
);
