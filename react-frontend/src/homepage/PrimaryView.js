import React from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";


import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";


import events from "./events";
 

function PrimaryView()
{
    return (
        <div className="primary_view">

            <h1 className="calendar_title">Calendar</h1>

            <FullCalendar
                
                defaultView="dayGridMonth"

                height="500px"
                // themeSystem="Simplex"
                // header={{
                //   left: "prev,next",
                //   center: "title",
                //   right: "dayGridMonth,timeGridWeek,timeGridDay",
                // }}
                plugins={[dayGridPlugin]}
                //events={events}
                displayEventEnd="true"
                eventColor={"#" + Math.floor(Math.random() * 16777215).toString(16)}
                handleWindowResize="true"
                aspectRatio="4"
            />

        </div>

    );
}

export default PrimaryView;