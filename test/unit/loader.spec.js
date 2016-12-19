const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

const loader = require('../../src/lib/loader.js')

describe('[sample unit]', function () {
  it('should pass getDate with no input', function () {
    return expect(loader.getDate().length)
      .to.be.equal(3)
  })

  it('should pass formatDate with arbitrary input', function () {
    return expect(loader.formatDate(2016, 1, 1))
      .to.be.equal('2016-01-01')
  })
})
