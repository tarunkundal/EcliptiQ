import { Route, Switch } from 'react-router-dom';

import Routes from './Routes';
import Auth from './Routes/auth/Auth';
import ProtectedRoutes from './Routes/auth/ProtectedRoutes';
import HomeDashboard from './Screens/dashboard/Dashboard';
import Login from './Screens/Login';
import SignUp from './Screens/SignUp';

const App = () => {
	return (
		<>
			<Auth>
				<Switch>
					<Route exact path={Routes.LOGIN} component={Login} />
					<Route exact path={Routes.REGISTER} component={SignUp} />

					<ProtectedRoutes>
						<Route path={Routes.DASHBOARD} component={HomeDashboard} />
					</ProtectedRoutes>
				</Switch>
			</Auth>
		</>
	);
};

export default App;
