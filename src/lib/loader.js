'use strict'

/** For additional feature: WolfBeacon's Hackathon integration */

const config = require('./config.json')
const dateUtil = require('./date-util')

let loader = {
    /** Forms a URL for WolfBeacon's endpoints. */
  formUrl: function (location = false) {
    let str = config.baseUrl + config.apiUrl
    str += '?start-date=' + dateUtil.getDate()
    str += '&end-date=' + dateUtil.getDate(config.futureDays)
    str += '&sort-by=date'

    if (!location) {
      return Promise.resolve().then(() => str)
    }

    return loader.getCoords().then((crd) => {
      str += '&latitude=' + crd.coords.latitude
      str += '&longitude=' + crd.coords.longitude
      return str
    }).catch(() => str)
  },
    /** Gets browser coordinates. */
    /** MOMENTUM NOTE: Replace with Momentum's location function. */
  getCoords: function () {
    return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject))
  },
    /** Main function. */
  load: function () {
    return loader.formUrl(true).then((url) => window.fetch(url, { mode: 'no-cors' })).then(response => response.json())
  }
}
module.exports = loader
