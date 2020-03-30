export const truncateString = (str, num) => {
  if (str.length <= num) {
    return str
  }
  return str.trim().slice(0, num) + '...'
}
