import Bowser from 'bowser'

export const SUPPORTED_BROWSERS = {
  // Material-ui compatibility https://material-ui.com/getting-started/supported-platforms/
  windows: {
    'internet explorer': '>=11',
    edge: '>=14',
  },
  macos: {
    safari: '>=10',
  },
  mobile: {
    safari: '>=10',
  },
  chrome: '>=49',
  firefox: '>=52',
}

export const browser = Bowser.getParser(window.navigator.userAgent)
