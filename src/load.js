'use strict';

/** For additional feature: WolfBeacon's Hackathon integration */

const config = require('./config.json');

module.exports = {
    /** Forms a URL for WolfBeacon's endpoints. */
    formUrl: async function() {
        let str = config.baseUrl + config.apiUrl;
        str += '?start-date=' + this.getDate();
        str += '&end-date=' + this.getDate(config.futureDays);
        str += '&sort-by=date';

        return getCoords().then((crd) => {
            str += '&latitude=' + crd.latitude; //
            str += '&longitude=' + crd.longitude; //
            return str;
        });
    },
    /** Gets and formats today's date into yyyy-MM-dd. */
    getDate: function(dateAdd = 0) {
        let today = new Date();
        today.setDate(today.getDate() + dateAdd);

        return this.formatDelimitedDate(today.getFullYear(), today.getMonth() + 1, today.getDate());
    },
    /** Formats a date delimited by dashes. */
    formatDelimitedDate: function() {
        return Array.prototype.slice.call(arguments).map((val) => {
            let str = '' + val;
            if (val < 10) {
                str = '0' + str
            }
            return str;
        }).join('-');
    },
    /** Formats a yyyy-MM-dd date to month name and day. */
    formatReadableDate: function(date) {
      let objDate = new Date(date);
      return objDate.toLocaleString(config.locale, { month: "short" }) + ' ' + objDate.getDate();
    },
    /** Converts a Date to UTC. */
    asUTC: function (date) {
        let result = new Date(date);
        result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
        return result;
    },
    /** Gets the days between two dates. */
    daysBetween: function (startDate, endDate) {
        let millisecondsPerDay = 24 * 60 * 60 * 1000;
        return (treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay;
    }
    /** Gets browser coordinates. */
    /** MOMENTUM NOTE: Replace with Momentum's location function. */
    getCoords: async function() {
        return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject));
    },
    /** Main function. */
    load: async function() {
        return this.formUrl().then(window.fetch).then(response => response.json());
    }
};
