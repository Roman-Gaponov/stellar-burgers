import { getFeedsApi, getOrderByNumberApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface FeedsState {
	orders: TOrder[];
	orderByNumber: TOrderByNumberPayload | null;
	total: number;
	totalToday: number;
	isLoading: boolean;
	success: boolean;
	error: string | undefined;
}

type TFeedsPayload = Pick<FeedsState, 'orders' | 'total' | 'totalToday'>;

type TOrderByNumberPayload = Pick<FeedsState, 'orders'> & { success: boolean };

const initialState: FeedsState = {
	orders: [],
	orderByNumber: null,
	total: 0,
	totalToday: 0,
	isLoading: false,
	success: false,
	error: '',
};

export const fetchFeeds = createAsyncThunk('feeds/getAll', async () => {
	return await getFeedsApi();
});

export const fetchOrderByNumber = createAsyncThunk(
	'feeds/getOrderByNumber',
	async (number: number) => {
		return await getOrderByNumberApi(number);
	}
);

const feedsSlice = createSlice({
	name: 'feeds',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// обработка fetchFeeds
			.addCase(fetchFeeds.pending, (state) => {
				state.isLoading = true;
				state.error = '';
				console.log('loading feeds');
			})
			.addCase(
				fetchFeeds.fulfilled,
				(state, action: PayloadAction<TFeedsPayload>) => {
					state.isLoading = false;
					state.orders = action.payload.orders;
					state.total = action.payload.total;
					state.totalToday = action.payload.totalToday;
					state.error = '';
					console.log('success loading feeds');
				}
			)
			.addCase(fetchFeeds.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message;
				console.log('error loading feeds');
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
		isFeedsLoadingSelector: (state) => state.isLoading,
		ordersDataSelector: (state) => state.orders,
		totalOrdersSelector: (state) => state.total,
		totalTodayOrdersSelector: (state) => state.totalToday,
		orderByNumberSelector: (state) => state.orderByNumber?.orders[0],
		isSuccessOrderByNumberSelector: (state) => state.orderByNumber?.success,
	},
});

export const {
	isFeedsLoadingSelector,
	ordersDataSelector,
	totalOrdersSelector,
	totalTodayOrdersSelector,
	orderByNumberSelector,
	isSuccessOrderByNumberSelector,
} = feedsSlice.selectors;

export default feedsSlice.reducer;
