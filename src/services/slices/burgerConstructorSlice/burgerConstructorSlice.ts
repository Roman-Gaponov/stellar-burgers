import {
	createSelector,
	createSlice,
	isAction,
	nanoid,
	PayloadAction,
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { Interface } from 'readline';

interface BurgerConstructorState {
	constructorBun: TConstructorIngredient | null;
	constructorIngredients: TIngredient[];
}

const initialState: BurgerConstructorState = {
	constructorBun: null,
	constructorIngredients: [],
};

const burgerConstructorSlice = createSlice({
	name: 'burgerConstructor',
	initialState,
	reducers: {
		addIngredient: {
			prepare: (item: TIngredient) => {
				const id = nanoid();
				return { payload: { id, ...item } };
			},
			reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
				if (action.payload.type === 'bun') {
					state.constructorBun = action.payload;
				} else {
					state.constructorIngredients.push(action.payload);
				}
			},
		},
	},
	selectors: {
		constructorBunSelector: (state) => state.constructorBun,
		costructorIngredientsSelector: (state) => state.constructorIngredients,
	},
});

export const { constructorBunSelector, costructorIngredientsSelector } =
	burgerConstructorSlice.selectors;

export default burgerConstructorSlice.reducer;
