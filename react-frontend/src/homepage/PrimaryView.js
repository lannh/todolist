import React from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
// Import timeGridPlugin from "@fullcalendar/timegrid";

//import "@fullcalendar/daygrid/main.css";
//import "@fullcalendar/timegrid/main.css";

// Import events from "./events";

function PrimaryView ()
{

	return (
		<div className="d-flex align-content-sm-stretch flex-sm-column"
			id="primary_view">
			<div className="p-2" id="calendar_title">
				<span className="calendar_title">Calendar</span>
			</div>

			<div className="p-2" id="calendar">
				<FullCalendar
					defaultView="dayGridMonth"
					height="60vh"
					/*
					 * ThemeSystem="Simplex"
					 * header={{
					 *   left: "prev,next",
					 *   center: "title",
					 *   right: "dayGridMonth,timeGridWeek,timeGridDay",
					 * }}
					 */
					plugins={[dayGridPlugin]}
					// Events={events}
					displayEventEnd="true"
					eventColor=
						{`#${Math.floor(Math.random()*16777215).toString(16)}`}
					handleWindowResize="true"
					aspectRatio="4"
				/>
			</div>
		</div>
	);

}

export default PrimaryView;
