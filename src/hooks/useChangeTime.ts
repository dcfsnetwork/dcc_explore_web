import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'

const thresholds = [
  { l: 's', r: 1 },
  { l: 'ss', r: 59, d: 'second' },
  { l: 'm', r: 1 },
  { l: 'mm', r: 59, d: 'minute' },
  { l: 'h', r: 1 },
  { l: 'hh', r: 23, d: 'hour' },
  { l: 'd', r: 1 },
  { l: 'dd', r: 29, d: 'day' },
  { l: 'M', r: 1 },
  { l: 'MM', r: 11, d: 'month' },
  { l: 'y' },
  { l: 'yy', d: 'year' }
]
const config = {
  thresholds
}

dayjs.extend(relativeTime, config)
dayjs.extend(updateLocale)
dayjs.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'a few seconds',
    ss: '%d secs',
    m: '1 min',
    mm: '%d mins',
    h: '1 hour',
    hh: '%d hours',
    d: '1 day',
    dd: '%d days',
    M: '1 month',
    MM: '%d months',
    y: '1 year',
    yy: '%d years',
    Y: '1 year',
    YY: '%d years'
  }
})

export default function ChangeTime(time: any) {
  const h = 60 * 60 * 8
  const ago = dayjs(time * 1000).fromNow()
  const utc = dayjs((time - h) * 1000).format('MMM-DD-YYYY hh:mm:ss A[+UTC]')
  const md = dayjs((time - h) * 1000).format('MMMDD')
  return { ago, utc, md }
}
