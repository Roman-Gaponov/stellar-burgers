import { getFeedsApi, getOrderByNumberApi } from '../../../utils/burger-api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';

interface FeedState {
	feed: TOrdersData;
	isLoading: boolean;
	success: boolean;
	error: string | undefined;
}

type TFeedPayload = TOrdersData & { success: boolean };

const initialState: FeedState = {
	feed: {
		orders: [],
		total: 0,
		totalToday: 0,
	},
	isLoading: false,
	success: false,
	error: '',
};

export const fetchFeed = createAsyncThunk('feed/getAll', getFeedsApi);

const feedSlice = createSlice({
	name: 'feed',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// обработка fetchFeed
			.addCase(fetchFeed.pending, (state) => {
				state.isLoading = true;
				state.error = '';
				console.log('loading feed');
			})
			.addCase(
				fetchFeed.fulfilled,
				(state, action: PayloadAction<TFeedPayload>) => {
					state.isLoading = false;
					state.feed.orders = action.payload.orders;
					state.feed.total = action.payload.total;
					state.feed.totalToday = action.payload.totalToday;
					state.error = '';
					console.log('success loading feed');
				}
			)
			.addCase(fetchFeed.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message;
				console.log('error loading feed');
			});
	},
	selectors: {
		isFeedLoadingSelector: (state) => state.isLoading,
		feedSelector: (state) => state.feed,
		feedOrdersSelector: (state) => state.feed.orders,
	},
});

export const { isFeedLoadingSelector, feedSelector, feedOrdersSelector } =
	feedSlice.selectors;

export default feedSlice.reducer;
