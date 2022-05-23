import HeaderHome from "../homepage/header_home";
//import axios from "axios";
import React, {useState} from "react";
import Sidebar from "../homepage/Sidebar";
import WeeklyAvailability from "./WeeklyAvailability";

function InputSchedule ()
{
	const [slots, setTimeSlots] = useState([[], [], [], [], [], [], []]);
	function removeTimeSlot (dayIndex, index)
	{
		const updated = JSON.parse(JSON.stringify(slots));
		updated[dayIndex] = updated[dayIndex].filter((slot, i) =>
		{
			return i !== index;
		});
		setTimeSlots(updated);
		/*try {
			const response = await axios.delete('http://localhost:5000/users/'
				+ props.id + '/inputSchedule/' + dayIndex);
			if (!(response && response.status === 204))
				console.log(
				'Could not delete time slot for user with id \'' +
				props.id + '\' in backend.');
		}
		catch (error)
		{
			//We're not handling errors. Just logging into the console.
			console.log(error);
		}*/
	}

	function updateList(dayIndex, slot)
	{
		/*postSlot(dayIndex, slot).then( result => {
		if (result && result.status === 201) {*/
		const updated = JSON.parse(JSON.stringify(slots));
		updated[dayIndex].push(slot);
		setTimeSlots(updated);
		/*}
		});*/
	}

	/*async function fetchAll(){
		try {
			const response = await axios.get('http://localhost:5000/users/'
				+ props.id + '/inputSchedule');
			return response.users.users_list[props.id]['availability'];     
		}
		catch (error){
			//We're not handling errors. Just logging into the console.
			console.log(error); 
			return false;         
		}
	}
	async function postSlot(dayIndex, slot){
		try {
			const response = await axios.post('http://localhost:5000/users/'
				+ props.id + '/inputSchedule/' + dayIndex, slot);
			return response;
		}
		catch (error) {
			console.log(error);
			return false;
		}
	}
	useEffect(() => {
		fetchAll().then( result => {
			if (result)
				setTimeSlots(result);
		});
	}, [] );*/

	return (
		<div className="container-fluid">
			<div className="row">
				<HeaderHome />
			</div>

			<div className="row" id="primary_view">
				<div className="col-7" id="input_schedule_view">
					<WeeklyAvailability slotData={slots}
						removeSlot={removeTimeSlot} handleSubmit={updateList} />
				</div>
			</div>

			<button type="button" 
				className="btn btn-secondary btn-lg" id="add_task">
				+
			</button>
			<div>
				<Sidebar />
			</div>
		</div>
	);

}

export default InputSchedule;
