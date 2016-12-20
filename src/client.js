'use strict'

/** For additional feature: WolfBeacon's Hackathon integration */

// Libraries
const $ = require('jquery')
const Handlebars = require('handlebars')

// Helpers
const load = require('./lib/loader').load
const dateUtil = require('./lib/date-util')
const config = require('./lib/config.json')

/** Main function. */
$('document').ready(() => {
    // Templates
  let template = Handlebars.compile($('#hackathon-template').html())

  load().then((hacks) => {
    let $body = $('.hackathon-body')
    hacks.forEach((hack) => {
      let $elem = $(template({
        title: hack.title,
        date: dateUtil.formatReadableDate(hack.startDate, config.locale),
        link: hack.eventLink,
        desc: hack.location
      }))
      let opacity = (config.futureDays - dateUtil.daysBetween(new Date(), hack.startDate)) / config.futureDays
      $elem.children('.h-timeline-content').css('opacity', opacity)
      $body.append($elem)
    })
  }).catch(console.error)
})

/**
    {
    "id": 20160916552226390,
    "title": "Hack the North",
    "eventLink": "https://hackthenorth.com/",
    "startDate": "2016-09-15",
    "location": "Waterloo, ON, Canada",
*/

/**
  Additional information from WolfBeacon (unused at the moment):

    "travel": true,
    "prize": true,
    "highSchoolers": true,
    "cost": "free",
    "facebookLink": "https://www.facebook.com/hackthenorth",
    "twitterLink": "https://twitter.com/hackthenorth",
    "googlePlusLink": "",
    "imageLink": "https://scontent.xx.fbcdn.net/v/t1.0-1/p100x100/13501875_1423460301013883_426092165374437510_n.png?oh=23ff635c68eee2faa74b376adc7982fd&oe=58CE1F88",
*/
