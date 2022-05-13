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
		var block_data = schedule_data[block_index];
		var data = 
		{
			activities: [],
			block_data: block_data,
			remaining_time: block_data.end_time - block_data.start_time,
		};
		schedule.push(data);
	} 

	//fit activities into schedule
	for (let activity_index = 0; activity_index < unscheduled_activities.length; activity_index++)
	{
		var activity_data = unscheduled_activities[activity_index];

		//find best schedule block for activity
		var best_index = -1;
		for (let block_index = 0; block_index < schedule.length; block_index++)
		{
			var block_data = schedule[block_index];
			if (block_data.remaining_time >= activity_data.length)
			{
				if (best_index == -1 || schedule[best_index].remaining_time < block_data.remaining_time) 
				{
					best_index = block_index;
				}
			} 
		}
		
		if (best_index == -1)
		{
			//TODO: NOT DONE
			//if we dont not have enough space find the best block to extend
			//so we have just enough space.
			var best_block = -1;
			var best_block_score = 0;
			for (let block_index = 0; block_index < schedule.length; block_index++)
			{
				var block_score = 0;
				var schedule_block = schedule[block_index];
				var extend_time = activity_data.length - schedule_block.remaining_time;
				
				//compute score of current block
				//currently this takes into account how much the block would need to 
				//extend forward in order to fit the current task we're looking at into 
				//the block, ideally this should be based on flexibility as well, and go
				//backwards too.
				if (block_index == schedule.length - 1 || schedule[block_index + 1].block_data.start_time - schedule_block.block_data.end_time >= extend_time)
				{
					block_score = extend_time - schedule_block.block_data.end_time_flexibility;
				}
				
				if (best_block == -1 || block_score > best_block_score)
				{
					best_block_score = block_score;
					best_block = block_index;
				}
			}

			if(best_block == -1)
			{
				//AFAIK this can only happen if there is not enough space to add the current task
				//throughout the entire schedule, one fix for this would be to allow for segmentation 
				//of tasks, but im not sure if this would actually be a good idea.
				console.log("something is wrong");
			}
			else
			{
				best_index = best_block;
			}
		}

		schedule[best_index].remaining_time = schedule[best_index].remaining_time - activity_data.length;
		schedule[best_index].activities.push(activity_data);
	}
 
	console.log(schedule);
}

solve_schedule(activities, schedule_times);

//node .\react-frontend\src\scheduler.js