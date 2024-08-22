describe('Teste home', () => {
  
  it('passes', () => {
    cy.visit('https://cartao-de-visitas-1f916.web.app')
    cy.get('h2').should('contain','Catterina Vittorazzi Salvador')
    cy.get('p').should('contain','Trainee')

    for(let i=1; i<=6; i++){
      cy.get(`:nth-child(${i}) > .col > .card > a.ng-tns-c2007924471-1 > .card-content`).should('be.visible')
    }
    

  })
})

beforeEach(()=>{
  cy.visit('https://cartao-de-visitas-1f916.web.app')
})

describe('Teste redirecionar email',()=>{
    it('passes', () => {
    
    cy.get(":nth-child(1) > .col > .card > a.ng-tns-c2007924471-1 > .card-content").click()
    cy.url().should("be.equals","https://cartao-de-visitas-1f916.web.app/email")
  })
})
describe('Teste redirecionar surpresa',()=>{
    it('passes', () => {
    
    cy.get(":nth-child(6) > .col > .card > a.ng-tns-c2007924471-1 > .card-content").click()
    cy.url().should("be.equals","https://cartao-de-visitas-1f916.web.app/surprise")
  })
})
describe('Teste redirecionar whatsapp',()=>{
    it('passes', () => {
    
    cy.get(":nth-child(2) > .col > .card > a.ng-tns-c2007924471-1").should('have.attr', 'href').and('include', 'https://wa.me/5528999596505')
  })
})
describe('Teste redirecionar instagram',()=>{
    it('passes', () => {
    
    cy.get(":nth-child(3) > .col > .card > a.ng-tns-c2007924471-1").should('have.attr', 'href').and('include',"https://www.instagram.com/catterinasalvador/")
    
  })
})
describe('Teste redirecionar linkedin',()=>{
    it('passes', () => {
    
    cy.get(":nth-child(4) > .col > .card > a.ng-tns-c2007924471-1").should('have.attr', 'href').and("include","https://www.linkedin.com/in/catterina-salvador-2708035b/")
  })
})
describe('Teste redirecionar github',()=>{
    it('passes', () => {
    
cy.get(":nth-child(5) > .col > .card > a.ng-tns-c2007924471-1 ").should('have.attr', 'href').and("include","https://www.github.com/catterinavs")
    
  })
})

describe('Teste front e-mail',()=>{
    it('passes', () => {  
    cy.get(":nth-child(1) > .col > .card > a.ng-tns-c2007924471-1 > .card-content").click()
      for(let i=1; i<=3; i++){
      
        cy.get(`.contact-form >:nth-child(${i})`).should('be.visible').and('not.have.attr','readonly')
        cy.get('[type="submit"]').should('be.disabled')
      } 

    
  })
})