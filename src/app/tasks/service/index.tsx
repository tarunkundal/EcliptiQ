import supabase from '../../supabase';
import { NewTaskData, TaskTable, UpdateTaskData } from '../types';

// fetch all Tasks
export const _fetchAllTasks = async (): Promise<{
	data: TaskTable[] | null;
	error: any;
}> => {
	return await supabase.from('tasks').select('*');
};

// fetching all Tasks by team_id
export const _fetchAllTasksOfTeam = async (
	team_id: any
): Promise<{ data: TaskTable[] | null; error: any }> => {
	return await supabase.from('tasks').select().eq('team_id', team_id);
};

// updating taskStatus
export const _updateTaskStatus = async ({     taskId,
	taskStatus,
}: {
	taskId: any;
	taskStatus: string | undefined;
}): Promise<{ data: TaskTable[] | null; error: any }> => {
	return await supabase
		.from('tasks')
		.update({ stage: taskStatus })
		.eq('id', taskId)
		.select();
};

// updating task favourite status
export const _updateFavouriteStatus = async ({
	favouriteStatus,
	taskId,
}: {
	favouriteStatus: boolean;
	taskId: string;
}): Promise<{ data: TaskTable[] | null; error: any }> => {
	return await supabase
		.from('tasks')
		.update({ favourite: favouriteStatus })
		.eq('id', taskId)
		.select();
};

// create new task
export const _createNewTask = async ({
	taskData,
}: {
	taskData: NewTaskData;
}): Promise<{
	data: TaskTable[] | null;
	error: any;
}> => {
	return await supabase.from('tasks').insert([taskData]).select();
};

// delete task
export const _deleteTask = async (taskId: string): Promise<{ error: any }> => {
	return await supabase.from('tasks').delete().eq('id', taskId);
};

// update task
export const _updateTask = async ({
	taskId,
	taskData,
}: {
	taskId: any;
	taskData: UpdateTaskData;
}): Promise<{ data: TaskTable[] | null; error: any }> => {
	return await supabase
		.from('tasks')
		.update({
			stage: taskData.stage,
			title: taskData.title,
			description: taskData.description,
			dueDate: taskData.dueDate,
			priority: taskData.priority,
			updated_at: taskData.updated_at,
		})
		.eq('id', taskId)
		.select();
};
