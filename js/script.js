'use strict'

const date = new Date()

// get current year
const currentYear = date.getFullYear()
// get current month
const currentMonth = date.getMonth() + 1 // index value starts with 0
// get current day
const currentDay = date.getDate()

const btn = document.querySelector('.btn')
const yearInput = document.getElementById('birthYear')
const monthInput = document.getElementById('birthMonth')
const dayInput = document.getElementById('birthDay')

const monthFormat = 0 //  Where 0 is for months with 30 day, 1 for  31 days and 2 for February

// error messages
const dayError = document.getElementById('day-error')
const monthError = document.getElementById('month-error')
const yearError = document.getElementById('year-error')

// labels
const dayLabel = document.querySelector('.day_label')
const monthLabel = document.querySelector('.month_label')
const yearLabel = document.querySelector('.year_label')

// result
const dayValue = document.getElementById('dayValue')
const monthValue = document.getElementById('monthValue')
const yearValue = document.getElementById('yearValue')

// check if day, month and year is plural or singular
document.getElementById('year').innerText = 'years'
document.getElementById('month').innerText = 'months'
document.getElementById('day').innerText = 'days'

//  30 days in Apr, Jun, Sept & Nov
//  31 days in Jan, Mar, May, July, Aug, Oct & Dec
//  28/29 day in Feb

switch (monthInput) {
  //  Jan, Mar, May, July, Aug, Oct & Dec
  case 1:
  case 3:
  case 5:
  case 7:
  case 8:
  case 10:
  case 12:
    monthFormat = 0
    break

  //  Apr, Jun, Sept & Nov
  case 4:
  case 6:
  case 9:
  case 11:
    monthFormat = 1
    break

  //  February
  case 2:
    monthFormat = 2
    break
}

let dayDiff = 0
let monthDiff = 0
let yearDiff = 0

// Age Calculation

const calculateAge = function (day, month, year) {
  yearDiff = currentYear - Number(year) // Get user's age in years
  monthDiff = currentMonth - Number(month) // Get the diffrence of months
  if (monthDiff < 0) {
    monthDiff = Number(month) - currentMonth
  }
  dayDiff = currentDay - Number(day) // Get difference in days
  if (dayDiff < 0) {
    dayDiff = Number(day) - currentDay
  }

  if (Number(monthDiff) === 1) {
    document.getElementById('month').innerText = 'month'
  } else {
    document.getElementById('month').innerText = 'months'
  }
  if (Number(yearDiff) === 1) {
    document.getElementById('year').innerText = 'year'
  } else {
    document.getElementById('year').innerText = 'years'
  }
  if (Number(dayDiff) === 1) {
    document.getElementById('day').innerText = 'day'
  } else {
    document.getElementById('day').innerText = 'days'
  }
}

const setParameters = function (dataInput, dataError, dataLabel, dataStamp) {
  let funcValue = 0
  let timeMax = 0

  if (dataStamp === 31) {
    funcValue = 0
  } else if (dataStamp === 12) {
    funcValue = 1
  } else if (dataStamp === currentYear) {
    funcValue = 2
  }

  if (funcValue === 0) {
    if (monthFormat === 0) {
      timeMax = 31
    } else if (monthFormat === 1) {
      timeMax = 30
    } else if (monthFormat === 2) {
      timeMax = 29
    }
    dayInput.max = timeMax
  } else if (funcValue === 1) {
    timeMax = 12
    dataInput.max = timeMax
  } else if (funcValue === 2) {
    timeMax = currentYear
    dataInput.max = timeMax
  }
  //  Show error msg if requirements are not met
  if (Number(dataInput.value) <= timeMax && Number(dataInput.value) > 0) {
    dataError.classList.add('hidden')
    dataLabel.classList.remove('red')
    return true
  } else {
    dataError.classList.remove('hidden')
    dataLabel.classList.add('red')
    dayInput.classList.add('border-error')
    monthInput.classList.add('border-error')
    yearInput.classList.add('border-error')

    return false
  }
}

btn.addEventListener('click', function () {
  const dayListener = setParameters(dayInput, dayError, dayLabel, 31)
  const monthListener = setParameters(monthInput, monthError, monthLabel, 12)
  const yearListener = setParameters(
    yearInput,
    yearError,
    yearLabel,
    currentYear,
  )

  if (dayListener && monthListener && yearListener) {
    calculateAge(dayInput.value, monthInput.value, yearInput.value)
    dayValue.textContent = dayDiff
    monthValue.textContent = monthDiff
    yearValue.textContent = yearDiff
  }
})
