import Bowser from 'bowser'
import cn from 'classnames'
import React from 'react'

import styles from './styles.scss'
import { SUPPORTED_BROWSERS } from '../../constants/browsers'

export const lightFormatDateFormat = "yyyy-MM-dd'T'hh:mm:ss"

const browser = Bowser.getParser(window.navigator.userAgent)

interface Props {}

const chrome = SUPPORTED_BROWSERS['chrome'].replace(/(>=)/g, '') + '+'
const firefox = SUPPORTED_BROWSERS['firefox'].replace(/(>=)/g, '') + '+'
const edge = SUPPORTED_BROWSERS['windows']['edge'].replace(/(>=)/g, '') + '+'
const safari = SUPPORTED_BROWSERS['macos']['safari'].replace(/(>=)/g, '') + '+'

const BrowserIncompatible = (props: Props) => {
  return (
    <div className={styles.page}>
      <i className={cn('fas fa-exclamation-circle', styles.titleIcon)} />
      <h1 className={styles.title}>Navegador não suportado</h1>
      <p className={styles.subTitle}>
        {`Você está usando o ${browser.getBrowserName()} na versão ${browser.getBrowserVersion()}`}
      </p>
      <p className={styles.subTitle}>
        É recomendado utilizar o Autopop em um dos seguintes navegadores:
      </p>
      <div className={styles.browserList}>
        <a target="#" className={styles.anchorBrowser} href="https://www.google.com/chrome/">
          <i className={cn('fab fa-chrome', styles.icon)} />
          Chrome {chrome}
        </a>
        <a
          target="#"
          className={styles.anchorBrowser}
          href="https://www.mozilla.org/en-US/firefox/new/"
        >
          <i className={cn('fab fa-firefox-browser', styles.icon)} />
          Firefox {firefox}
        </a>
        <a target="#" className={styles.anchorBrowser} href="https://www.microsoft.com/en-us/edge">
          <i className={cn('fab fa-edge', styles.icon)} />
          Edge {edge}
        </a>
        <a
          target="#"
          className={styles.anchorBrowser}
          href="https://support.apple.com/downloads/safari"
        >
          <i className={cn('fab fa-safari', styles.icon)} />
          Safari {safari}
        </a>
      </div>
    </div>
  )
}

export default BrowserIncompatible
