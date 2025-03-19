import {
	getOrdersApi,
	getUserApi,
	loginUserApi,
	logoutApi,
	orderBurgerApi,
	registerUserApi,
	updateUserApi,
	TLoginData,
	TRegisterData,
} from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';

interface userState {
	user: TUser;
	orders: TOrder[];
	lastOrder: TOrder | null;
	orderRequestStatus: boolean;
	isLoading: boolean;
	success: boolean;
	error?: string | undefined;
}

type TUserPayload = Pick<userState, 'user' | 'success'>;

type TOrderBurgerPayload = {
	name: string;
	order: TOrder;
};

const initialState: userState = {
	user: {
		name: '',
		email: '',
	},
	orders: [],
	lastOrder: null,
	orderRequestStatus: false,
	isLoading: false,
	success: false,
};

export const fetchUser = createAsyncThunk('user/get', async () => {
	return await getUserApi();
});

export const fetchRegisterUser = createAsyncThunk(
	'user/register',
	async (data: TRegisterData) => {
		return await registerUserApi(data);
	}
);

export const fetchLogin = createAsyncThunk(
	'user/login',
	async (data: TLoginData) => {
		return await loginUserApi(data);
	}
);

export const fetchUpdateUserData = createAsyncThunk(
	'user/update',
	async (user: Partial<TRegisterData>) => {
		return await updateUserApi(user);
	}
);

export const fetchLogout = createAsyncThunk('user/logout', async () => {
	return await logoutApi();
});

export const fetchUserOrders = createAsyncThunk('user/orders', async () => {
	return await getOrdersApi();
});

export const fetchOrderBurger = createAsyncThunk(
	'user/newOrder',
	async (data: string[]) => {
		return await orderBurgerApi(data);
	}
);

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
    setUseSuccess: (state, action: PayloadAction<boolean>) => {
      state.success = action.payload;
    },
    setLastOrder: (state, action: PayloadAction<TOrder>) => {
      state.lastOrder = action.payload;
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
			})
			// обработка санка fetchUserOrders
			.addCase(fetchUserOrders.pending, (state) => {
				state.isLoading = true;
				state.error = '';
				console.log('loading user orders');
			})
			.addCase(
				fetchUserOrders.fulfilled,
				(state, action: PayloadAction<TOrder[]>) => {
					state.isLoading = false;
					state.orders = action.payload;
					state.error = '';
					console.log('success loading user orders');
				}
			)
			.addCase(fetchUserOrders.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message;
				console.log('error loading user orders');
			})
			// обработка санка fetchOrderBurger
			.addCase(fetchOrderBurger.pending, (state) => {
				state.isLoading = true;
				state.orderRequestStatus = true;
				state.error = '';
				console.log('processing order burger');
			})
			.addCase(
				fetchOrderBurger.fulfilled,
				(state, action: PayloadAction<TOrderBurgerPayload>) => {
					state.isLoading = false;
					state.orderRequestStatus = false;
					state.orders.push(action.payload.order);
					state.lastOrder = action.payload.order;
					state.error = '';
					console.log('success order burger');
				}
			)
			.addCase(fetchOrderBurger.rejected, (state, action) => {
				state.isLoading = false;
				state.orderRequestStatus = false;
				state.error = action.error.message;
				console.log('error order burger');
			});
	},
	selectors: {
		isUserDataLoading: (state) => state.isLoading,
		userDataSelector: (state) => state.user,
		userOrdersSelector: (state) => state.orders,
		userAuthStatusSelector: (state) => state.success,
		orderRequestStatusSelector: (state) => state.orderRequestStatus,
		lastOrderSelector: (state) => state.lastOrder,
	},
});

export const {
	isUserDataLoading,
	userDataSelector,
	userOrdersSelector,
	userAuthStatusSelector,
	orderRequestStatusSelector,
	lastOrderSelector,
} = userSlice.selectors;

export default userSlice.reducer;
