import '@testing-library/cypress/add-commands'

const getStoredAuthToken = () =>
  localStorage.getItem(Cypress.env('VITE_APP_AUTH_TOKEN_LOCAL_STORAGE_KEY'))
const storeAuthToken = token =>
  window.localStorage.setItem(
    Cypress.env('VITE_APP_AUTH_TOKEN_LOCAL_STORAGE_KEY'),
    token,
  )
const queryStringify = object => new URLSearchParams(object).toString()

Cypress.Commands.add(
  'apiRequest',
  (method, url, variables = {}, options = {}) => {
    cy.request({
      method,
      url: `${Cypress.env('VITE_APP_API_URL')}${url}`,
      qs: method === 'GET' ? queryStringify(variables) : undefined,
      body: method !== 'GET' ? variables : undefined,
      headers: {
        'Content-Type': 'application/json',
        Authorization: getStoredAuthToken()
          ? `Bearer ${getStoredAuthToken()}`
          : undefined,
      },
      ...options,
    })
  },
)

Cypress.Commands.add('loginAsUser', user => {
  cy.visit('/')

  cy.apiRequest('POST', '/auth/register', user).then(response => {
    storeAuthToken(response.body.token)
  })

  cy.visit('/')
})

Cypress.Commands.add('resetDatabase', () => {
  cy.apiRequest('DELETE', '/test/reset-database')
})
