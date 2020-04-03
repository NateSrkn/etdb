export const truncateString = (str, num) => {
  if (str.length <= num) {
    return str
  }
  return str.trim().slice(0, num) + '...'
}

export const ratingPercent = (num) => {
  return Math.round((num/10)*100) + '%'
}