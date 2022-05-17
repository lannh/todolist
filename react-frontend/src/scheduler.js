var schedule_times = 
[
	{
		start_time: 0,
		end_time: 1,
		
		start_time_flexibility: 1,
		end_time_flexibility: 1,
	},
	{
		start_time: 3,
		end_time: 5,
		
		start_time_flexibility: 1,
		end_time_flexibility: 1,
	},
	{
		start_time: 6,
		end_time: 12,
		
		start_time_flexibility: 1,
		end_time_flexibility: 1,
	},
	{
		start_time: 15,
		end_time: 20,
		
		start_time_flexibility: 1,
		end_time_flexibility: 1,
	}	
];

var activities = 
[
	{
		length: 1,
		priority: 5,
	},
	{
		length: 3,
		priority: 2,
	},	
	{
		length: 5,
		priority: 4,
	},	
	{
		length: 3,
		priority: 1,
	},	
	{
		length: 2,
		priority: 2,
	},	
	{
		length: 1,
		priority: 1,
	},
];

function activity_sort(a, b)
{
	if (a.priority == b.priority)
	{
		//longer tasks = more important (for now?)
		return a.length > b.length;
	}
	else
	{
		return a.priority > b.priority;
	}
}

function schedule_sort(a, b)
{
	return a.start_time < b.start_time;
}

function solve_schedule(unscheduled_activities, schedule_data)
{
	//Make sure schedule blocks are in order so during display phase
	//we dont have to worry about this, just display in the current order.
	//Also sort activities based on priority/length so that tasts with the
	//highest "important" score get placed first
	schedule_data.sort(schedule_sort);
	unscheduled_activities.sort(activity_sort);

	//create schedule shell
	var schedule = [];
	for (let block_index = 0; block_index < schedule_data.length; block_index++)
	{
		var b_data = schedule_data[block_index];
		var data = 
		{
			activities: [],
			block_data: b_data,
			remaining_time: b_data.end_time - b_data.start_time,
		};
		schedule.push(data);
	} 

	//fit activities into schedule
	for (let activity_index = 0; 
		activity_index < unscheduled_activities.length; 
		activity_index++)
	{
		var activity_data = unscheduled_activities[activity_index];

		//find best schedule block for activity
		var best_index = -1;
		for (let block_index = 0; block_index < schedule.length; block_index++)
		{
			var block_data = schedule[block_index];
			if (block_data.remaining_time >= activity_data.length)
			{
				if (best_index == -1 || 
					schedule[best_index].remaining_time 
					< block_data.remaining_time) 
				{
					best_index = block_index;
				}
			} 
		}
		
		if (best_index == -1)
		{
			//if we dont not have enough space find the best block to extend
			//so we have just enough space.
			
			var best_score = -1;
			var best_block = -1;
			var best_direction = -1;
			var best_extend = -1; //debug

			for (let block_index = 0; 
				block_index < schedule.length; 
				block_index++)
			{
				var s_block = schedule[block_index];
				var extend_targ = activity_data.length - s_block.remaining_time;
				
				var cs = s_block.block_data.start_time;
				var ce = s_block.block_data.end_time;
				var ns = block_index < schedule.length - 1 
					? schedule[block_index + 1].block_data.start_time 
					: 24;

				var le = block_index > 0 
					? schedule[block_index - 1].block_data.end_time 
					: 0;
				
				var a = -1, b = -1, c = -1;
				if (ns - ce >= extend_targ)
				{
					a = s_block.block_data.end_time_flexibility;
				}
				
				if (cs - le >= extend_targ)
				{
					b = s_block.block_data.start_time_flexibility;
				}

				// if ((ns - ce) + (cs - le) >= extend_targ)
				// {
				// 	// console.log((ns - ce), (cs - le), extend_targ);
				// 	c = Math.max(s_block.block_data.start_time_flexibility, 
				// 		s_block.block_data.end_time_flexibility);
				// }

				if(a > b)
				{
					if(a > c)
					{
						if (a > best_score)
						{
							best_score = a;
							best_block = block_index;
							best_direction = 0;
							best_extend = extend_targ;
						}
					}
					else
					{
						if (c > best_score)
						{
							best_score = c;
							best_block = block_index;
							best_direction = 2;
							best_extend = extend_targ;
						}
					}
				}
				else
				{
					if(b > c)
					{
						if (b > best_score)
						{
							best_score = b;
							best_block = block_index;
							best_direction = 1;
							best_extend = extend_targ;
						}
					}
					else
					{
						if (c > best_score)
						{
							best_score = c;
							best_block = block_index;
							best_direction = 2;
							best_extend = extend_targ;
						}
					}
				}
			}

			if(best_block == -1)
			{
				//AFAIK this can only happen if there is not enough space to 
				//add the current task throughout the entire schedule, one fix
				//for this would be to allow for segmentation of tasks, but im 
				//not sure if this would actually be a good idea.
				console.log("something is wrong");
			}
			else
			{
				best_index = best_block;
				switch(best_direction)
				{
				case 0:
				{
					schedule[best_block].block_data.end_time += best_extend;
					schedule[best_block].remaining_time += best_extend;
					break;	
				}
					
				case 1:
				{
					schedule[best_block].block_data.start_tine -= best_extend;
					schedule[best_block].remaining_time += best_extend;
					break;	
				}
					
				case 2:
				{
					//TODO:
					//extend as far as possible in the 
					//direction of highest flexibilty first
					//extend in opposite direction with remaining
					//time 
					break;	
				}
				}
			}
		}
		
		var t_r = schedule[best_index].remaining_time - activity_data.length;
		schedule[best_index].remaining_time = t_r;
		schedule[best_index].activities.push(activity_data);
	}

	for (let block_index = 0; 
		block_index < schedule.length; 
		block_index++)
	{
		var block = schedule[block_index];
		console.log(block);
	}
}

solve_schedule(activities, schedule_times);

//node .\react-frontend\src\scheduler.js

// export.solve_schedule = solve_schedule;