let testData = [{
    "position": "bottom-left",
    "title": "Hello",
    "content": "Good toast",
    "toastType": "success",
    "toastTime": 5000
}]

let expectedResult = [{
    "title": "Hello",
    "content": "Good toast",
    "toastIcon": '[data-name="checkmark"]',
    "toastBgr": 'rgb(0, 214, 143)'
}]


describe("Positive scenarios", () => {

    before(() => {
        cy.visit('https://sanitarskyi-ngx-admin.herokuapp.com/', {timeout: 130000});

        cy.log('Select Light theme');
        cy.get('[src="assets/images/default-theme.jpg"]').click();

        cy.log('Open Forms->Form Layouts');
        cy.get('[title="Modal & Overlays"]').click();
        cy.get('span:contains("Toastr")', {timeout: 5000}).click();
    })

    it(`Toast verification test`, () => {


        for (let i = 0; i < 1; i++) {

            cy.log('Select position');
            cy.get('button:contains("top")').click();
            cy.get(`[ng-reflect-value = "${testData[i].position}"]`).click();


            cy.log('Select toast type');
            cy.get('nb-card-body div:nth-child(2) button[class="select-button"]').click();
            cy.get(`[ng-reflect-value = "${testData[i].toastType}"]`).click();


            cy.log('Enter title');
            cy.get('[name="title"]').clear();
            cy.get('[name="title"]').type(testData[i].title);

            cy.log('Enter content');
            cy.get('[name="content"]').clear();
            cy.get('[name="content"]').type(testData[i].content);

            cy.log('Set time');
            cy.get('[name="timeout"]').clear();
            cy.get('[name="timeout"]').type(testData[i].toastTime);


            cy.get('button:contains("Show toast")').click();

            cy.log('Verify title and content');
            cy.get('[class="ng-tns-c209-54 ng-star-inserted"]').then(toast => {
                expect(toast).to.contain(expectedResult[i].title);
                expect(toast).to.contain(expectedResult[i].content);
            })

            cy.log('Verify toast icon exists');
            cy.get(expectedResult[i].toastIcon).then(toast => {
                expect(toast).to.exist;
            })

            cy.log('Verify toast background color');

            cy
                .get('[class="ng-tns-c209-54 ng-trigger ng-trigger-fadeIn status-success destroy-by-click has-icon custom-icon ng-star-inserted"]')
                .invoke('css', 'background-color')
                .as('background')
                .then(toast => {
                    expect(toast).to.contain(expectedResult[i].toastBgr);
                })


        }


    })


})












