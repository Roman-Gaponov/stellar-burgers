import {
	getOrdersApi,
	getUserApi,
	loginUserApi,
	logoutApi,
	orderBurgerApi,
	registerUserApi,
	updateUserApi,
} from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';

interface userState {
	user: TUser;
	orders: TOrder[];
	lastOrder: TOrder | null;
	orderRequestData: boolean;
	isLoading: boolean;
	success: boolean;
	error?: string | undefined;
}

// type TPayloadAction = Pick<FeedsState, 'orders' | 'total' | 'totalToday'>;

const initialState: userState = {
	user: {
		name: '',
		email: '',
	},
	orders: [],
	lastOrder: null,
	orderRequestData: false,
	isLoading: false,
	success: false,
};

export const fetchUser = createAsyncThunk('user/get', async () => {
	await getUserApi();
});

export const fetchLogin = createAsyncThunk('user/login', async () => {
	await loginUserApi({ email, password });
});

export const fetchRegisterUser = createAsyncThunk('user/register', async () => {
	await registerUserApi();
});

export const fetchUpdateUserData = createAsyncThunk('user/update', async () => {
	await updateUserApi();
});

export const fetchLogout = createAsyncThunk('user/logout', async () => {
	await logoutApi();
});

export const fetchUserOrders = createAsyncThunk('user/orders', async () => {
	await getOrdersApi();
});

export const fetchNewUserOrder = createAsyncThunk('user/newOrder', async () => {
	await orderBurgerApi();
});

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUser.pending, (state) => {
				state.isLoading = true;
				state.error = '';
				console.log('loading user data');
			})
			.addCase(fetchUser.fulfilled, (state, action) => {
				state.isLoading = false;
				// state = action.payload;
				state.error = '';
				console.log('success');
			})
			.addCase(fetchUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message;
				console.log('error');
			});
	},
	selectors: {},
});

export const {} = userSlice.selectors;

export default userSlice.reducer;
