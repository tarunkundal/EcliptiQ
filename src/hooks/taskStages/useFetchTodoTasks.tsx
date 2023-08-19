import { useAppSelector } from '../../app/store';

const useFetchTodoTasks = () => {
	const tasks = useAppSelector((state) => state.tasks.tasks);

	const todoTasks = tasks.filter((task) => task.stage === 'todo');
	return { todoTasks };
};

export default useFetchTodoTasks;
