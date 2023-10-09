//verify the star wars character search functionality 
describe('Character search feature tests', () => {

    //verify valid character search result display
    it('Valid character', function () {

        cy.fixture('character_search_feature.json').then((data) => {
            data.valid_character_test.iterations.forEach(element => {
                //verify the star wars search web application open 
                cy.visit(Cypress.env('url'))

                //search by click on the search button
                if (element.useButton) {
                    //type valid character name in search form
                    cy.get('.form-control').type(element.search);
                    cy.get('.btn').click()

                    //search by click on enter button    
                } else {
                    cy.get('.form-control').type(element.search + '{enter}');
                }

                //verify search result appears    
                cy.get('[data-test-id="character_card_1"]').should('be.visible')

                //verify the full character name appears 
                cy.get('[data-test-id="name_1"]').should('have.text', element.name);

                //verify the gender, birthyear, eyecolor and skin color display for the searched character
                cy.get('[data-test-id="gender_1"] > .col-sm-2').should('have.text', 'Gender:');
                cy.get('[data-test-id="gender_1"] > .col-sm-10').should('have.text', element.gender);

                cy.get('[data-test-id="dob_1"] > .col-sm-2').should('have.text', 'Birth year:');
                cy.get('[data-test-id="dob_1"] > .col-sm-10').should('have.text', element.dob);

                cy.get('[data-test-id="ecolor_1"] > .col-sm-2').should('have.text', 'Eye color:');
                cy.get('[data-test-id="ecolor_1"] > .col-sm-10').should('have.text', element.eyeColor);

                cy.get('[data-test-id="scolor_1"] > .col-sm-2').should('have.text', 'Skin color:');
                cy.get('[data-test-id="scolor_1"]> .col-sm-10').should('have.text', element.skinColor);
            });
        })
    });

    //verify invalid character search display not found in result
    it('Invalid character', function () {

        //verify the star wars search web application open
        cy.visit(Cypress.env('url'))

        //type invalid character name in search form
        cy.get('.form-control').type('Ryan')
        cy.get('.btn').click()

        //verify the not found text display 
        cy.contains('Not found').should('be.visible')
    });

    //verify when we clear the search form and hit the search button, then the results should be disappear 
    it('clear previous result on empty search', function () {

        //verify the star wars search web application open
        cy.visit(Cypress.env('url'))

        //add character name in search form
        cy.get('.form-control').type("boba");
        cy.get('.btn').click()

        //verify the search result appears 
        cy.get('[data-test-id="character_card_1"]').should('be.visible')

        //verify the full character name appears 
        cy.get('[data-test-id="name_1"]').should('have.text', 'Boba Fett');

        //clear the search form and hit search button
        cy.get('.form-control').type("boba").clear();
        cy.get('.btn').click()

        //verify the search result disappears
        cy.get('[data-test-id="character_card_1"]').should('not.exist')
    });

    //verify when we search the valid planet name and switch from planet to people and hit the search button then not found message display
    it('switching from planet to people and show not found result', function () {

        //verify the star wars search web application open
        cy.visit(Cypress.env('url'))

        //tick checkbox for switch from people to planet
        cy.get('#planets').check('planets')

        //type valid planet name in search form
        cy.get('.form-control').type('bespin')

        //click on search button
        cy.get('.btn').click()

        //search result should be appear
        cy.get('[data-test-id="planet_card_1"]').should('be.visible')
        cy.get('[data-test-id="planet_name_1"]').should('have.text', 'Bespin');

        //tick checkbox for switch from planet to people
        cy.get('#people').check('people')
        cy.get('.btn').click()

        //verify the search result disappears
        cy.contains('Not found').should('be.visible')

    });
    //verify the partial search display all the name related to the search keywords.
    it('display all people related to the partial search', function () {

        //select the fixtures file to use the data
        cy.fixture('character_search_feature.json').then((data) => {

            //select the testcase data
            const testCase = data.partial_character_search_test;

            //verify the star wars search web application open
            cy.visit(Cypress.env('url'));

            //search the keyword
            cy.get('.form-control').type(testCase.search);
            cy.get('.btn').click()

            //verify the count of the results, displayed by partial searching 
            cy.get('[data-test-id^="character_card_"]').should('have.length', testCase.results.count);

            //verify the correct data should display in the results
            testCase.results.data.forEach((element, index) => {
                cy.get('[data-test-id="character_card_'+(index+1)+'"]').should('be.visible')
                cy.get('[data-test-id="name_'+(index+1)+'"]').should('have.text', element.name);
            });
        });

    });
    
});

