import {buildUser} from '../support/generate'

const registerUrl = `${Cypress.config('baseUrl')}/auth/register`
const dashboardUrl = `${Cypress.config('baseUrl')}/app/dashboard`

const user = buildUser()

describe('authenticating', () => {
  it('should allow user auth flow', () => {
    cy.visit('/')

    // Register
    cy.findByRole('button', {name: /register/i}).click()

    cy.url().should('be.equal', registerUrl)

    cy.findByLabelText(/username/i).type(user.username)
    cy.findByLabelText(/password/i).type(user.password)

    cy.findByRole('button', {name: /register/i}).click()

    cy.url().should('be.equal', dashboardUrl)

    // Logout
    cy.findByRole('button', {name: /logout/i}).click()
    cy.url().should('be.equal', Cypress.config('baseUrl') + '/')

    // Login
    cy.findByRole('button', {name: /login/i}).click()

    cy.findByLabelText(/username/i).type(user.username)
    cy.findByLabelText(/password/i).type(user.password)

    cy.findByRole('button', {name: /login/i}).click()

    cy.url().should('be.equal', dashboardUrl)
  })
})
