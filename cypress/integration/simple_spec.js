describe('tests q2 project', function() {
    it('tests features', function() {
        cy.visit('localhost:3000')
        cy.title().should('contain', 'Score Board!!')
        cy.get('.bar').children().should('have.length.gte', 2)
        cy.get('.bar').children('li').eq(0).click()

        cy.get('.bar').children('li').eq(1).click()

        cy.get('button').click()

        cy.get('.bar').children().should('have.length.gte', 2)
        cy.get('select[name=games]').children().should('have.length.gt', 5)        
        cy.get('ul').children().should('have.length.gte', 4)

        const player = 'Will'
        cy.get('ul').eq(1).children('li').children('input').eq(0)
            .should('have', '[name=player]')
            .type(player)
            .should('have.value', player)

        cy.get('.player-submit').click()

        cy.get('.game-form').children().should('have.length.gte', 3)
        cy.get('.player-card').children('p').should('contain', player)
        cy.get('.counter-up').click()
        cy.get('.amount').should('have.value', '1')
        
    })
})