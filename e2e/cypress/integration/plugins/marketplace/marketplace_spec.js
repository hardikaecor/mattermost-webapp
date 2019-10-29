// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

// ***************************************************************
// - [#] indicates a test step (e.g. 1. Go to a page)
// - [*] indicates an assertion (e.g. * Check the title)
// - Use element ID when selecting an element. Create one if none.
// ***************************************************************

describe('Plugin Marketplace', () => {
    beforeEach(() => {
        // # Configure marketplace as enabled
        const newSettings = {
            PluginSettings: {
                Enable: true,
                EnableMarketplace: true,
                MarketplaceUrl: 'https://api.integrations.mattermost.com',
            },
        };
        cy.apiUpdateConfig(newSettings);

        // # Login as sysadmin
        cy.apiLogin('sysadmin');
        cy.visit('/');

        // # Click hamburger main menu
        cy.get('#sidebarHeaderDropdownButton').click();

        // * Dropdown menu should be visible
        cy.get('#sidebarDropdownMenu').should('be.visible');

        // * Marketplace button should be visible
        cy.get('#marketplaceModal').should('be.visible');

        // # Open up marketplace modal
        cy.get('#marketplaceModal').click();
    });

    it('should render', () => {
        // * marketplace should be visible
        cy.get('#modal_marketplace').should('be.visible');

        // * error should not be visible
        cy.get('#error_bar').should('not.be.visible');

        // * search should be visible
        cy.get('#searchMarketplaceTextbox').should('be.visible');

        // * tabs should be visible
        cy.get('#marketplaceTabs').should('be.visible');

        // * all plugins tab button should be visible
        cy.get('#marketplaceTabs-tab-allPlugins').should('be.visible');

        // * installed plugins tabs button should be visible
        cy.get('#marketplaceTabs-tab-installed').should('be.visible');

        // * all plugins tab should be active
        cy.get('#marketplaceTabs-pane-allPlugins').should('be.visible');

        // # click on installed plugins tab
        cy.get('#marketplaceTabs-tab-installed').click();

        // * installed plugins tab should be active
        cy.get('#marketplaceTabs-pane-installed').should('be.visible');

        // # close marketplace modal
        cy.get('#closeIcon').click();

        // * marketplace should not be visible
        cy.get('#modal_marketplace').should('not.be.visible');
    });

    it('should prompt to update', () => {
        // # Login as sysadmin
        cy.installPluginFromUrl('https://github.com/mattermost/mattermost-plugin-github/releases/download/v0.7.0/github-0.7.0.tar.gz', true);

        // * marketplace should be visible
        cy.get('#modal_marketplace').should('be.visible');

        // * search should be visible
        cy.get('#searchMarketplaceTextbox').type('github');

        // * github plugin should be visible
        cy.get('#marketplace-plugin-github').should('be.visible');

        // * github plugin should have update prompt
        cy.get('#marketplace-plugin-github + .more-modal__subrow').should('be.visible').and('to.contain', 'Update available');

        // * github plugin should have update prompt
        cy.get('#marketplace-plugin-github + .more-modal__subrow a').should('be.visible').and('have.text', 'Update');

        // * update plugin
        cy.get('#marketplace-plugin-github + .more-modal__subrow a').click();

        // * should show "Installing..."
        cy.get('#marketplace-plugin-github .more-modal__actions .btn.btn-primary').should('be.visible').and('have.text', 'Installing...');

        // * should complete installation
        cy.get('#marketplace-plugin-github .more-modal__actions .btn.btn-primary').should('be.visible').and('have.text', 'Configure');
    });
});
