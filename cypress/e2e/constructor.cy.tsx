declare namespace Cypress {
	interface Chainable {
		addBun(): void;
		addMainIngredient(): void;
		addSauce(): void;
		closeModal(): void;
	}
}

const testUrl = 'http://localhost:4000';

const modalTitle = 'Детали ингредиента';

const orderNumber = '777';

const bunIngredientName = 'ингредиент 1';
const mainIngredientName = 'ингредиент 2';
const sauceIngredientName = 'ингредиент 4';

const topBunSelector = '[data-cy=top-bun-in-constructor]';
const bottomBunSelector = '[data-cy=bottom-bun-in-constructor]';
const burgerIngredientsSelector = '[data-cy=ingedients-in-constructor]';
const burgerConstrucorSelector = '[data-cy=burger-constructor]';

describe('тесты сборки бургера и оформления заказа', () => {
	beforeEach(() => {
		cy.viewport(1300, 800);

		cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
			'getIngredientsResponse'
		);
		cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as(
			'getUserResponse'
		);
		cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as(
			'getOrderResponse'
		);

		cy.visit(testUrl);

		cy.wait('@getIngredientsResponse')
			.its('response.statusCode')
			.should('eq', 200);

		cy.wait('@getUserResponse').its('response.statusCode').should('eq', 200);
	});

	Cypress.Commands.add('addBun', () => {
		cy.get('[data-cy=ingredients-buns]').contains('Добавить').click();
	});

	Cypress.Commands.add('addMainIngredient', () => {
		cy.get('[data-cy=ingredients-mains]').contains('Добавить').click();
	});

	Cypress.Commands.add('addSauce', () => {
		cy.get('[data-cy=ingredients-sauces]').contains('Добавить').click();
	});

	Cypress.Commands.add('closeModal', () => {
		cy.get('[data-cy=close-modal]').click();
	});

	describe('проверка добавления ингредиента и булки в бургер', () => {
		it('тест добавления булки', () => {
			cy.addBun();

			cy.get(topBunSelector).contains(bunIngredientName).should('exist');
			cy.get(bottomBunSelector).contains(bunIngredientName).should('exist');
		});

		it('тест добавления ингредиентов', () => {
			cy.addMainIngredient();
			cy.addSauce();

			cy.get(burgerIngredientsSelector)
				.contains(mainIngredientName)
				.should('exist');
			cy.get(burgerIngredientsSelector)
				.contains(sauceIngredientName)
				.should('exist');
		});
	});

	describe('проверка функциональности модального окна', () => {
		it('Открытие модального окна', () => {
			cy.get('div').contains(modalTitle).should('not.exist');
			cy.get('div').contains(mainIngredientName).click();
			cy.get('div').contains(modalTitle).should('exist');

			cy.get('div').contains(mainIngredientName).should('exist');
		});

		describe('Закрытие модального окна', () => {
			beforeEach(() => {
				cy.get('div').contains(mainIngredientName).click();
				cy.get('div').contains(modalTitle).should('exist');
			});

			it('Модальное окно закрывается при клике на крестик', () => {
				cy.closeModal();
				cy.get('div').contains(modalTitle).should('not.exist');
			});

			it('Модальное окно остается открытым при клике внутри него', () => {
				cy.get('div').contains(modalTitle).click();
				cy.get('div').contains(modalTitle).should('exist');
			});

			it('Модальное окно закрывается при клике на оверлей', () => {
				cy.get('[data-cy=modal]').invoke('hide');
				cy.get('[data-cy=modal-overlay]').should('be.visible').click();
				cy.get('div').contains(modalTitle).should('not.exist');
			});
		});
	});

	describe('проверка функциональности логина пользователя и оформления заказа', () => {
		beforeEach(() => {
			window.localStorage.setItem(
				'refreshToken',
				JSON.stringify('mockRefreshToken')
			);
			cy.setCookie('accessToken', 'mockAccessToken');
		});

		afterEach(() => {
			window.localStorage.clear();
			cy.clearCookies();
		});

		it('тестовые данные пользователя', () => {
			cy.get('[data-cy=user]').contains('User');
		});

		it('оформление заказа', () => {
			cy.addBun();
			cy.addMainIngredient();
			cy.addSauce();

			cy.get(topBunSelector).contains(bunIngredientName).should('exist');
			cy.get(bottomBunSelector).contains(bunIngredientName).should('exist');
			cy.get(burgerIngredientsSelector)
				.contains(mainIngredientName)
				.should('exist');
			cy.get(burgerIngredientsSelector)
				.contains(sauceIngredientName)
				.should('exist');

			cy.get('[data-cy=order-button]').contains('Оформить заказ').click();
			cy.get('[data-cy=order-number]').contains(orderNumber).should('exist');

			cy.closeModal();
			cy.get('div').contains(orderNumber).should('not.exist');

			cy.get(burgerConstrucorSelector)
				.contains('Выберите булки')
				.should('exist');
			cy.get(burgerConstrucorSelector)
				.contains('Выберите начинку')
				.should('exist');
		});
	});
});
