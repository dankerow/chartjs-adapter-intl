import { describe, beforeAll, it, expect } from 'vitest'
import {
  _adapters,
} from 'chart.js'
import '../src/index'

describe('Date Adapter', () => {
  let dateAdapter: any

  beforeAll(() => {
    dateAdapter = new _adapters._date({})
  })

  it('should return correct formats', () => {
    const expectedFormats = {
      datetime: { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' },
      millisecond: { hour: 'numeric', minute: 'numeric', second: 'numeric', fractionalSecondDigits: 3 },
      second: { hour: 'numeric', minute: 'numeric', second: 'numeric' },
      minute: { hour: 'numeric', minute: 'numeric' },
      hour: { hour: 'numeric' },
      day: { month: 'short', day: 'numeric' },
      week: { year: 'numeric', month: 'short', day: 'numeric' },
      month: { year: 'numeric', month: 'short' },
      quarter: { year: 'numeric', month: 'short' },
      year: { year: 'numeric' }
    }

    const formats = dateAdapter.formats()
    expect(formats).toEqual(expectedFormats)
  })

  it('should format date correctly', () => {
    const time = new Date(2023, 0, 1).getTime()
    const format = { year: 'numeric', month: 'short', day: 'numeric' }
    const formattedDate = dateAdapter.format(time, format)

    expect(formattedDate).toBe('Jan 1, 2023')
  })

  it('should parse date correctly', () => {
    const time = '2023-01-01T00:00:00Z'
    const parsedTime = dateAdapter.parse(time)

    expect(parsedTime).toBe(new Date(time).getTime())
  })

  it('should add time correctly', () => {
    const time = new Date(2023, 0, 1).getTime()
    const addedTime = dateAdapter.add(time, 1, 'day')

    expect(new Date(addedTime).getDate()).toBe(2)
  })

  it('should calculate diff correctly', () => {
    const time1 = new Date(2023, 0, 1).getTime()
    const time2 = new Date(2023, 0, 2).getTime()
    const diff = dateAdapter.diff(time2, time1, 'day')

    expect(diff).toBe(1)
  })

  it('should get start of unit correctly', () => {
    const time = new Date(2023, 0, 1, 12, 30).getTime()
    const startOfDay = dateAdapter.startOf(time, 'day')

    expect(new Date(startOfDay).getHours()).toBe(0)
  })

  it('should get end of unit correctly', () => {
    const time = new Date(2023, 0, 1, 12, 30).getTime()
    const endOfDay = dateAdapter.endOf(time, 'day')

    expect(new Date(endOfDay).getHours()).toBe(23)
  })

  it('should return null for invalid date strings', () => {
    const invalidDate = 'invalid-date'
    const parsedTime = dateAdapter.parse(invalidDate)

    expect(parsedTime).toBeNull()
  })

  it('should add different time units correctly', () => {
    const time = new Date(2023, 0, 1).getTime()
    const addedHour = dateAdapter.add(time, 1, 'hour')

    expect(new Date(addedHour).getHours()).toBe(1)

    const addedMonth = dateAdapter.add(time, 1, 'month')

    expect(new Date(addedMonth).getMonth()).toBe(1)
  })

  it('should calculate diff in different time units correctly', () => {
    const time1 = new Date(2023, 0, 1).getTime()
    const time2 = new Date(2023, 0, 2).getTime()
    const diffHours = dateAdapter.diff(time2, time1, 'hour')

    expect(diffHours).toBe(24)

    const diffMinutes = dateAdapter.diff(time2, time1, 'minute')

    expect(diffMinutes).toBe(1440)
  })

  it('should get start of different time units correctly', () => {
    const time = new Date(2023, 0, 1, 12, 30).getTime()
    const startOfHour = dateAdapter.startOf(time, 'hour')

    expect(new Date(startOfHour).getMinutes()).toBe(0)

    const startOfMonth = dateAdapter.startOf(time, 'month')

    expect(new Date(startOfMonth).getDate()).toBe(1)
  })

  it('should get end of different time units correctly', () => {
    const time = new Date(2023, 0, 1, 12, 30).getTime()
    const endOfHour = dateAdapter.endOf(time, 'hour')

    expect(new Date(endOfHour).getMinutes()).toBe(59)

    const endOfMonth = dateAdapter.endOf(time, 'month')

    expect(new Date(endOfMonth).getDate()).toBe(31)
  })

  it('should handle null and undefined values in parse', () => {
    expect(dateAdapter.parse(null)).toBeNull()
    expect(dateAdapter.parse(undefined)).toBeNull()
  })

  it('should handle invalid date in parse', () => {
    expect(dateAdapter.parse('invalid')).toBeNull()
  })

  it('should handle default case in add', () => {
    const time = new Date(2023, 0, 1).getTime()
    const addedTime = dateAdapter.add(time, 1, 'invalid-unit')

    expect(addedTime).toBe(time)
  })

  it('should handle default case in diff', () => {
    const time1 = new Date(2023, 0, 1).getTime()
    const time2 = new Date(2023, 0, 2).getTime()
    const diff = dateAdapter.diff(time2, time1, 'invalid-unit')

    expect(diff).toBe(time2 - time1)
  })

  it('should handle default case in startOf', () => {
    const time = new Date(2023, 0, 1).getTime()
    const startOf = dateAdapter.startOf(time, 'invalid-unit')

    expect(startOf).toBe(time)
  })

  it('should handle default case in endOf', () => {
    const time = new Date(2023, 0, 1).getTime()
    const endOf = dateAdapter.endOf(time, 'invalid-unit')

    expect(endOf).toBe(time)
  })

  it('should handle isoWeek in startOf', () => {
    const time = new Date(2023, 0, 4).getTime() // Wednesday
    const startOfIsoWeek = dateAdapter.startOf(time, 'isoWeek')
    const startOfIsoWeekDate = new Date(startOfIsoWeek)

    expect(startOfIsoWeekDate.getDay()).toBe(1) // Monday
  })

  it('should handle isoWeek in endOf', () => {
    const time = new Date(2023, 0, 4).getTime() // Wednesday
    const endOfIsoWeek = dateAdapter.endOf(time, 'isoWeek')
    const endOfIsoWeekDate = new Date(endOfIsoWeek)

    expect(endOfIsoWeekDate.getDay()).toBe(0) // Sunday
  })

  it('should format date correctly in en-US locale', () => {
    const time = new Date(2023, 0, 1).getTime()
    const format = { year: 'numeric', month: 'short', day: 'numeric' }
    const formattedDate = dateAdapter.format(time, format)

    expect(formattedDate).toBe('Jan 1, 2023')
  })

  it('should format date correctly in fr-FR locale', () => {
    const time = new Date(2023, 0, 1).getTime()
    const format = { year: 'numeric', month: 'short', day: 'numeric' }

    dateAdapter.options = { locale: 'fr-FR' }

    const formattedDate = dateAdapter.format(time, format)

    expect(formattedDate).toBe('1 janv. 2023')
  })

  it('should format date correctly in de-DE locale', () => {
    const time = new Date(2023, 0, 1).getTime()
    const format = { year: 'numeric', month: 'short', day: 'numeric' }

    dateAdapter.options = { locale: 'de-DE' }

    const formattedDate = dateAdapter.format(time, format)

    expect(formattedDate).toBe('1. Jan. 2023')
  })
})
