import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

interface IngredientsState {
	ingredients: TIngredient[];
	isLoading: boolean;
	error: string | undefined;
}

const initialState: IngredientsState = {
	ingredients: [],
	isLoading: false,
	error: '',
};

export const fetchIngredients = createAsyncThunk(
	'ingredients/getAll',
	async () => {
		return getIngredientsApi();
	}
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
				console.log('loading');
			})
			.addCase(fetchIngredients.fulfilled, (state, action: PayloadAction<TIngredient[]>) => {
				state.isLoading = false;
				state.ingredients = action.payload;
				state.error = '';
				console.log('success');
			})
			.addCase(fetchIngredients.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message;
				console.log('error');
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
