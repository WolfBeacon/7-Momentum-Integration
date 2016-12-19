'use strict'

/** For additional feature: WolfBeacon's Hackathon integration */

const config = require('json!./config.json')

module.exports = {
    /** Gets and formats today's date into yyyy-MM-dd. */
  getDate: function (dateAdd = 0) {
    let today = new Date()
    today.setDate(today.getDate() + dateAdd)

    return this.formatDelimitedDate(today.getFullYear(), today.getMonth() + 1, today.getDate())
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
    /** Formats a yyyy-MM-dd date to month name and day. */
  formatReadableDate: function (date) {
    let objDate = new Date(date)
    return objDate.toLocaleString(config.locale, { month: 'short' }) + ' ' + objDate.getDate()
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
