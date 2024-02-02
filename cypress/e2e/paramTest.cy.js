let testData = [{
  "text": "email@ex.com",
  "selector": '#exampleInputEmail1',
  "password": "some pass",
  "passSelector": '#exampleInputPassword1'
},
  {
    "text": "othermail@ex.com",
    "selector": '#exampleInputEmail1',
    "password": "new pass",
    "passSelector": '#exampleInputPassword1'
  }]


describe("Positive scenarios", () => {

  it(`Fill field`, () => {

    cy.visit('https://sanitarskyi-ngx-admin.herokuapp.com/', {timeout: 130000});

    cy.log('Select Light theme');
    cy.get('[src="assets/images/default-theme.jpg"]').click();

    cy.log('Open Forms->Form Layouts');
    cy.get('[title="Forms"]').click();
    cy.get('span:contains("Form Layouts")').click();

    testData.forEach(testData => {
      cy.log('Fill out the field');
      cy.get(testData.selector).clear();
      cy.get(testData.passSelector).clear();
      cy.get(testData.selector, {timeout: 6000}).type(`${testData.text}`);
      cy.get(testData.passSelector, {timeout: 6000}).type(`${testData.password}`);
      cy.get('button[class="appearance-filled size-medium shape-rectangle status-danger nb-transition"]').click();
    })


  })
})







