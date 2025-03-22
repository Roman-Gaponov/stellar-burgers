import { getOrdersApi, orderBurgerApi, getOrderByNumberApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface OrdersState {
	orders: TOrder[];
	lastOrder: TOrder | null;
	orderRequestStatus: boolean;
	orderByNumber: TOrderByNumberPayload | null;
	total: number;
	totalToday: number;
	isLoading: boolean;
	success: boolean;
	error?: string | undefined;
}

type TOrderBurgerPayload = {
	name: string;
	order: TOrder;
};

type TOrderByNumberPayload = Pick<OrdersState, 'orders'> & { success: boolean };

const initialState: OrdersState = {
	orders: [],
	lastOrder: null,
	orderByNumber: null,
	total: 0,
	totalToday: 0,
	orderRequestStatus: false,
	isLoading: false,
	success: false,
};

export const fetchOrders = createAsyncThunk('orders/getAll', getOrdersApi);

export const fetchOrderBurger = createAsyncThunk(
	'orders/newOrder',
	orderBurgerApi
);

export const fetchOrderByNumber = createAsyncThunk(
	'orders/getOrderByNumber',
	getOrderByNumberApi
);

const ordersSlice = createSlice({
	name: 'orders',
	initialState,
	reducers: {
		setLastOrder: (state, action: PayloadAction<TOrder | null>) => {
			state.lastOrder = action.payload;
		},
		resetOrder: (state) => {
			state.lastOrder = null;
		},
	},
	extraReducers: (builder) => {
		builder
			// обработка санка fetchOrders
			.addCase(fetchOrders.pending, (state) => {
				state.isLoading = true;
				state.error = '';
				console.log('loading user orders');
			})
			.addCase(
				fetchOrders.fulfilled,
				(state, action: PayloadAction<TOrder[]>) => {
					state.isLoading = false;
					state.orders = action.payload;
					state.error = '';
					console.log('success loading user orders');
				}
			)
			.addCase(fetchOrders.rejected, (state, action) => {
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
			})
			// обработка fetchOrderByNumber
			.addCase(fetchOrderByNumber.pending, (state) => {
				state.isLoading = true;
				state.error = '';
				console.log('loading order by number');
			})
			.addCase(
				fetchOrderByNumber.fulfilled,
				(state, action: PayloadAction<TOrderByNumberPayload>) => {
					state.isLoading = false;
					state.orderByNumber = action.payload;
					state.error = '';
					console.log('success loading order by number');
				}
			)
			.addCase(fetchOrderByNumber.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message;
				console.log('error loading order by number');
			});
	},
	selectors: {
		isOrdersLoadingSelector: (state) => state.isLoading,
		orderRequestStatusSelector: (state) => state.orderRequestStatus,
		ordersSelector: (state) => state.orders,
		lastOrderSelector: (state) => state.lastOrder,
		totalOrdersSelector: (state) => state.total,
		totalTodayOrdersSelector: (state) => state.totalToday,
		orderByNumberSelector: (state) => state.orderByNumber?.orders[0],
		isSuccessOrderByNumberSelector: (state) => state.orderByNumber?.success,
	},
});

export const { setLastOrder, resetOrder } = ordersSlice.actions;

export const {
	isOrdersLoadingSelector,
	orderRequestStatusSelector,
	ordersSelector,
	lastOrderSelector,
	totalOrdersSelector,
	totalTodayOrdersSelector,
	orderByNumberSelector,
	isSuccessOrderByNumberSelector,
} = ordersSlice.selectors;

export default ordersSlice.reducer;
