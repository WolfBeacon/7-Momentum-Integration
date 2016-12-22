const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

const loader = require('../../src/lib/loader')

describe('[loader]', function () {
  it('should pass formUrl', function () {
    return expect(loader.formUrl())
      .to.eventually.be.a('string')
  })
})
