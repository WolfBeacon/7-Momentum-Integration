'use strict';

/** For additional feature: WolfBeacon's Hackathon integration */

const config = require('./config.json');

module.exports = {
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
    getDate: function(dateAdd = 0) {
        let today = new Date();
        today.setDate(today.getDate() + dateAdd);

        return this.formatDate(today.getFullYear(), today.getMonth() + 1, today.getDate());
    },
    formatDate: function() {
        return Array.prototype.slice.call(arguments).map((val) => {
            let str = '' + val;
            if (val < 10) {
                str = '0' + str
            }
            return str;
        }).join('-');
    },
    getCoords: async function() {
        return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject));
    },
    load: async function() {
        return this.formUrl().then(window.fetch).then(response => response.json());
    }
};
