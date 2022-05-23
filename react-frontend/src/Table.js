import React from "react";

/*function TableHeader()  
{
	return (
		<thead>
			<tr>
				<th>ID</th>
				<th>Task Name </th>
				<th>Date</th>
				<th>Location</th>
				<th>Remove</th>
			</tr>
		</thead>
	);
}*/

function TableBody(props) 
{
	const rows = props.characterData.map((row, index) => 
	{
		return (
			<tr key={index}>
			
				<td>TaskName: {row.taskName}</td>         
				<td>Date: {row.date}</td>
				<td>Loc: {row.location}</td>
				{/* <td>
					<button onClick={() => props.removeCharacter(index)}>
						Delete
					</button>
				</td> */}
			</tr>
		);
	}
	);
	return (
		<tbody>
			{rows}
		</tbody>
	);
}

function Table(props) 
{
	return (
		<table>
			
			<TableBody characterData={props.characterData} 
				removeCharacter={props.removeCharacter} />  
		</table>
	);  
}

export default Table;