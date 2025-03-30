import { getIngredientsApi } from '../../../utils/burger-api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

interface IngredientsState {
	ingredients: TIngredient[];
	isLoading: boolean;
	success: boolean;
	error: string | undefined;
}

export const initialState: IngredientsState = {
	ingredients: [],
	isLoading: false,
	success: false,
	error: '',
};

export const fetchIngredients = createAsyncThunk(
	'ingredients/getAll',
	getIngredientsApi
);

const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchIngredients.pending, (state) => {
				state.isLoading = true;
				state.error = '';
				console.log('loading ingredients');
			})
			.addCase(
				fetchIngredients.fulfilled,
				(state, action: PayloadAction<TIngredient[]>) => {
					state.isLoading = false;
					state.success = true;
					state.ingredients = action.payload;
					state.error = '';
					console.log('success loading ingredients');
				}
			)
			.addCase(fetchIngredients.rejected, (state, action) => {
				state.isLoading = false;
				state.success = false;
				state.error = action.error.message;
				console.log('error loading ingredients');
			});
	},
	selectors: {
		ingredientsDataSelector: (state) => state.ingredients,
		isIngredientsLoadingSelector: (state) => state.isLoading,
	},
});

export const { ingredientsDataSelector, isIngredientsLoadingSelector } =
	ingredientsSlice.selectors;

export default ingredientsSlice.reducer;
