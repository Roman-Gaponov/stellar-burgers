import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { TIngredient } from '@utils-types';

export const IngredientDetails: FC = () => {


	/** TODO: взять переменную из стора */
	const ingredientData = null;

	if (!ingredientData) {
		return <Preloader />;
	}

	return <IngredientDetailsUI ingredientData={ingredientData} />;
};
