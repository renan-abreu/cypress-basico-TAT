/// <reference types="Cypress" />

const firstName = 'Renan',
      lastName = 'Abreu',
      email = 'renan.abreu@gmail.com',
      message = 'Muito obrigado pelo excelente e memorável curso de Cypress, Walmyr!'

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(() => {
        cy.visit('./src/index.html');
        //Exemplo com cy.wrap, para utilizá-lo digtar this.alias, ex: this.firstName
        cy.wrap('Renan').as('firstName');
        cy.wrap('Abreu').as('lastName');
        cy.wrap('renan.abreu@gmail.com').as('email');
        cy.wrap('Muito obrigado pelo excelente e memorável curso de Cypress, Walmyr!').as('message');
    });
    
    

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
    });

    it('preenche os campos obrigatórios e envia o formulário', function() {

        cy.get('#firstName')
            .should('be.visible')
            .type(firstName) 
            .should('have.value', firstName);

        cy.get('#lastName')
            .should('be.visible')
            .type(lastName)
            .should('have.value', lastName);

        cy.get('#email').type(email);

        cy.get('#open-text-area').type(message);
        
        cy.get('.button').click();

        cy.get('.success > strong')
            .should('be.visible')
            .should('have.text', 'Mensagem enviada com sucesso.');
    });

    it('Exercício extra 1 - preenche os campos obrigatórios e envia o formulário', function() {

        cy.get('#firstName')
            .should('be.visible')
            .type(firstName) 
            .should('have.value', firstName);

        cy.get('#lastName')
            .should('be.visible')
            .type(lastName)
            .should('have.value', lastName);

        cy.get('#email').type(email);

        cy.get('#open-text-area').type(message, {delay:0});

        cy.get('.button').click();

        cy.get('.success > strong')
            .should('be.visible')
            .should('have.text', 'Mensagem enviada com sucesso.');
    });

    it('Exercício extra 2 - exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.log(firstName)
        cy.get('#firstName')
            .should('be.visible')
            .type(firstName) 
            .should('have.value', firstName);

        cy.get('#email').type(email);

        cy.get('#open-text-area').type(message, {delay:0});

        cy.get('.button').click();

        cy.get('.error').should('be.visible')

        cy.get('.error > strong')
        .should('be.visible')
        .should('have.text', 'Valide os campos obrigatórios!');
    });

    it('Exercício extra 3 - Validando campo numérico do Telefone', () => {
        cy.get('#phone')
        .type('FFFF FFFF')
        .should('have.value', '')
        .type('**** ####')
        .should('have.value', '');
        
    });

    it('Exercício extra 4 - exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName')
            .should('be.visible')
            .type(firstName) 
            .should('have.value', firstName);   

        cy.get('#lastName')
            .should('be.visible')
            .type(lastName)
            .should('have.value', lastName);

        cy.get('#email').type(email);

        cy.get('#open-text-area').type(this.message, {delay:0});

        cy.get('#phone-checkbox').click();

        cy.get('.button').click();

        cy.get('.error > strong')
            .should('be.visible')
            .should('have.text', 'Valide os campos obrigatórios!');
    });

    it('Exercício extra 5 - preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName')
        .should('be.visible')
        .type(firstName)
        .clear()
        .should('have.value', '');

        cy.get('#lastName')
        .should('be.visible')
        .type(lastName)
        .clear()
        .should('have.value', '');

        cy.get('#email')
        .should('be.visible')
        .type(email)
        .clear()
        .should('have.value', '');

        cy.get('#phone')
        .should('be.visible')
        .type(firstName)
        .clear()
        .should('have.value', '');
    });

    it('Exercício extra 6 - exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
       cy.get('.button').click();
       cy.get('.error > strong')
            .should('be.visible')
            .should('have.text', 'Valide os campos obrigatórios!');
    });

    it('Exercício extra 7 - envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit(firstName, lastName, email, message);
    });

    it('Exercício extra 8 - Utilizando cy.contains() para clicar', () => {
        cy.get('#firstName')
        .should('be.visible')
        .type(firstName) 
        .should('have.value', firstName);

        cy.get('#lastName')
            .should('be.visible')
            .type(lastName)
            .should('have.value', lastName);

        cy.get('#email').type(email);

        cy.get('#open-text-area').type(message);

        cy.contains('Enviar').click();

        cy.get('.success > strong')
            .should('be.visible')
            .should('have.text', 'Mensagem enviada com sucesso.');        
    });
  })