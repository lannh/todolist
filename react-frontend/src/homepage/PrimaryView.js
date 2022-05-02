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
        <div className="container" id="primary_view">

            <div className="row" id="calendar_title">
                <h1>Calendar</h1>
            </div>

            <div className="row" id="calendar">
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

        </div>
    );
}

export default PrimaryView;