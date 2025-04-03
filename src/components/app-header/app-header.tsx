import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store/store';
import { userDataSelector } from '../../services/slices/userSlice/userSlice';

export const AppHeader: FC = () => {
	const { name } = useSelector(userDataSelector);

	return <AppHeaderUI userName={name} />;
};
