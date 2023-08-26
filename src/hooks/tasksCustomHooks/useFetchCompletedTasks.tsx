import { useAppSelector } from '../../app/store';

const useFetchCompletedTasks = () => {
	const selectedTeamId = useAppSelector((state) => state.teams.selectedTeamId);
	const allTasks = useAppSelector((state) => state.tasks.tasks);

	// fetching selected team tasks
	const allTeamTasks = allTasks.filter(
		(task) => task.team_id === selectedTeamId
	);

	const completedTasks = allTeamTasks.filter((task) => task.stage === 'done');
	return { completedTasks };
};

export default useFetchCompletedTasks;
