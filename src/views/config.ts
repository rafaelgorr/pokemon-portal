const config = await fetch('./config.json').then((res) => res.json())
export default config
