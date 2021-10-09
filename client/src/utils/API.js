// http://api.voicerss.org/?key=1234567890QWERTY&hl=en-us&src=Hello, world!



export const textToSpeech = (query) => {
  return fetch(`https://api.voicerss.org/?key=${process.env.API_KEY}&hl=en-us&src=${query}`)
}