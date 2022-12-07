import dayjs from 'dayjs'

const yesterday = dayjs().subtract(1, 'day')

export const isEventOver = (input) => {
  return dayjs(input).isBefore(yesterday);
}

export const prettyDate = (input) => {
  return dayjs(input).format('MMM D, YYYY')
}

export const dayName = (input) => {
  return dayjs(input).format('dddd')
}