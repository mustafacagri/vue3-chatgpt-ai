import { expect, test } from 'vitest'
import { dateDisplay, minutesDisplaying, timeDisplay } from './index.js'

test('100 secs in minutes', () => {
  expect(minutesDisplaying(100)).toBe('01:40')
})

test('1000 secs in minutes', () => {
  expect(minutesDisplaying(1000)).toBe('16:40')
})

test('use timeDisplay', () => {
  expect(timeDisplay(1000)).toBe('02:00, 1/1/1970')
})
