const timeDisplay = value => {
  let date = new Date(value)
  let hours = date.getHours()
  let minutes = date.getMinutes()

  hours = hours < 10 ? '0' + hours : hours
  minutes = minutes < 10 ? '0' + minutes : minutes

  return `${hours}:${minutes}, ${date.toLocaleDateString()}` || '-'
}

const minutesDisplaying = secs => {
  const mins = Math.floor(secs / 60)
  secs %= 60

  return (mins < 10 ? '0' : '') + mins + ':' + (secs < 10 ? '0' : '') + secs
}

const dateDisplay = value => {
  const now = new Date()
  const date = new Date(value ? value : now)

  return `${date.toLocaleDateString()}`
}

export { dateDisplay, minutesDisplaying, timeDisplay }
