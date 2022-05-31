import React from "react";
import Form from "./TimeSlotForm";

function WeeklyAvailability (props)
{
	function timeNumToString(start_time, end_time)
	{
		let tH = Math.trunc(start_time / 60).toString();
		tH = (tH.length === 1)?"0"+tH:tH;
		let tM = (start_time % 60).toString();
		tM = (tM.length === 1)?"0"+tM:tM;
		let stTime = tH + ":" + tM;
		tH = Math.trunc(end_time / 60).toString();
		tH = (tH.length === 1)?"0"+tH:tH;
		tM = (end_time % 60).toString();
		tM = (tM.length === 1)?"0"+tM:tM;
		let enTime = tH + ":" + tM;
		return [stTime, enTime];
	}

	function SlotList(props) 
	{
		const rows = props.timeSlots.map((row, index) => 
		{
			let [start_time, end_time] = timeNumToString(row.start_time, row.end_time);
			return (
				<tr key={index}>
					<td>{start_time}</td>
					<td>&nbsp;-&nbsp;</td>
					<td>{end_time}</td>
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
					Your Weekly Availability
				</span>
			</div>

			<div className="row" id="input_schedule">
				<div className="col-1" id="input_day_view">
					<div className="p-3" id="day_title">
						<span className="day_title">Monday</span>
					</div>
					<SlotList timeSlots={props.slotData.Mon} 
						removeTimeSlot={props.removeSlot} dayIndex={0} />
					<Form handleSubmit={props.handleSubmit} dayIndex={0} />
				</div>
				<div className="col-1" id="input_day_view">
					<div className="p-3" id="day_title">
						<span className="day_title">Tuesday</span>
					</div>
					<SlotList timeSlots={props.slotData.Tue} 
						removeTimeSlot={props.removeSlot} dayIndex={1} />
					<Form handleSubmit={props.handleSubmit} dayIndex={1} />
				</div>
				<div className="col-1" id="input_day_view">
					<div className="p-3" id="day_title">
						<span className="day_title">Wednesday</span>
					</div>
					<SlotList timeSlots={props.slotData.Wed} 
						removeTimeSlot={props.removeSlot} dayIndex={2} />
					<Form handleSubmit={props.handleSubmit} dayIndex={2} />
				</div>
				<div className="col-1" id="input_day_view">
					<div className="p-3" id="day_title">
						<span className="day_title">Thursday</span>
					</div>
					<SlotList timeSlots={props.slotData.Thu} 
						removeTimeSlot={props.removeSlot} dayIndex={3} />
					<Form handleSubmit={props.handleSubmit} dayIndex={3} />
				</div>
				<div className="col-1" id="input_day_view">
					<div className="p-3" id="day_title">
						<span className="day_title">Friday</span>
					</div>
					<SlotList timeSlots={props.slotData.Fri} 
						removeTimeSlot={props.removeSlot} dayIndex={4} />
					<Form handleSubmit={props.handleSubmit} dayIndex={4} />
				</div>
				<div className="col-1" id="input_day_view">
					<div className="p-3" id="day_title">
						<span className="day_title">Saturday</span>
					</div>
					<SlotList timeSlots={props.slotData.Sat} 
						removeTimeSlot={props.removeSlot} dayIndex={5} />
					<Form handleSubmit={props.handleSubmit} dayIndex={5} />
				</div>
				<div className="col-1" id="input_day_view">
					<div className="p-3" id="day_title">
						<span className="day_title">Sunday</span>
					</div>
					<SlotList timeSlots={props.slotData.Sun} 
						removeTimeSlot={props.removeSlot} dayIndex={6} />
					<Form handleSubmit={props.handleSubmit} dayIndex={6} />
				</div>
			</div>
		</div>
	);

}

export default WeeklyAvailability;
