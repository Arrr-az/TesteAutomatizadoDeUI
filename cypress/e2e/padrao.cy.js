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

describe('Teste perda de conteudo', () => {
  it('passes', () => {

    // Navega até a página de email
    cy.get(":nth-child(1) > .col > .card > a.ng-tns-c2007924471-1 > .card-content").click();
    cy.url().should("be.equals", "https://cartao-de-visitas-1f916.web.app/email");

    const inputNome = 'aaa'
    const inputEmail = 'bbb@mail.com'
    const inputMensagem = 'ccc'

    // Insere texto nos campos
    cy.get(`.contact-form >:nth-child(${1})>:input`).type(inputNome);
    cy.get(`.contact-form >:nth-child(${2})>:input`).type(inputEmail);
    cy.get(`.contact-form >:nth-child(${3})>:input`).type(inputMensagem);

    // Volta à home e checa se os valores dos campos estão salvos na rota
    cy.get('button.black').click();
    cy.url().should("include", `/home?user_name=${inputNome}&user_email=${inputEmail}&message=${inputMensagem}`);

    // Navega até a página de email novamente
    cy.get(":nth-child(1) > .col > .card > a.ng-tns-c2007924471-1 > .card-content").click();
    cy.url().should("be.equals", "https://cartao-de-visitas-1f916.web.app/email");

    //Checa se os campos possuem os mesmos valores da rota
    cy.get(`.contact-form >:nth-child(${1})>:input`)
      .invoke('val')
      .then((conteudoNome) => {
        expect(conteudoNome).to.equal(inputNome);
      });

    cy.get(`.contact-form >:nth-child(${2})>:input`)
      .invoke('val')
      .then((conteudoEmail) => {
        expect(conteudoEmail).to.equal(inputEmail);
      });

    cy.get(`.contact-form >:nth-child(${3})>:input`)
      .invoke('val')
      .then((conteudoMensagem) => {
        expect(conteudoMensagem).to.equal(inputMensagem);
      });

  })
})