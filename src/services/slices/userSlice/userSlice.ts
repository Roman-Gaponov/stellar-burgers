import {   
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  orderBurgerApi,
  registerUserApi,
  updateUserApi } from '@api';
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

export const fetchUser = createAsyncThunk(
  'feeds/getUser',
  async () => {
    return getUserApi();
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.error = '';
        console.log('loading feeds');
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
  selectors: {

  },
});

export const {  } =
userSlice.selectors;

export default userSlice.reducer;