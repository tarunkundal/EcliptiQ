import { useAppSelector } from '../../app/store';

const useFetchBacklogTasks = () => {
	const selectedTeamId = useAppSelector((state) => state.teams.selectedTeamId);
	const allTasks = useAppSelector((state) => state.tasks.tasks);

	// fetching selected team tasks
	const allTeamTasks = allTasks.filter(
		(task) => task.team_id === selectedTeamId
	);

	const backlogTasks = allTeamTasks.filter((task) => task.stage === 'backlog');
	return { backlogTasks };
};

export default useFetchBacklogTasks;
