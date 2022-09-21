/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(() => {
        cy.visit('./src/index.html');
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
            .type(firstName2) 
            .should('have.value', this.firstName);

        cy.get('#lastName')
            .should('be.visible')
            .type(this.lastName)
            .should('have.value', this.lastName);

        cy.get('#email').type(this.email);
        cy.get('#open-text-area').type(this.message, {delay:0});
        cy.get('.button').click();

        cy.get('.success > strong')
            .should('be.visible')
            .should('have.text', 'Mensagem enviada com sucesso.');
    });

    it('Exercício extra 2 - exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.log(this.firstName)
        cy.get('#firstName')
            .should('be.visible')
            .type(this.firstName) 
            .should('have.value', this.firstName);

        cy.get('#email').type(this.email);
        cy.get('#open-text-area').type(this.message, {delay:0});
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

    it.only('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName')
            .should('be.visible')
            .type(this.firstName) 
            .should('have.value', this.firstName);   

        cy.get('#lastName')
            .should('be.visible')
            .type(this.lastName)
            .should('have.value', this.lastName);

        cy.get('#email').type(this.email);

        cy.get('#open-text-area').type(this.message, {delay:0});

        cy.get('#phone-checkbox').click();

        cy.get('.button').click();

        cy.get('.error > strong')
            .should('be.visible')
            .should('have.text', 'Valide os campos obrigatórios!');
    });
  })