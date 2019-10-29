// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

// ***************************************************************
// - [#] indicates a test step (e.g. 1. Go to a page)
// - [*] indicates an assertion (e.g. * Check the title)
// - Use element ID when selecting an element. Create one if none.
// ***************************************************************

describe('Plugin Marketplace', () => {
    describe('should not render marketplace in main menu', () => {
        afterEach(() => {
            // # Click hamburger main menu
            cy.get('#sidebarHeaderDropdownButton').click();

            // * Dropdown menu should be visible
            cy.get('#sidebarDropdownMenu').should('be.visible');

            // * Marketplace button should not be visible
            cy.get('#marketplaceModal').should('not.be.visible');
        });

        it('for non-admin', () => {
            // # Configure marketplace as enabled
            const newSettings = {
                PluginSettings: {
                    Enable: true,
                    EnableMarketplace: true,
                    MarketplaceUrl: 'https://api.integrations.mattermost.com',
                },
            };
            cy.apiUpdateConfig(newSettings);

            // # Login as non admin user
            cy.apiLogin('user-1');
            cy.visit('/');
        });

        it('when marketplace disabled', () => {
            // # Configure marketplace as disabled
            const newSettings = {
                PluginSettings: {
                    Enable: true,
                    EnableMarketplace: false,
                    MarketplaceUrl: 'https://api.integrations.mattermost.com',
                },
            };
            cy.apiUpdateConfig(newSettings);

            // # Login as sysadmin
            cy.apiLogin('sysadmin');
            cy.visit('/');
        });

        it('when plugins disabled', () => {
            // # Configure plugins as disabled
            const newSettings = {
                PluginSettings: {
                    Enable: false,
                    EnableMarketplace: true,
                    MarketplaceUrl: 'https://api.integrations.mattermost.com',
                },
            };
            cy.apiUpdateConfig(newSettings);

            // # Login as sysadmin
            cy.apiLogin('sysadmin');
            cy.visit('/');
        });
    });

    it('should fail to connect to an invalid marketplace server', () => {
        // # Set ServiceSettings to expected values
        const newSettings = {
            PluginSettings: {
                Enable: true,
                EnableMarketplace: true,
                MarketplaceUrl: 'some_site.com',
            },
        };
        cy.apiUpdateConfig(newSettings);

        // # Login as non admin user
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

        // * Should be an error connecting to the marketplace server
        cy.get('#error_bar').contains('Error connecting to the marketplace server');
    });
});
