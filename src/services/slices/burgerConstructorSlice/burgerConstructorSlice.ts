import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { Interface } from 'readline';

interface BurgerConstructorState {
	constructorBun: TConstructorIngredient | null;
	constructorIngredients: TConstructorIngredient[];
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
		removeIngredient: (state, action: PayloadAction<string>) => {
			state.constructorIngredients = state.constructorIngredients.filter(
				(item) => item.id !== action.payload
			);
		},
		resetConstructor: (state) => {
			state.constructorBun = null;
			state.constructorIngredients = [];
		},
	},
	selectors: {
		constructorBunSelector: (state) => state.constructorBun,
		costructorIngredientsSelector: (state) => state.constructorIngredients,
	},
});

export const { addIngredient, removeIngredient, resetConstructor } =
	burgerConstructorSlice.actions;

export const { constructorBunSelector, costructorIngredientsSelector } =
	burgerConstructorSlice.selectors;

export default burgerConstructorSlice.reducer;
