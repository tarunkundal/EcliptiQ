import { useAppSelector } from '../../app/store';

const useFetchProgressTasks = () => {
	const selectedTeamId = useAppSelector((state) => state.teams.selectedTeamId);
	const allTasks = useAppSelector((state) => state.tasks.tasks);

	// fetching selected team tasks
	const allTeamTasks = allTasks.filter(
		(task) => task.team_id === selectedTeamId
	);

	const todoTasks = allTeamTasks.filter((task) => task.stage === 'progress');
	return { todoTasks };
};

export default useFetchProgressTasks;
