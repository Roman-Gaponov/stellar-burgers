import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface FeedsState {
	orders: TOrder[];
	total: number;
	totalToday: number;
	isLoading: boolean;
	success: boolean;
	error: string | undefined;
}

type TPayload = Pick<FeedsState, 'orders' | 'total' | 'totalToday'>;

const initialState: FeedsState = {
	orders: [],
	total: 0,
	totalToday: 0,
	isLoading: false,
	success: false,
	error: '',
};

export const fetchFeeds = createAsyncThunk('feeds/getAll', async () => {
	return getFeedsApi();
});

const feedsSlice = createSlice({
	name: 'feeds',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchFeeds.pending, (state) => {
				state.isLoading = true;
				state.error = '';
				console.log('loading feeds');
			})
			.addCase(
				fetchFeeds.fulfilled,
				(state, action: PayloadAction<TPayload>) => {
					state.isLoading = false;
					state.orders = action.payload.orders;
					state.total = action.payload.total;
					state.totalToday = action.payload.totalToday;
					state.error = '';
					console.log('success');
				}
			)
			.addCase(fetchFeeds.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message;
				console.log('error');
			});
	},
	selectors: {
		isFeedsLoadingSelector: (state) => state.isLoading,
		ordersDataSelector: (state) => state.orders,
		totalOrdersSelector: (state) => state.total,
		totalTodayOrdersSelector: (state) => state.totalToday,
	},
});

export const {
	isFeedsLoadingSelector,
	ordersDataSelector,
	totalOrdersSelector,
	totalTodayOrdersSelector,
} = feedsSlice.selectors;

export default feedsSlice.reducer;
