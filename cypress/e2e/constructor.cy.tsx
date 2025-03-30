const testUrl = 'http://localhost:4000';

describe('тесты сборки бургера и оформления заказа', () => {
	beforeEach(() => {
		cy.intercept('GET', 'api/ingreients', { fixture: 'ingredients.json' });
		cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
		cy.intercept('POST', 'api/orders', { fixture: 'order.json' });

		cy.viewport(1300, 800);
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
		beforeEach(() => {
			cy.visit(testUrl);
		});

		it('тест добавления булки', () => {
			cy.addBun();

			cy.get('[data-cy=top-bun-in-constructor]')
				.contains('ингредиент 1')
				.should('exist');
			cy.get('[data-cy=bottom-bun-in-constructor]')
				.contains('ингредиент 1')
				.should('exist');
		});

		it('тест добавления ингредиентов', () => {
			cy.addMainIngredient();
			cy.addSauce();

			cy.get('[data-cy=ingedients-in-constructor]')
				.contains('ингредиент 2')
				.should('exist');
			cy.get('[data-cy=ingedients-in-constructor]')
				.contains('ингредиент 4')
				.should('exist');
		});
	});

	describe('проверка функциональности модального окна', () => {
		beforeEach(() => {
			cy.visit(testUrl);
		});

		it('Открытие модального окна', () => {
			cy.get('div').contains('Детали ингредиента').should('not.exist');
			cy.get('div').contains('ингредиент 2').click();
			cy.get('div').contains('Детали ингредиента').should('exist');

			cy.get('div').contains('ингредиент 2').should('exist');
		});

		describe('Закрытие модального окна', () => {
			beforeEach(() => {
				cy.get('div').contains('ingredient').click();
				cy.get('div').contains('Детали ингредиента').should('exist');
			});

			it('Модальное окно закрывается при клике на крестик', () => {
				cy.closeModal();
				cy.get('div').contains('Детали ингредиента').should('not.exist');
			});

			it('Модальное окно остается открытым при клике внутри него', () => {
				cy.get('div').contains('Детали ингредиента').click();
				cy.get('div').contains('Детали ингредиента').should('exist');
			});

			it('Модальное окно закрывается при клике на оверлей', () => {
				cy.get('[data-cy=modal]').invoke('hide');
				cy.get('[data-cy=modal-overlay]').should('be.visible').click();
				cy.get('div').contains('Детали ингредиента').should('not.exist');
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

			cy.visit(testUrl);
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

			cy.get('[data-cy=top-bun-in-constructor]')
				.contains('ингредиент 1')
				.should('exist');
			cy.get('[data-cy=bottom-bun-in-constructor]')
				.contains('ингредиент 1')
				.should('exist');
			cy.get('[data-cy=ingedients-in-constructor]')
				.contains('ингредиент 2')
				.should('exist');
			cy.get('[data-cy=ingedients-in-constructor]')
				.contains('ингредиент 4')
				.should('exist');

			cy.get('[data-cy=order-button]').contains('Оформить заказ').click();
			cy.get('[data-cy=order-number]').contains('777').should('exist');

			cy.closeModal();
			cy.get('div').contains('777').should('not.exist');

			cy.get('[data-cy=burger-constructor]')
				.contains('Выберите булки')
				.should('exist');
			cy.get('[data-cy=burger-constructor]')
				.contains('Выберите начинку')
				.should('exist');
		});
	});
});
