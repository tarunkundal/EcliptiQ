export interface TaskState {
	tasks: TaskTable[];
}

export interface TaskTable {
	id: string | any;
	title: string;
	description: string;
	dueDate: Date | any;
	created_at: string | any;
	stage: string;
	priority: string;
	team_id: string;
	assigned_to: string;
	created_by: string | undefined;
	updated_at: Date | any;
	favourite: boolean;
}

export interface NewTaskData {
	title: string;
	description: string;
	dueDate: Date;
	stage: string;
	priority: string;
	team_id: string;
	assigned_to: string;
	created_by: string | undefined;
	favourite: boolean;
}

export interface UpdateTaskData {
	title: string;
	description: string;
	dueDate: Date | string;
	stage: string;
	priority: string;
	updated_at: string | Date;
}

export interface SetTaskActionPayload {
	tasks: TaskTable[];
}

export interface UpdateTaskActionPayload {
	taskId: any;
	taskData: UpdateTaskData;
}

export interface UpdateTaskStatusActionPayload {
	taskId: any;
	stage: string;
}

export interface UpdateTaskFavouriteStatusActionPayload {
	taskId: any;
	favouriteStatus: boolean;
}

export interface AddTaskActionPayload {
	task: TaskTable;
}

export interface DeleteTaskActionPayload {
	taskId: any | string;
}
