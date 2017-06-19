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
let finished = 0

/** Function to translate a hackathon to the DOM. */
function createHack (hack) {
  let date = dateUtil.readDelimitedDate(hack.startDate)
  if (date < dateUtil.getRealDate() || date > dateUtil.getRealDate(config.futureDays)) {
    console.log(date)
    return
  }
  let $body = $('.hackathon-body')
  let $top = $('.hackathon')
  if (dates.length === 0) {
    $body.empty()
    $top.scroll(scrollHandler)
  }
  let $elem = $(template({
    title: hack.title,
    date: dateUtil.formatReadableDate(hack.startDate, config.locale),
    link: hack.eventLink,
    desc: hack.location
  }))

  if (dates.length > 0) {
    $elem.css('margin-top', (dateUtil.daysBetween(dates[dates.length - 1], date) * 3) + 'px')
  }
  $elem.css('opacity', 0.8)
  $elem.children().css('opacity', 0)
  $body.append($elem)
  $elem.delay((dates.length + 1) * 250).promise().done(function () {
    opacityHandler($(this), $body, $top, 250)
    finished++
  })
  dates.push(date)
}

function scrollHandler () {
  if (finished < dates.length) {
    return
  }
  let $top = $(this)
  let $body = $('.hackathon-body')
  $('.h-timeline-block').each(function (index) { opacityHandler($(this), $body, $top) })
}

function opacityHandler ($elem, $body, $top, duration = 0) {
  let opacity = 1 - 3 * (Math.abs(($elem[0].offsetTop - $top[0].offsetTop) - ($top[0].scrollTop + $top.innerHeight() / 5)) / $body.innerHeight())
  $elem.children('.h-timeline-content').fadeTo(duration, opacity)
  $elem.children('.h-timeline-img').fadeTo(duration, opacity)
  $elem.children('.h-date').fadeTo(duration, opacity / 2)
}

/** Main function. */
$(document).ready(() => {
  template = Handlebars.compile($('#hackathon-template').html())

  load().then((hacks) => hacks.forEach(createHack)).catch(console.error)
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
