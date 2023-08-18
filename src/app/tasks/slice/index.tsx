import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
	AddTaskActionPayload,
	DeleteTaskActionPayload,
	SetTaskActionPayload,
	TaskState,
	UpdateTaskActionPayload,
	UpdateTaskStatusActionPayload,
} from '../types';

const initialState: TaskState = { tasks: [] };

const taskSlice = createSlice({
	name: 'taskSlice',
	initialState,
	reducers: {
		set_tasks: (state, action: PayloadAction<SetTaskActionPayload>) => {
			state.tasks = action.payload.tasks;
		},

		update_task_status: (
			state,
			action: PayloadAction<UpdateTaskStatusActionPayload>
		) => {
			return {
				...state,
				tasks: state.tasks.map((task) =>
					task.id === action.payload.taskId
						? { ...task, status: action.payload.status }
						: task
				),
			};
		},

		update_task: (state, action: PayloadAction<UpdateTaskActionPayload>) => {
			return {
				...state,
				tasks: state.tasks.map((task) =>
					task.id === action.payload.taskId
						? {
								...task,
								title: action.payload.taskData.title,
								description: action.payload.taskData.description,
								dueDate: action.payload.taskData.dueDate,
								priority: action.payload.taskData.priority,
								stage: action.payload.taskData.stage,
								assigned_to: action.payload.taskData.assigned_to,
								// eslint-disable-next-line no-mixed-spaces-and-tabs
						  }
						: task
				),
			};
		},

		delete_task: (state, action: PayloadAction<DeleteTaskActionPayload>) => {
			return {
				tasks: state.tasks.filter((task) => task.id !== action.payload.taskId),
			};
		},

		add_task: (state, action: PayloadAction<AddTaskActionPayload>) => {
			return {
				...state,
				tasks: [...state.tasks, action.payload.task],
			};
		},
	},
});

export default taskSlice.reducer;
export const taskActions = taskSlice.actions;
