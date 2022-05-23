import React from "react";
import Form from "./TimeSlotForm";

function WeeklyAvailability (props)
{
	function SlotList(props) 
	{
		const rows = props.timeSlots.map((row, index) => 
		{
			return (
				<tr key={index}>
					<td>{row.startTime}</td>
					<td>&nbsp;-&nbsp;</td>
					<td>{row.endTime}</td>
					<td>
						<button 
							onClick={() => 
								props.removeTimeSlot(props.dayIndex, index)}>
							Delete
						</button>
					</td>
				</tr>
			);
		});
		return (
			<tr>
				{rows}
			</tr>
		);
	}

	return (
		<div className="d-flex align-content-sm-stretch flex-sm-column"
			id="primary_view">
			<div className="p-2" id="input_schedule_prompt">
				<span className="input_schedule_prompt">
					Input your weekly available time slots.
				</span>
			</div>

			<div className="row" id="input_schedule">
				<div className="col-1" id="input_day_view">
					<div className="p-3" id="day_title">
						<span className="day_title">Monday</span>
					</div>
					<SlotList timeSlots={props.slotData[0]} 
						removeTimeSlot={props.removeSlot} dayIndex={0} />
					<Form handleSubmit={props.handleSubmit} dayIndex={0} />
				</div>
				<div className="col-1" id="input_day_view">
					<div className="p-3" id="day_title">
						<span className="day_title">Tuesday</span>
					</div>
					<SlotList timeSlots={props.slotData[1]} 
						removeTimeSlot={props.removeSlot} dayIndex={1} />
					<Form handleSubmit={props.handleSubmit} dayIndex={1} />
				</div>
				<div className="col-1" id="input_day_view">
					<div className="p-3" id="day_title">
						<span className="day_title">Wednesday</span>
					</div>
					<SlotList timeSlots={props.slotData[2]} 
						removeTimeSlot={props.removeSlot} dayIndex={2} />
					<Form handleSubmit={props.handleSubmit} dayIndex={2} />
				</div>
				<div className="col-1" id="input_day_view">
					<div className="p-3" id="day_title">
						<span className="day_title">Thursday</span>
					</div>
					<SlotList timeSlots={props.slotData[3]} 
						removeTimeSlot={props.removeSlot} dayIndex={3} />
					<Form handleSubmit={props.handleSubmit} dayIndex={3} />
				</div>
				<div className="col-1" id="input_day_view">
					<div className="p-3" id="day_title">
						<span className="day_title">Friday</span>
					</div>
					<SlotList timeSlots={props.slotData[4]} 
						removeTimeSlot={props.removeSlot} dayIndex={4} />
					<Form handleSubmit={props.handleSubmit} dayIndex={4} />
				</div>
				<div className="col-1" id="input_day_view">
					<div className="p-3" id="day_title">
						<span className="day_title">Saturday</span>
					</div>
					<SlotList timeSlots={props.slotData[5]} 
						removeTimeSlot={props.removeSlot} dayIndex={5} />
					<Form handleSubmit={props.handleSubmit} dayIndex={5} />
				</div>
				<div className="col-1" id="input_day_view">
					<div className="p-3" id="day_title">
						<span className="day_title">Sunday</span>
					</div>
					<SlotList timeSlots={props.slotData[6]} 
						removeTimeSlot={props.removeSlot} dayIndex={6} />
					<Form handleSubmit={props.handleSubmit} dayIndex={6} />
				</div>
			</div>
		</div>
	);

}

export default WeeklyAvailability;
