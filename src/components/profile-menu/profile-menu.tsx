import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store/store';
import { fetchLogout } from '../../services/slices/userSlice/userSlice';
import { deleteCookie } from '../../utils/cookie';

export const ProfileMenu: FC = () => {
	const { pathname } = useLocation();
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(fetchLogout())
			.unwrap()
			.then(() => {
				deleteCookie('accessToken');
				localStorage.removeItem('refreshToken');
			});
	};

	return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
