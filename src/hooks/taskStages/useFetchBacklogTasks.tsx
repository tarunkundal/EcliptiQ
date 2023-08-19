import { useAppSelector } from '../../app/store';

const useFetchBacklogTasks = () => {
	const tasks = useAppSelector((state) => state.tasks.tasks);

	const backlogTasks = tasks.filter((task) => task.stage === 'backlog');
	return { backlogTasks };
};

export default useFetchBacklogTasks;
