import { useAppSelector } from '../../app/store';

const useFetchCompletedTasks = () => {
	const tasks = useAppSelector((state) => state.tasks.tasks);

	const completedTasks = tasks.filter((task) => task.stage === 'done');
	return { completedTasks };
};

export default useFetchCompletedTasks;
