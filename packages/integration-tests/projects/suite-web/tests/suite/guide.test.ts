// @group:suite
// @retry=2

describe('Test Guide', () => {
    beforeEach(() => {
        cy.task('startEmu', { wipe: true, version: Cypress.env('emuVersionT2') });
        cy.task('setupEmu');
        cy.task('startBridge');
        // eslint-disable-next-line @typescript-eslint/naming-convention

        cy.viewport(1024, 768).resetDb();
        cy.prefixedVisit('/');
        cy.passThroughInitialRun();
    });

    it('Test open / close guide panel', () => {
        // Test open
        cy.getTestElement('@guide/button-open').click();
        cy.getTestElement('@guide/panel').should('be.visible');
        cy.getTestElement('@guide/button-open').should('not.be.visible');
        // Test close
        cy.getTestElement('@guide/button-close').click();
        cy.getTestElement('@guide/panel').should('not.exist');
        cy.getTestElement('@guide/button-open').should('be.visible');

        // Test guide panel navigation
        // Test open
        cy.getTestElement('@guide/button-open').click();
        cy.getTestElement('@guide/category/privacy').click();
        cy.getTestElement('@guide/button-back').click();
        cy.getTestElement('@guide/category/suite-basics').click();
        cy.getTestElement('@guide/node/suite-basics/accounts.md').click();
        cy.getTestElement('@guide/headerBreadcrumb/categoryLink').click();
        cy.getTestElement('@guide/node/suite-basics/accounts.md').click();
        cy.getTestElement('@guide/headerBreadcrumb/previousCategoryLink').click();
        cy.getTestElement('@guide/button-close').click();
        cy.getTestElement('@guide/button-open').click();
        cy.getTestElement('@guide/category/privacy').should('be.visible');

        // Test guide feedback form
        cy.getTestElement('@guide/button-open').click();
        cy.getTestElement('@guide/button-feedback').click();
        cy.getTestElement('@guide/feedback/suggestion').click();
        cy.getTestElement('@guide/feedback/suggestion/5').click();
        cy.getTestElement('@guide/feedback/suggestion-form').type('Hello!');
    });
});
