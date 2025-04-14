import type { TimeUnit } from 'chart.js'

import { _adapters } from 'chart.js'

export interface AdapterOptions {
  locale?: string
  timeZone?: string
}

const FORMAT_OPTIONS: Record<
  string,
  Intl.DateTimeFormatOptions & { fractionalSecondDigits?: number }
> = {
  datetime: { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' },
  millisecond: { hour: 'numeric', minute: 'numeric', second: 'numeric', fractionalSecondDigits: 3 },
  second: { hour: 'numeric', minute: 'numeric', second: 'numeric' },
  minute: { hour: 'numeric', minute: 'numeric' },
  hour: { hour: 'numeric' },
  day: { month: 'short', day: 'numeric' },
  week: { month: 'short', day: 'numeric' },
  month: { year: 'numeric', month: 'short' },
  quarter: { year: 'numeric', month: 'short' },
  year: { year: 'numeric' }
}

const FORMATS = {
  datetime: 'datetime',
  millisecond: 'millisecond',
  second: 'second',
  minute: 'minute',
  hour: 'hour',
  day: 'day',
  week: 'week',
  month: 'month',
  quarter: 'quarter',
  year: 'year',
}

_adapters._date.override<AdapterOptions>({
  formats: () => FORMATS,
  parse: function (value: unknown, _format?: TimeUnit): number | null {
    if (value === null || value === undefined) {
      return null
    }

    if (value instanceof Date) {
      return value.getTime()
    }

    if (typeof value === 'string' || typeof value === 'number') {
      const date = new Date(value)
      return Number.isNaN(date.getTime()) ? null : date.getTime()
    }

    return null
  },
  format: function (timestamp: number, format: TimeUnit): string {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const locale = this.options?.locale || 'en-US'

    const date = new Date(timestamp)
    const localTimestamp = date.getTime() + date.getTimezoneOffset() * (60 * 100 * 10)

    if (format === FORMATS.quarter) {
      const month = date.getUTCMonth()
      const quarter = Math.floor(month / 3) + 1
      const year = new Intl.DateTimeFormat(locale, { year: 'numeric', timeZone }).format(localTimestamp)

      return `Q${quarter} - ${year}`
    }

    return new Intl.DateTimeFormat(locale, {
      ...FORMAT_OPTIONS[format],
      timeZone
    }).format(localTimestamp)
  },
  add: function (time: number, amount: number, unit: string) {
    const locale = this.options?.locale || 'en-US'
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const date = new Date(time)

    const localDate = new Date(date.toLocaleString(locale, { timeZone }))

    switch (unit) {
      case 'millisecond': {
        localDate.setMilliseconds(localDate.getMilliseconds() + amount)
        break
      }
      case 'second': {
        localDate.setSeconds(localDate.getSeconds() + amount)
        break
      }
      case 'minute': {
        localDate.setMinutes(localDate.getMinutes() + amount)
        break
      }
      case 'hour': {
        localDate.setHours(localDate.getHours() + amount)
        break
      }
      case 'day': {
        localDate.setDate(localDate.getDate() + amount)
        break
      }
      case 'week': {
        localDate.setDate(localDate.getDate() + amount * 7)
        break
      }
      case 'month': {
        localDate.setMonth(localDate.getMonth() + amount)
        break
      }
      case 'quarter': {
        localDate.setUTCMonth(localDate.getUTCMonth() + amount * 3)
        break
      }
      case 'year': {
        localDate.setFullYear(localDate.getFullYear() + amount)
        break
      }
      default: {
        return time
      }
    }

    return localDate.getTime()
  },
  diff: function (max: number, min: number, unit: TimeUnit) {
    const dateMax = new Date(max)
    const dateMin = new Date(min)
    const diff = dateMax.getTime() - dateMin.getTime()

    switch (unit) {
      case 'millisecond': {
        return diff
      }
      case 'second': {
        return diff / 1000
      }
      case 'minute': {
        return diff / (1000 * 60)
      }
      case 'hour': {
        return diff / (1000 * 60 * 60)
      }
      case 'day': {
        return diff / (1000 * 60 * 60 * 24)
      }
      case 'week': {
        return diff / (1000 * 60 * 60 * 24 * 7)
      }
      case 'month': {
        return (dateMax.getFullYear() - dateMin.getFullYear()) * 12 + (dateMax.getMonth() - dateMin.getMonth())
      }
      case 'quarter': {
        return (dateMax.getFullYear() - dateMin.getFullYear()) * 4 + Math.floor(dateMax.getMonth() / 3) - Math.floor(dateMin.getMonth() / 3)
      }
      case 'year': {
        return dateMax.getFullYear() - dateMin.getFullYear()
      }
      default: {
        return diff
      }
    }
  },
  startOf: function (time: number, unit: TimeUnit | 'isoWeek'): number {
    const locale = this.options?.locale || 'en-US'
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const date = new Date(time)

    const localDate = new Date(date.toLocaleString(locale, { timeZone }))

    switch (unit) {
      case 'millisecond': {
        return time
      }
      case 'second': {
        localDate.setMilliseconds(0)
        break;
      }
      case 'minute': {
        localDate.setSeconds(0, 0)
        break;
      }
      case 'hour': {
        localDate.setMinutes(0, 0, 0)
        break;
      }
      case 'day': {
        localDate.setUTCHours(0, 0, 0, 0)
        break
      }
      case 'week': {
        const day = date.getUTCDay()
        const diff = date.getUTCDate() - day + (day === 0 ? -6 : 1)
        date.setUTCDate(diff)
        date.setUTCHours(0, 0, 0, 0)
        break
      }
      case 'isoWeek': {
        const day = localDate.getUTCDay()
        const diff = localDate.getUTCDate() - (day === 0 ? 6 : day - 1)
        localDate.setUTCDate(diff)
        localDate.setUTCHours(0, 0, 0, 0)
        break
      }
      case 'month': {
        localDate.setUTCDate(1)
        localDate.setUTCHours(0, 0, 0, 0)
        break
      }
      case 'quarter': {
        const month = localDate.getUTCMonth()
        const quarterStartMonth = month - (month % 3)
        localDate.setUTCMonth(quarterStartMonth, 1)
        localDate.setUTCHours(0, 0, 0, 0)
        break
      }
      case 'year': {
        localDate.setUTCMonth(0, 1)
        localDate.setUTCHours(0, 0, 0, 0)
        break
      }
      default: {
        return time
      }
    }

    return localDate.getTime()
  },
  endOf: function (time: number, unit: TimeUnit | 'isoWeek') {
    const locale = this.options?.locale || 'en-US'
    const timeZone = this.options.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone
    const date = new Date(time)

    const localDate = new Date(date.toLocaleString(locale, { timeZone }))

    switch (unit) {
      case 'millisecond': {
        localDate.setMilliseconds(localDate.getMilliseconds() + 1)
        break
      }
      case 'second': {
        localDate.setMilliseconds(999)
        break
      }
      case 'minute': {
        localDate.setSeconds(59, 999)
        break
      }
      case 'hour': {
        localDate.setMinutes(59, 59, 999)
        break
      }
      case 'day': {
        localDate.setHours(23, 59, 59, 999)
        break
      }
      case 'week': {
        const day = localDate.getUTCDay()
        const diff = 6 - day
        localDate.setUTCDate(localDate.getUTCDate() + diff)
        localDate.setUTCHours(23, 59, 59, 999)
        break;
      }
      case 'isoWeek': {
        const isoDay = localDate.getUTCDay()
        const isoDiff = 6 - (isoDay === 0 ? 6 : isoDay - 1)
        localDate.setUTCDate(localDate.getUTCDate() + isoDiff)
        localDate.setUTCHours(23, 59, 59, 999)
        break
      }
      case 'month': {
        localDate.setUTCMonth(localDate.getUTCMonth() + 1, 0)
        localDate.setUTCHours(23, 59, 59, 999)
        break
      }
      case 'quarter': {
        const month = localDate.getUTCMonth();
        const quarterEndMonth = month - (month % 3) + 2
        localDate.setUTCMonth(quarterEndMonth + 1, 0)
        localDate.setUTCHours(23, 59, 59, 999)
        break
      }
      case 'year': {
        localDate.setUTCMonth(11, 31)
        localDate.setUTCHours(23, 59, 59, 999)
        break
      }
      default: {
        return time
      }
    }

    return localDate.getTime()
  }
})
