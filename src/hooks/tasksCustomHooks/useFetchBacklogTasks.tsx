import { useAppSelector } from '../../app/store';

const useFetchBacklogTasks = () => {
	const selectedTeamId = useAppSelector((state) => state.teams.selectedTeamId);
	const allTasks = useAppSelector((state: { tasks: { tasks: any; }; }) => state.tasks.tasks);

	// fetching selected team tasks
	const allTeamTasks = allTasks.filter(
		(task: { team_id: string; }) => task.team_id === selectedTeamId
	);

	const backlogTasks = allTeamTasks.filter((task: { stage: string; }) => task?.stage === 'backlog');
	return { backlogTasks };
};

export default useFetchBacklogTasks;
