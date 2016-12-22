const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

const util = require('../../src/lib/date-util')

describe('[date util]', function () {
  it('should pass getDate with no input', function () {
    return expect(util.getDate().length)
      .to.be.equal(10)
  })

  it('should pass formatDelimitedDate with arbitrary input', function () {
    return expect(util.formatDelimitedDate(2016, 1, 1))
      .to.be.equal('2016-01-01')
  })

  it('should pass unformatDelimitedDate with arbitrary input', function () {
    return expect(util.unformatDelimitedDate('2016-01-01').length)
      .to.be.equal(3)
  })

  it('should pass daysBetween with arbitrary input', function () {
    return expect(util.daysBetween(new Date('2016/01/01'), new Date('2016/01/02')))
      .to.be.equal(1)
  })
})
