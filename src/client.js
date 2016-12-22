'use strict'

/** For additional feature: WolfBeacon's Hackathon integration */

// Libraries
const $ = require('jquery')
const Handlebars = require('handlebars')

// Helpers
const load = require('./lib/loader').load
const dateUtil = require('./lib/date-util')
const config = require('./lib/config.json')

let template
let dates = []

/** Function to translate a hackathon to the DOM. */
function createHack (hack) {
  let $body = $('.hackathon-body')
  if (dates.length === 0) {
    $body.empty()
  }
  let $elem = $(template({
    title: hack.title,
    date: dateUtil.formatReadableDate(hack.startDate, config.locale),
    link: hack.eventLink,
    desc: hack.location
  }))
  let date = dateUtil.readDelimitedDate(hack.startDate)

  let opacity = (config.futureDays - dateUtil.daysBetween(new Date(), date)) / config.futureDays
  $elem.children('.h-timeline-content').css('opacity', opacity)
  $elem.children('.h-date').css('opacity', opacity / 2)
  $elem.children('.h-timeline-img-' + (dates.length === 0 ? 'other' : 'first')).hide()
  if (dates.length > 0) {
    $elem.css('margin-top', (dateUtil.daysBetween(dates[dates.length - 1], date) * 3) + 'px')
  }
  $elem.hide()
  $body.append($elem)
  $elem.delay((dates.length + 1) * 250).fadeIn()

  dates.push(date)
}

/** Main function. */
$('document').ready(() => {
  template = Handlebars.compile($('#hackathon-template').html())

  load().then((hacks) => hacks.forEach(createHack))
        .catch((err) => {
          console.error(err)
          createHack({
            title: 'Error',
            startDate: '2016-12-30',
            eventLink: config.baseUrl + config.authLink,
            location: 'Please authorize yourself'
          })

            /** TODO: NOTE: TESTING */
          createHack({
            title: 'Hack the North',
            startDate: '2017-01-30',
            eventLink: config.baseUrl + config.authLink,
            location: 'Waterloo, ON, Canada'
          })
          createHack({
            title: 'Hack the North',
            startDate: '2017-02-01',
            eventLink: config.baseUrl + config.authLink,
            location: 'Waterloo, ON, Canada'
          })
        })
})

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
