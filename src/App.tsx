import { Route, Switch } from 'react-router-dom';

import Routes from './Routes';
import Auth from './Routes/auth/Auth';
import ProtectedRoutes from './Routes/auth/ProtectedRoutes';
import HomeDashboard from './Screens/dashboard/Dashboard';
import SignUp from './Screens/SignUp';
import Login from './Screens/Login';

const App = () => {
	return (
		<>
			<Auth>
				<Switch>
					<Route exact path={Routes.LOGIN} component={Login} />
					<Route exact path={Routes.REGISTER} component={SignUp} />

					<ProtectedRoutes>
						<Route exact path={Routes.DASHBOARD} component={HomeDashboard} />
					</ProtectedRoutes>
				</Switch>
			</Auth>
		</>
	);
};

export default App;

// project Url = https://kiiokeyfnlqufvpdyhap.supabase.co
// api key = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpaW9rZXlmbmxxdWZ2cGR5aGFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE1MTA5NjksImV4cCI6MjAwNzA4Njk2OX0.F_fKragWknFseKMV-ibOwOs2D1kqpqqmrlQ64wIIQC8
