/* global cy:true */

describe('Bot responses', function() {
    beforeEach(function() {
        cy.deleteProject('bf');
        cy.createProject('bf', 'My Project', 'en');
        cy.login();
    });
    afterEach(function() {
        cy.deleteProject('bf');
        cy.logout();
    });
    it('should create a quick reply response using the response editor', function() {
        cy.visit('/project/bf/dialogue/templates');
        cy.dataCy('create-response').click();
        cy.dataCy('add-quickreply-response').click();
        cy.dataCy('response-name-input').click().find('input').type('test_A');
        cy.dataCy('bot-response-input').click().find('textarea').type('response text');

        cy.dataCy('button_title').click({ force: true });
        cy.dataCy('button_title').click({ force: true });
        cy.dataCy('enter-button-title').find('input').type('button A');
        cy.dataCy('intent-label').should('exist').click();
        cy.dataCy('intent-dropdown').find('input').type('option_A{enter}');
        cy.dataCy('save-button').click();
        cy.get('.dimmer').click({ position: 'topLeft' }); // close the response editor

        cy.dataCy('edit-response-0').click();
        cy.dataCy('bot-response-input').contains('response text').should('exist');
        cy.dataCy('button_A').should('exist');
    });
    it('should edit a quick reply response using the response editor', function() {
        cy.visit('/project/bf/dialogue/templates');
        cy.dataCy('create-response').click();
        cy.dataCy('add-quickreply-response').click();
        cy.dataCy('response-name-input').click().find('input').type('test_A');
        cy.dataCy('bot-response-input').click().find('textarea').type('response text');

        cy.dataCy('button_title').click({ force: true });
        cy.dataCy('button_title').click({ force: true });
        cy.dataCy('enter-button-title').find('input').type('button A');
        cy.dataCy('intent-label').should('exist').click();
        cy.dataCy('intent-dropdown').find('input').type('option_A{enter}');
        cy.dataCy('save-button').click();
        cy.get('.dimmer').click({ position: 'topLeft' }); // close the response editor

        cy.dataCy('edit-response-0').click();
        cy.dataCy('bot-response-input').click().find('textarea').clear()
            .type('updated text')
            .blur();
        cy.wait(500);

        cy.dataCy('button_A').first().click({ force: true });
        cy.dataCy('enter-button-title').find('input').clear().type('button B');
        cy.dataCy('intent-label').should('exist').click();
        cy.dataCy('intent-dropdown').find('input').type('option_B{enter}');
        cy.dataCy('save-button').click();
        cy.get('.dimmer').click({ position: 'topLeft' }); // close the response editor

        cy.dataCy('edit-response-0').click();
        cy.dataCy('bot-response-input').contains('updated text').should('exist');
        cy.dataCy('button_B').should('exist');
    });
    it('should create quick reply variations', function() {
        cy.visit('/project/bf/dialogue/templates');
        cy.dataCy('create-response').click();
        cy.dataCy('add-quickreply-response').click();
        cy.dataCy('response-name-input').click().find('input').type('test_A');

        cy.dataCy('bot-response-input').click().find('textarea').type('response text deleted');
        cy.dataCy('button_title').click({ force: true });
        cy.dataCy('button_title').click({ force: true });
        cy.dataCy('enter-button-title').find('input').type('button deleted');
        cy.dataCy('intent-label').should('exist').click();
        cy.dataCy('intent-dropdown').find('input').type('payload{enter}');
        cy.dataCy('save-button').click();

        cy.dataCy('icon-trash').click();

        cy.dataCy('bot-response-input').contains('response text deleted').should('not.exist');
        cy.dataCy('button_deleted').should('not.exist');

        cy.dataCy('bot-response-input').click().find('textarea').type('response text A');
        cy.dataCy('button_title').click({ force: true });
        cy.dataCy('button_title').click({ force: true });
        cy.dataCy('enter-button-title').find('input').type('button A');
        cy.dataCy('intent-label').should('exist').click();
        cy.dataCy('intent-dropdown').find('input').type('payload{enter}');
        cy.dataCy('save-button').click();

        cy.dataCy('add-variation').click();

        cy.dataCy('bot-response-input').last().click().find('textarea')
            .type('response text B');
        cy.dataCy('button_title').last().click({ force: true });
        cy.dataCy('button_title').last().click({ force: true });
        cy.dataCy('enter-button-title').find('input').type('button B');
        cy.dataCy('intent-label').should('exist').click();
        cy.dataCy('intent-dropdown').find('input').type('payload{enter}');
        cy.dataCy('save-button').click();
        cy.get('.dimmer').click({ position: 'topLeft' }); // close the response editor
        cy.get('.dimmer').should('not.exist');

        cy.dataCy('edit-response-0').click();
        cy.dataCy('bot-response-input').contains('response text A').should('exist');
        cy.dataCy('button_B').should('exist');
        cy.dataCy('bot-response-input').contains('response text B').should('exist');
        cy.dataCy('button_A').should('exist');
    });
});
