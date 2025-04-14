import type { DateAdapter } from 'chart.js'
import type { AdapterOptions } from '../src/index'

import { describe, it, test, expect } from 'vitest'
import {
  _adapters,
} from 'chart.js'
import '../src/index'

let dateAdapter: DateAdapter<AdapterOptions> = new _adapters._date({})
const formats = dateAdapter.formats()

describe('Date Adapter', () => {
  describe('parse', () => {
    test('should parse date correctly', () => {
      const timestamp = dateAdapter.parse('2023-01-01T00:00:00Z')!
      expect(timestamp).toBe(new Date('2023-01-01T00:00:00Z').getTime())
    })

    test('should parse number date correctly', () => {
      const timestamp = dateAdapter.parse(1_672_531_200_000)!
      expect(timestamp).toBe(1_672_531_200_000)
    })

    test('should parse date object correctly', () => {
      const timestamp = dateAdapter.parse(new Date('2023-01-01T00:00:00Z'))!
      expect(timestamp).toBe(1_672_531_200_000)
    })

    test('should return null for invalid date strings', () => {
      const timestamp = dateAdapter.parse('invalid-date')
      expect(timestamp).toBeNull()
    })

    test('should handle null and undefined values in parse', () => {
      expect(dateAdapter.parse(null)).toBeNull()
      expect(dateAdapter.parse(undefined)).toBeNull()
    })

    test('should handle invalid date in parse', () => {
      expect(dateAdapter.parse('invalid')).toBeNull()
    })

    test('should handle invalid date in parse', () => {
      expect(dateAdapter.parse([])).toBeNull()
    })
  })

  describe('formats', () => {
    test('should format year correctly', () => {
      const timestamp = dateAdapter.parse('2023-01-01T00:00:00Z')!
      expect(dateAdapter.format(timestamp, formats.year as any)).toEqual('2023')
    })

    test('should format quarter correctly', () => {
      const timestamp = dateAdapter.parse('2023-01-01T00:00:00Z')!
      expect(dateAdapter.format(timestamp, formats.quarter as any)).toEqual('Q1 - 2023')
    })

    test('should format month correctly', () => {
      const timestamp = dateAdapter.parse('2023-01-01T00:00:00Z')!
      expect(dateAdapter.format(timestamp, formats.month as any)).toEqual('Jan 2023')
    })

    test('should format week correctly', () => {
      const timestamp = dateAdapter.parse('2023-01-01T00:00:00Z')!
      expect(dateAdapter.format(timestamp, formats.week as any)).toEqual('Jan 1')
    })

    test('should format day correctly', () => {
      const timestamp = dateAdapter.parse('2023-01-01T00:00:00Z')!
      expect(dateAdapter.format(timestamp, formats.day as any)).toEqual('Jan 1')
    })

    test('should format hour correctly', () => {
      const timestamp = dateAdapter.parse('2023-01-01T00:00:00Z')!
      expect(dateAdapter.format(timestamp, formats.hour as any)).toEqual('12 AM')
    })

    test('should format minute correctly', () => {
      const timestamp = dateAdapter.parse('2023-01-01T00:00:00Z')!
      expect(dateAdapter.format(timestamp, formats.minute as any)).toEqual('12:00 AM')
    })

    test('should format second correctly', () => {
      const timestamp = dateAdapter.parse('2023-01-01T00:00:00Z')!
      expect(dateAdapter.format(timestamp, formats.second as any)).toEqual('12:00:00 AM')
    });

    test('should format millisecond correctly', () => {
      const timestamp = dateAdapter.parse('2023-01-01T00:00:00Z')!
      expect(dateAdapter.format(timestamp, formats.millisecond as any)).toEqual('12:00:00.000 AM')
    });

    test('should format datetime correctly', () => {
      const timestamp = dateAdapter.parse('2023-01-01T00:00:00Z')!
      expect(dateAdapter.format(timestamp, formats.datetime as any)).toEqual('Jan 1, 2023, 12:00:00 AM')
    });
  })

  describe('add', () => {
    test('should add default correctly', () => {
      const timestamp = dateAdapter.parse('2023-01-01T00:00:00Z')!
      // @ts-ignore
      const newTimestamp = dateAdapter.add(timestamp, 1, 'default')
      expect(newTimestamp).toBe(timestamp)
    })

    test('should add year correctly', () => {
      const timestamp = dateAdapter.parse('2023-01-01T00:00:00Z')!
      const newTimestamp = dateAdapter.add(timestamp, 1, 'year')
      expect(dateAdapter.format(newTimestamp, formats.year as any)).toEqual('2024')
    })

    test('should add quarter correctly', () => {
      const timestamp = dateAdapter.parse('2023-01-01T00:00:00Z')!
      const newTimestamp = dateAdapter.add(timestamp, 1, 'quarter')
      expect(dateAdapter.format(newTimestamp, formats.quarter as any)).toEqual('Q2 - 2023')
    })

    test('should add month correctly', () => {
      const timestamp = dateAdapter.parse('2023-01-01T00:00:00Z')!
      const newTimestamp = dateAdapter.add(timestamp, 1, 'month')
      expect(dateAdapter.format(newTimestamp, formats.month as any)).toEqual('Feb 2023')
    })

    test('should add week correctly', () => {
      const timestamp = dateAdapter.parse('2023-01-01T00:00:00Z')!
      const newTimestamp = dateAdapter.add(timestamp, 1, 'week')
      expect(dateAdapter.format(newTimestamp, formats.week as any)).toEqual('Jan 8')
    })

    test('should add day correctly', () => {
      const timestamp = dateAdapter.parse('2023-01-01T00:00:00Z')!
      const newTimestamp = dateAdapter.add(timestamp, 1, 'day')
      expect(dateAdapter.format(newTimestamp, formats.day as any)).toEqual('Jan 2')
    })

    test('should add hour correctly', () => {
      const timestamp = dateAdapter.parse('2023-01-01T00:00:00Z')!
      const newTimestamp = dateAdapter.add(timestamp, 1, 'hour')
      expect(dateAdapter.format(newTimestamp, formats.hour as any)).toEqual('1 AM')
    })

    test('should add minute correctly', () => {
      const timestamp = dateAdapter.parse('2023-01-01T00:00:00Z')!
      const newTimestamp = dateAdapter.add(timestamp, 1, 'minute')
      expect(dateAdapter.format(newTimestamp, formats.minute as any)).toEqual('12:01 AM')
    })

    test('should add second correctly', () => {
      const timestamp = dateAdapter.parse('2023-01-01T00:00:00Z')!
      const newTimestamp = dateAdapter.add(timestamp, 1, 'second')
      expect(dateAdapter.format(newTimestamp, formats.second as any)).toEqual('12:00:01 AM')
    });

    test('should add millisecond correctly', () => {
      const timestamp = dateAdapter.parse('2023-01-01T00:00:00Z')!
      const newTimestamp = dateAdapter.add(timestamp, 1, 'millisecond')
      expect(dateAdapter.format(newTimestamp, formats.millisecond as any)).toEqual('12:00:00.001 AM')
    })
  })

  describe('diff', () => {
    test('should diff two dates correctly', () => {
      const timestamp1 = dateAdapter.parse('2023-01-01T00:00:00Z')!
      const timestamp2 = dateAdapter.parse('2023-01-01T00:00:01Z')!
      // @ts-ignore
      expect(dateAdapter.diff(timestamp2, timestamp1, 'default')).toEqual(1000)
    })

    test('should diff year correctly', () => {
      const timestamp1 = dateAdapter.parse('2023-01-01T00:00:00Z')!
      const timestamp2 = dateAdapter.parse('2024-01-01T00:00:00Z')!
      expect(dateAdapter.diff(timestamp2, timestamp1, 'year')).toEqual(1)
    })

    test('should diff quarter correctly', () => {
      const timestamp1 = dateAdapter.parse('2023-01-01T00:00:00Z')!
      const timestamp2 = dateAdapter.parse('2023-04-01T00:00:00Z')!
      expect(dateAdapter.diff(timestamp2, timestamp1, 'quarter')).toEqual(1)
    })

    test('should diff month correctly', () => {
      const timestamp1 = dateAdapter.parse('2023-01-01T00:00:00Z')!
      const timestamp2 = dateAdapter.parse('2023-02-01T00:00:00Z')!
      expect(dateAdapter.diff(timestamp2, timestamp1, 'month')).toEqual(1)
    })

    test('should diff week correctly', () => {
      const timestamp1 = dateAdapter.parse('2023-01-01T00:00:00Z')!
      const timestamp2 = dateAdapter.parse('2023-01-08T00:00:00Z')!
      expect(dateAdapter.diff(timestamp2, timestamp1, 'week')).toEqual(1)
    })

    test('should diff day correctly', () => {
      const timestamp1 = dateAdapter.parse('2023-01-01T00:00:00Z')!
      const timestamp2 = dateAdapter.parse('2023-01-02T00:00:00Z')!
      expect(dateAdapter.diff(timestamp2, timestamp1, 'day')).toEqual(1)
    })

    test('should diff hour correctly', () => {
      const timestamp1 = dateAdapter.parse('2023-01-01T00:00:00Z')!
      const timestamp2 = dateAdapter.parse('2023-01-01T01:00:00Z')!
      expect(dateAdapter.diff(timestamp2, timestamp1, 'hour')).toEqual(1)
    })

    test('should diff minute correctly', () => {
      const timestamp1 = dateAdapter.parse('2023-01-01T00:00:00Z')!
      const timestamp2 = dateAdapter.parse('2023-01-01T00:01:00Z')!
      expect(dateAdapter.diff(timestamp2, timestamp1, 'minute')).toEqual(1)
    })

    test('should diff second correctly', () => {
      const timestamp1 = dateAdapter.parse('2023-01-01T00:00:00Z')!
      const timestamp2 = dateAdapter.parse('2023-01-01T00:00:01Z')!
      expect(dateAdapter.diff(timestamp2, timestamp1, 'second')).toEqual(1)
    })

    test('should diff millisecond correctly', () => {
      const timestamp1 = dateAdapter.parse('2023-01-01T00:00:00Z')!
      const timestamp2 = dateAdapter.parse('2023-01-01T00:00:00.001Z')!
      expect(dateAdapter.diff(timestamp2, timestamp1, 'millisecond')).toEqual(1)
    })
  })

  describe('startOf', () => {
    test('startOf default', () => {
      const timestamp = dateAdapter.parse('2023-01-01T00:00:00Z')!
      // @ts-ignore
      const newTimestamp = dateAdapter.startOf(timestamp, 'default')
      expect(newTimestamp).toBe(timestamp)
    })

    test('startOf year', () => {
      const timestamp = dateAdapter.parse('2023-01-01T00:00:00Z')!
      const newTimestamp = dateAdapter.startOf(timestamp, 'year')
      expect(dateAdapter.format(newTimestamp, formats.year as any)).toEqual('2023')
    })

    test('startOf quarter', () => {
      const timestamp = dateAdapter.parse('2023-01-01T00:00:00Z')!
      const newTimestamp = dateAdapter.startOf(timestamp, 'quarter')
      expect(dateAdapter.format(newTimestamp, formats.quarter as any)).toEqual('Q1 - 2023')
    })

    test('startOf month', () => {
      const timestamp = dateAdapter.parse('2023-01-01T00:00:00Z')!
      const newTimestamp = dateAdapter.startOf(timestamp, 'month')
      expect(dateAdapter.format(newTimestamp, formats.day as any)).toEqual('Jan 1')
    })

    test('startOf week', () => {
      const timestamp = dateAdapter.parse('2023-01-01T00:00:00Z')!
      const newTimestamp = dateAdapter.startOf(timestamp, 'week')
      expect(dateAdapter.format(newTimestamp, formats.week as any)).toEqual('Jan 1')
    })

    test('startOf isoWeek', () => {
      const timestamp = dateAdapter.parse('2023-01-01T00:00:00Z')!
      const newTimestamp = dateAdapter.startOf(timestamp, 'isoWeek')
      expect(dateAdapter.format(newTimestamp, formats.week as any)).toEqual('Dec 26')
    })

    test('startOf day', () => {
      const timestamp = dateAdapter.parse('2023-01-01T00:00:00Z')!
      const newTimestamp = dateAdapter.startOf(timestamp, 'day')
      expect(dateAdapter.format(newTimestamp, formats.day as any)).toEqual('Jan 1')
    })

    test('startOf hour', () => {
      const timestamp = dateAdapter.parse('2023-01-01T12:30:00Z')!
      const newTimestamp = dateAdapter.startOf(timestamp, 'hour')
      expect(dateAdapter.format(newTimestamp, formats.hour as any)).toEqual('12 PM')
    })

    test('startOf minute', () => {
      const timestamp = dateAdapter.parse('2023-01-01T12:30:00Z')!
      const newTimestamp = dateAdapter.startOf(timestamp, 'minute')
      expect(dateAdapter.format(newTimestamp, formats.minute as any)).toEqual('12:30 PM')
    })

    test('startOf second', () => {
      const timestamp = dateAdapter.parse('2023-01-01T12:30:30Z')!
      const newTimestamp = dateAdapter.startOf(timestamp, 'second')
      expect(dateAdapter.format(newTimestamp, formats.second as any)).toEqual('12:30:30 PM')
    })

    test('startOf millisecond', () => {
      const timestamp = dateAdapter.parse('2023-01-01T12:30:30.500Z')!
      const newTimestamp = dateAdapter.startOf(timestamp, 'millisecond')
      expect(dateAdapter.format(newTimestamp, formats.millisecond as any)).toEqual('12:30:30.500 PM')
    })
  })

  describe('endOf', () => {
    test('endOf default', () => {
      const timestamp = dateAdapter.parse('2023-01-01T00:00:00Z')!
      // @ts-ignore
      const newTimestamp = dateAdapter.endOf(timestamp, 'default')
      expect(newTimestamp).toBe(timestamp)
    })

    test('endOf year correctly', () => {
      const timestamp = dateAdapter.parse('2023-01-01T00:00:00Z')!
      const newTimestamp = dateAdapter.endOf(timestamp, 'year')
      expect(dateAdapter.format(newTimestamp, formats.year as any)).toEqual('2023')
    })

    test('endOf quarter correctly', () => {
      const timestamp = dateAdapter.parse('2023-01-01T00:00:00Z')!
      const newTimestamp = dateAdapter.endOf(timestamp, 'quarter')
      expect(dateAdapter.format(newTimestamp, formats.quarter as any)).toEqual('Q1 - 2023')
    })

    test('endOf month correctly', () => {
      const timestamp = dateAdapter.parse('2023-01-01T00:00:00Z')!
      const newTimestamp = dateAdapter.endOf(timestamp, 'month')
      expect(dateAdapter.format(newTimestamp, formats.month as any)).toEqual('Jan 2023')
    })

    test('endOf week correctly', () => {
      const timestamp = dateAdapter.parse('2023-01-01T00:00:00Z')!
      const newTimestamp = dateAdapter.endOf(timestamp, 'week')
      expect(dateAdapter.format(newTimestamp, formats.week as any)).toEqual('Jan 7')
    })

    test('endOf isoWeek correctly', () => {
      const timestamp = dateAdapter.parse('2023-01-01T00:00:00Z')!
      const newTimestamp = dateAdapter.endOf(timestamp, 'isoWeek')
      expect(dateAdapter.format(newTimestamp, formats.week as any)).toEqual('Jan 1')
    })

    test('endOf day correctly', () => {
      const timestamp = dateAdapter.parse('2023-01-01T00:00:00Z')!
      const newTimestamp = dateAdapter.endOf(timestamp, 'day')
      expect(dateAdapter.format(newTimestamp, formats.day as any)).toEqual('Jan 1')
    })

    test('endOf hour correctly', () => {
      const timestamp = dateAdapter.parse('2023-01-01T12:30:00Z')!
      const newTimestamp = dateAdapter.endOf(timestamp, 'hour')
      expect(dateAdapter.format(newTimestamp, formats.hour as any)).toEqual('12 PM')
    })

    test('endOf minute correctly', () => {
      const timestamp = dateAdapter.parse('2023-01-01T12:30:00Z')!
      const newTimestamp = dateAdapter.endOf(timestamp, 'minute')
      expect(dateAdapter.format(newTimestamp, formats.minute as any)).toEqual('12:30 PM')
    })

    test('endOf second correctly', () => {
      const timestamp = dateAdapter.parse('2023-01-01T12:30:30Z')!
      const newTimestamp = dateAdapter.endOf(timestamp, 'second')
      expect(dateAdapter.format(newTimestamp, formats.second as any)).toEqual('12:30:30 PM')
    })

    test('should endOf millisecond correctly', () => {
      const timestamp = dateAdapter.parse('2023-01-01T12:30:30Z')!
      const newTimestamp = dateAdapter.endOf(timestamp, 'millisecond')
      expect(dateAdapter.format(newTimestamp, formats.millisecond as any)).toEqual('12:30:30.001 PM')
    })
  })

  describe('locales', () => {
    it('should format date correctly in en-US locale', () => {
      const time = new Date(2023, 0, 1).getTime()
      const formattedDate = dateAdapter.format(time, formats.datetime as any)

      expect(formattedDate).toBe('Jan 1, 2023, 8:00:00 AM')
    })

    it('should format date correctly in fr-FR locale', () => {
      const time = new Date(2023, 0, 1).getTime()

      dateAdapter = new _adapters._date({
        locale: 'fr-FR'
      })

      const formattedDate = dateAdapter.format(time, formats.datetime as any)

      expect(formattedDate).toBe('1 janv. 2023, 08:00:00')
    })

    it('should format date correctly in de-DE locale', () => {
      const time = new Date(2023, 0, 1).getTime()

      dateAdapter = new _adapters._date({
        locale: 'de-DE'
      })

      const formattedDate = dateAdapter.format(time, formats.datetime as any)

      expect(formattedDate).toBe('1. Jan. 2023, 08:00:00')
    })
  })
})
