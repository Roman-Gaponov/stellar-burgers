import { combineReducers, configureStore } from '@reduxjs/toolkit';

import ingredientsSliceReducer from './slices/ingredientsSlice/ingredientsSlice';
import feedsSliceReducer from './slices/feedsSlice/feedsSlice';
import burgerConstructorSliceReducer from './slices/burgerConstructorSlice/burgerConstructorSlice';
import userSliceReducer from './slices/userSlice/userSlice';

import {
	TypedUseSelectorHook,
	useDispatch as dispatchHook,
	useSelector as selectorHook,
} from 'react-redux';

// Заменить на импорт настоящего редьюсера
const rootReducer = combineReducers({
	ingredients: ingredientsSliceReducer,
	feeds: feedsSliceReducer,
	burgerConstructor: burgerConstructorSliceReducer,
	user: userSliceReducer,
});

const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
