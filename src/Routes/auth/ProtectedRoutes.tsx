import React, { ReactNode } from 'react';
import { Redirect } from 'react-router-dom';

import { useAppSelector } from '../../app/store';
import Routes from '..';

interface MyComponentProps {
	children: ReactNode;
}
const ProtectedRoutes: React.FC<MyComponentProps> = ({ children }) => {
	const userId = useAppSelector((state) => state.user.user?.id);

	if (userId === undefined) {
		return <Redirect to={Routes.LOGIN} />;
	}

	return <>{children}</>;
};

export default ProtectedRoutes;
