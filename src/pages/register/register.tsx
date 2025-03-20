import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch } from 'src/services/store';
import { useNavigate } from 'react-router-dom';
import { fetchRegisterUser } from 'src/services/slices/userSlice/userSlice';

export const Register: FC = () => {
	const [name, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		dispatch(fetchRegisterUser({ name, email, password })).then(() => {
      navigate('/login');
    });
	};

	return (
		<RegisterUI
			errorText=''
			email={email}
			userName={name}
			password={password}
			setEmail={setEmail}
			setPassword={setPassword}
			setUserName={setUserName}
			handleSubmit={handleSubmit}
		/>
	);
};
