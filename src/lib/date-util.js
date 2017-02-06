'use strict'

/** For additional feature: WolfBeacon's Hackathon integration */

module.exports = {
    /** Gets and formats today's date into yyyy-MM-dd. */
  getDate: function (dateAdd = 0) {
    let today = this.getRealDate(dateAdd)

    return this.formatDelimitedDate(today.getFullYear(), today.getMonth() + 1, today.getDate())
  },
    /** Gets and formats today's date into date format */
  getRealDate: function (dateAdd = 0) {
    let today = new Date()
    today.setDate(today.getDate() + dateAdd)

    return today
  },
    /** Changes a delimited date to a date object. */
  readDelimitedDate: function (date) {
    let data = this.unformatDelimitedDate(date)

    return new Date(data[0], data[1] - 1, data[2])
  },
    /** Formats a date delimited by dashes. */
  formatDelimitedDate: function () {
    return Array.prototype.slice.call(arguments).map((val) => {
      let str = '' + val
      if (val < 10) {
        str = '0' + str
      }
      return str
    }).join('-')
  },
    /** Unformats a date delimited by dashes. */
  unformatDelimitedDate: function (date) {
    return date.split('-').map(val => parseInt(val, 10))
  },
    /** Formats a yyyy-MM-dd date to month name and day. */
  formatReadableDate: function (date, locale) {
    let objDate = this.readDelimitedDate(date)
    return objDate.toLocaleString(locale, { month: 'short' }) + ' ' + objDate.getDate()
  },
    /** Converts a Date to UTC. */
  asUTC: function (date) {
    let result = new Date(date)
    result.setMinutes(result.getMinutes() - result.getTimezoneOffset())
    return result
  },
    /** Gets the days between two dates. */
  daysBetween: function (startDate, endDate) {
    const millisecondsPerDay = 24 * 60 * 60 * 1000
    return (this.asUTC(endDate) - this.asUTC(startDate)) / millisecondsPerDay
  }
}
