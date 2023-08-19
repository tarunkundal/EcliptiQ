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
}

export interface NewTaskData {
	title: string;
	description: string;
	dueDate: Date | any;
	stage: string;
	priority: string;
	team_id: string;
	assigned_to: string;
	created_by: string | undefined;
}

export interface UpdateTaskData {
	title: string;
	description: string;
	dueDate: Date | any;
	stage: string;
	priority: string;
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
	stage: string | any;
}

export interface AddTaskActionPayload {
	task: TaskTable;
}

export interface DeleteTaskActionPayload {
	taskId: any;
}
