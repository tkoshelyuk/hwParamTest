describe('Login', () => {

    it('Register user', () => {


        cy.visit('https://automationteststore.com/');

        cy.log('Click login')
        cy.get('span[class="menu_text"]').contains('Account').click();
        cy.get('button[title="Continue"]').click();

        cy.log('Enter user data')
        cy.get('#AccountFrm_firstname').type('firstName1');
        cy.get('#AccountFrm_lastname').type('lastName1');
        cy.get('#AccountFrm_email').type('firstLast@mail.com');
        cy.get('#AccountFrm_address_1').type('address1');
        cy.get('#AccountFrm_city').type('GoodCity');
        cy.get('#AccountFrm_country_id').select('Turkey');
        cy.get('#AccountFrm_zone_id').select('Antalya');
        cy.get('#AccountFrm_postcode').type('12345');
        cy.get('#AccountFrm_loginname').type('firstLastTurkAnt');
        cy.get('#AccountFrm_password').type('123456');
        cy.get('#AccountFrm_confirm').type('123456');
        cy.get('#AccountFrm_newsletter0').click();
        cy.get('#AccountFrm_agree').click();

        cy.get('button[title="Continue"]').click();

        cy.log('Verify account')
        cy.get('span[class="menu_text"]').contains('Account').click();
        cy.get('ul[class="side_account_list"] li').eq(2).click();
        cy.get('div[class="input-group col-md-4"]').eq(0).should('contain','firstLastTurkAnt');



















    })


})