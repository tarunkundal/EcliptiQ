import { useAppSelector } from '../../app/store';

const useFetchProgressTasks = () => {
	const tasks = useAppSelector((state) => state.tasks.tasks);

	const progressTasks = tasks.filter((task) => task.stage === 'progress');
	return { progressTasks };
};

export default useFetchProgressTasks;
