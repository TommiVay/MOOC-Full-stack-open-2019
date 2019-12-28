describe('Blog', function () {

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test user',
      username: 'Test user',
      password: 'Test user'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('Login to application')
  })

  it('login form can be opened', function () {
    cy.contains('log in')
      .click()
    cy.contains('login')
  })

  it('login form can be closed', function () {
    cy.contains('log in')
      .click()
    cy.contains('cancel')
      .click()
  })

  it('user can login', function () {
    cy.contains('log in')
      .click()
    cy.get('[data-cy=username]')
      .type('Test user')
    cy.get('[data-cy=password]')
      .type('Test user')
    cy.contains('login')
      .click()
    cy.contains('Test user logged in')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.contains('log in')
        .click()
      cy.get('[data-cy=username]')
        .type('Test user')
      cy.get('[data-cy=password]')
        .type('Test user')
      cy.contains('login')
        .click()
    })

    it('user can logout', function () {
      cy.contains('Logout')
        .click()
      cy.contains('Test user logged in').should('not.exist')
      cy.contains('log in')
    })

    it('users page can be viewed', function() {
      cy.contains('Users')
      .click()
      cy.get('[data-cy=singleUser]')
      cy.contains('blogs: 0')
    })

    it('a single user page can be viewed', function() {
      cy.contains('Users')
      .click()
      cy.get('[data-cy=singleUser]')
      .click()
      cy.contains('added blogs')
    })

    it('a new blog can be created', function () {
      cy.contains('new blog')
        .click()
      cy.get('[data-cy=title]')
        .type('test blog')
      cy.get('[data-cy=author]')
        .type('cypress')
      cy.get('[data-cy=url]')
        .type('url.com')
      cy.contains('Add blog')
        .click()
      cy.contains('a new blog test blog by cypress added')
    })

    describe('when blog has been created', function () {
      beforeEach(function () {
        cy.contains('new blog')
          .click()
        cy.get('[data-cy=title]')
          .type('test blog')
        cy.get('[data-cy=author]')
          .type('cypress')
        cy.get('[data-cy=url]')
          .type('url.com')
        cy.contains('Add blog')
          .click()
          cy.get('[data-cy=singleBlog]')
          .click()
      })

      it('a single blog page can be viewed', function () {
        cy.contains('test blog by cypress')
        cy.contains('url.com')
      })

      it('a blog can be liked', function () {
        cy.get('[data-cy=likeButton]')
          .click()
        cy.contains('1 like')
      })

      it('a blog can be commented', function () {
        cy.get('[data-cy=commentInput]')
        .type('testComment')
        cy.contains('add comment')
        .click()
        cy.contains('testComment')
      })
    })

  })
})