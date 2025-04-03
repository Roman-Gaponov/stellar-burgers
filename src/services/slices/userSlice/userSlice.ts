import {
	getUserApi,
	loginUserApi,
	logoutApi,
	registerUserApi,
	updateUserApi,
} from '../../../utils/burger-api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

interface userState {
	user: TUser;
	isLoading: boolean;
	success: boolean;
	error?: string | undefined;
}

type TUserPayload = Pick<userState, 'user' | 'success'>;

export const initialState: userState = {
	user: {
		name: '',
		email: '',
	},
	isLoading: false,
	success: false,
};

export const fetchUser = createAsyncThunk('user/get', getUserApi);

export const fetchRegisterUser = createAsyncThunk(
	'user/register',
	registerUserApi
);

export const fetchLogin = createAsyncThunk('user/login', loginUserApi);

export const fetchUpdateUserData = createAsyncThunk(
	'user/update',
	updateUserApi
);

export const fetchLogout = createAsyncThunk('user/logout', logoutApi);

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserSuccess: (state, action: PayloadAction<boolean>) => {
			state.success = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			// обработка санка fetchUser
			.addCase(fetchUser.pending, (state) => {
				state.isLoading = true;
				state.success = false;
				state.error = '';
				console.log('loading user data');
			})
			.addCase(
				fetchUser.fulfilled,
				(state, action: PayloadAction<TUserPayload>) => {
					state.isLoading = false;
					state.success = action.payload.success;
					state.user = action.payload.user;
					state.error = '';
					console.log('success loading user data');
				}
			)
			.addCase(fetchUser.rejected, (state, action) => {
				state.isLoading = false;
				state.success = false;
				state.error = action.error.message;
				console.log('error loading user data');
			})
			// обработка санка fetchRegisterUser
			.addCase(fetchRegisterUser.pending, (state) => {
				state.isLoading = true;
				state.success = false;
				state.error = '';
				console.log('loading register user');
			})
			.addCase(
				fetchRegisterUser.fulfilled,
				(state, action: PayloadAction<TUserPayload>) => {
					state.isLoading = false;
					state.success = action.payload.success;
					state.user = action.payload.user;
					state.error = '';
					console.log('success register user');
				}
			)
			.addCase(fetchRegisterUser.rejected, (state, action) => {
				state.isLoading = false;
				state.success = false;
				state.error = action.error.message;
				console.log('error register user');
			})
			// обработка санка fetchLogin
			.addCase(fetchLogin.pending, (state) => {
				state.isLoading = true;
				state.success = false;
				state.error = '';
				console.log('loading login user');
			})
			.addCase(
				fetchLogin.fulfilled,
				(state, action: PayloadAction<TUserPayload>) => {
					state.isLoading = false;
					state.success = action.payload.success;
					state.user = action.payload.user;
					state.error = '';
					console.log('success login user');
				}
			)
			.addCase(fetchLogin.rejected, (state, action) => {
				state.isLoading = false;
				state.success = false;
				state.error = action.error.message;
				console.log('error login user');
			})
			// обработка санка fetchUpdateUserData
			.addCase(fetchUpdateUserData.pending, (state) => {
				state.isLoading = true;
				state.success = false;
				state.error = '';
				console.log('loading update user data');
			})
			.addCase(
				fetchUpdateUserData.fulfilled,
				(state, action: PayloadAction<TUserPayload>) => {
					state.isLoading = false;
					state.success = action.payload.success;
					state.user = action.payload.user;
					state.error = '';
					console.log('success update user data');
				}
			)
			.addCase(fetchUpdateUserData.rejected, (state, action) => {
				state.isLoading = false;
				state.success = false;
				state.error = action.error.message;
				console.log('error update user data');
			})
			// обработка санка fetchLogout
			.addCase(fetchLogout.pending, (state) => {
				state.isLoading = true;
				state.success = false;
				state.error = '';
				console.log('processing logout user');
			})
			.addCase(fetchLogout.fulfilled, (state) => {
				state.isLoading = false;
				state.success = false;
				state.user = initialState.user;
				state.error = '';
				console.log('success logout user');
			})
			.addCase(fetchLogout.rejected, (state, action) => {
				state.isLoading = false;
				state.success = false;
				state.error = action.error.message;
				console.log('error logout user');
			});
	},
	selectors: {
		isUserDataLoadingSelector: (state) => state.isLoading,
		isUserAuthSelector: (state) => state.success,
		userDataSelector: (state) => state.user,
	},
});

export const { setUserSuccess } = userSlice.actions;

export const {
	isUserDataLoadingSelector,
	isUserAuthSelector,
	userDataSelector,
} = userSlice.selectors;

export default userSlice.reducer;
