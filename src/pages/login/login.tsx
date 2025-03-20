import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import {
	fetchLogin,
	setUserSuccess,
} from '../../services/slices/userSlice/userSlice';
import { setCookie } from '../../utils/cookie';

export const Login: FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		dispatch(fetchLogin({ email, password }))
			.unwrap()
			.then((data) => {
				try {
					localStorage.setItem('refreshToken', data.refreshToken);
					setCookie('accessToken', data.accessToken);
				} catch {
					return new Error('login error');
				}
			})
			.then(() => {
				dispatch(setUserSuccess(true));
			})
			.then(() => {
				navigate('/');
			});
	};

	return (
		<LoginUI
			errorText=''
			email={email}
			setEmail={setEmail}
			password={password}
			setPassword={setPassword}
			handleSubmit={handleSubmit}
		/>
	);
};
