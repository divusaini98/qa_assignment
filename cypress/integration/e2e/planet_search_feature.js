//verify the star wars planet search functionality 
describe('Planet search feature tests', () => {

    //verify valid planet search result display
    it('Valid planet', function () {

        cy.fixture('planet_search_feature.json').then((data) => {
            data.valid_planet_test.iterations.forEach(element => {

                //verify the star wars search web application open 
                cy.visit(Cypress.env('url'))
                cy.get("#planets").check()
                
                //search by click on the search button
                if (element.useButton) {

                    //type valid planet name in search form
                    cy.get('.form-control').type(element.search);
                    cy.get('.btn').click()

                //search by click on enter button  
                } else {
                    cy.get('.form-control').type(element.search + '{enter}');
                }

                //verify search result appears  
                cy.get('[data-test-id="planet_card_1"]').should('be.visible')

                //verify the full planet name appears 
                cy.get('[data-test-id="planet_name_1"]').should('have.text', element.name);

                //verify the population, climate and gravity values display for the searched planet
                cy.get('[data-test-id="population_1"] > .col-sm-2').should('have.text', 'Population:');
                cy.get('[data-test-id="population_1"] > .col-sm-10').should('have.text', element.population);

                cy.get('[data-test-id="climate_1"] > .col-sm-2').should('have.text', 'Climate:');
                cy.get('[data-test-id="climate_1"] > .col-sm-10').should('have.text', element.climate);

                cy.get('[data-test-id="gravity_1"] > .col-sm-2').should('have.text', 'Gravity:');
                cy.get('[data-test-id="gravity_1"] > .col-sm-10').should('have.text', element.gravity);

                
            });
        })
    });

     //verify invalid planet search display not found in result
    it('Invalid planet', function () {

        //verify the star wars search web application open
        cy.visit(Cypress.env('url'))

        //type invalid planet name in search form
        cy.get('.form-control').type('venus')
        cy.get('.btn').click()

        //verify the not found text display 
        cy.contains('Not found').should('be.visible')
    });

    //verify when we clear the search form and hit the search button, then the results should be disappear 
    it('clear previous result on empty search', function(){

        //verify the star wars search web application open
        cy.visit(Cypress.env('url'))

        //tick planet checkbox
        cy.get("#planets").check()

        //add planet name in search form
        cy.get('.form-control').type("kamino");
        cy.get('.btn').click()

        //verify the search result appears 
        cy.get('[data-test-id="planet_card_1"]').should('be.visible')

        //verify the full planet name appears 
        cy.get('[data-test-id="planet_name_1"]').should('have.text', 'Kamino');

        //clear the search form and hit search button
        cy.get('.form-control').type("kamino").clear();
        cy.get('.btn').click()

        //verify the search result disappears
        cy.get('[data-test-id="planet_card_1"]').should('not.exist')

                
    })

    //verify when we search the valid character name and switch from people to planet and hit the search button then not found message display
    it('switching from people to planet and show not found result', function() {
       
        //verify the star wars search web application open
        cy.visit(Cypress.env('url'))

        //type valid character name in search form
        cy.get('.form-control').type('han solo')
        cy.get('.btn').click()
        
        //search result should be appear
        cy.get('[data-test-id="character_card_1"]').should('be.visible')
        cy.get('[data-test-id="name_1"]').should('have.text', 'Han Solo');
        
        //tick checkbox for switch from people to planet
        cy.get('#planets').check('planets')
        cy.get('.btn').click()
        //verify the search result disappears
        cy.contains('Not found').should('be.visible')
    
    })
    //verify the partial search display all the planet name related to the search keywords.
    it('display all planet related to the partial search', function () {

        //select the fixtures file to use the data
        cy.fixture('planet_search_feature.json').then((data) => {

            //select the testcase data
            const testCase = data.partial_planet_search_test;

            //verify the star wars search web application open
            cy.visit(Cypress.env('url'));

            //tick the planets checkbox
            cy.get('#planets').check('planets')
            //search the keyword
            cy.get('.form-control').type(testCase.search);
            cy.get('.btn').click()

            //verify the count of the results, displayed by partial searching 
            cy.get('[data-test-id^="planet_card_"]').should('have.length', testCase.results.count);

            //verify the correct data should display in the results
            testCase.results.data.forEach((element, index) => {
                cy.get('[data-test-id="planet_card_'+(index+1)+'"]').should('be.visible')
                cy.get('[data-test-id="planet_name_'+(index+1)+'"]').should('have.text', element.name);
            });
        });  
})
})