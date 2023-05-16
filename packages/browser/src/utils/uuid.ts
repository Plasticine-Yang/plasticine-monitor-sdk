export function generateUUID() {
  let now = new Date().getTime()

  // use high-precision timer if available
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    now += performance.now()
  }

  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    const randomNumber = (now + Math.random() * 16) % 16 | 0
    now = Math.floor(now / 16)

    return (char === 'x' ? randomNumber : (randomNumber & 0x3) | 0x8).toString(16)
  })

  return uuid
}
