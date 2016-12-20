'use strict'

const chai = require('chai')
const expect = chai.expect

describe('[main page]', function () {
  it('should have a title', function () {
    return expect(browser.url('/').getTitle())
      .to.eventually.be.equal('New Tab')
  })

  it('should have an output area which is initially empty', function () {
    return expect(browser.getText('.hackathon-body'))
      .to.eventually.be.equal('')
  })
})
