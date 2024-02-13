let toastData = [
    {
        "testData": {
            "position": "bottom-left",
            "title": "Hello",
            "content": "Good toast",
            "toastType": "success",
            "toastTime": 5000,
            "className": "ng-tns-c209-54"
        },
        "expectedResult": {
            "toastPosition": "justify-content: flex-start; align-items: flex-end;",
            "title": "Hello",
            "content": "Good toast",
            "toastIcon": '[data-name="checkmark"]',
            "toastBgr": 'rgb(0, 214, 143)'
        }
    },
    {
        "testData": {
            "position": "top-right",
            "title": "Good morning",
            "content": "Nice toast",
            "toastType": "primary",
            "toastTime": 5000,
            "className": "ng-tns-c209-55"
        },
        "expectedResult": {
            "toastPosition": "justify-content: flex-end; align-items: flex-start;",
            "title": "Good morning",
            "content": "Nice toast",
            "toastIcon": '[data-name="email"]',
            "toastBgr": 'rgb(51, 102, 255)'
        }
    },
    {
        "testData": {
            "position": "top-left",
            "title": "Good evening",
            "content": "Cool toast",
            "toastType": "info",
            "toastTime": 5000,
            "className": "ng-tns-c209-56"
        },
        "expectedResult": {
            "toastPosition": "justify-content: flex-start; align-items: flex-start;",
            "title": "Good evening",
            "content": "Cool toast",
            "toastIcon": '[data-name="question-mark"]',
            "toastBgr": 'rgb(0, 149, 255)'
        }
    },
    {
        "testData": {
            "position": "bottom-right",
            "title": "Good night",
            "content": "Bad toast",
            "toastType": "warning",
            "toastTime": 5000,
            "className": "ng-tns-c209-57"
        },
        "expectedResult": {
            "toastPosition": "justify-content: flex-end; align-items: flex-end;",
            "title": "Good night",
            "content": "Bad toast",
            "toastIcon": '[data-name="alert-triangle"]',
            "toastBgr": 'rgb(255, 170, 0)'
        }
    }
]


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

        toastData.forEach(toastData => {
            cy.log('Select position');
            //cy.get('button:contains("top")').click();
            cy.get('div [class="form-group"] button').first().click();
            cy.get(`[ng-reflect-value = "${toastData.testData.position}"]`).click();


            cy.log('Select toast type');
            cy.get('nb-card-body div:nth-child(2) button[class="select-button"]').click();
            cy.get(`[ng-reflect-value = "${toastData.testData.toastType}"]`).click();


            cy.log('Enter title');
            cy.get('[name="title"]').clear();
            cy.get('[name="title"]').type(toastData.testData.title);

            cy.log('Enter content');
            cy.get('[name="content"]').clear();
            cy.get('[name="content"]').type(toastData.testData.content);

            cy.log('Set time');
            cy.get('[name="timeout"]').clear();
            cy.get('[name="timeout"]').type(toastData.testData.toastTime);


            cy.get('button:contains("Show toast")').click();

            cy.log('Verify title and content');
            cy.get(`[class="${toastData.testData.className} ng-star-inserted"]`).then(toast => {
                expect(toast).to.contain(toastData.expectedResult.title);
                expect(toast).to.contain(toastData.expectedResult.content);
            })

            cy.log('Verify toast icon exists');
            cy.get(toastData.expectedResult.toastIcon).then(toast => {
                expect(toast).to.exist;
            })

            cy.log('Verify toast background color');

            cy
                .get(`[class="${toastData.testData.className} ng-trigger ng-trigger-fadeIn status-${toastData.testData.toastType} destroy-by-click has-icon custom-icon ng-star-inserted"]`)
                .invoke('css', 'background-color')
                .as('background')
                .then(toast => {
                    expect(toast).to.contain(toastData.expectedResult.toastBgr);
                })

            cy.log('Verify toast position');
            cy
                .get(`[style= "${toastData.expectedResult.toastPosition}"]`)
                .then(toast => {
                    expect(toast).to.have.attr('style',toastData.expectedResult.toastPosition );
                })
        })


    })


})












