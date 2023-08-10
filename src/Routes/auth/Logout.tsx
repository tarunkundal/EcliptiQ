import { Button } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import Routes from '..';
import useCustomToast from '../../hooks/useToastHook';
import supabase from '../../lib/api';

const Logout = () => {
	const customToast = useCustomToast();
	const history = useHistory();

	const logoutHandler = async () => {
		const { error } = await supabase.auth.signOut();

		if (error) {
			customToast({
				title: 'Error while loging out.',
				description: error.message,
				status: 'error',
			});
		} else {
			history.push(Routes.LOGIN);
			window.location.reload();
		}
	};
	return (
		<Button variant="red" onClick={logoutHandler}>
			Log Out
		</Button>
	);
};

export default Logout;
