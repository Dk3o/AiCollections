import React from 'react'
import styles from "../styles/components/Banners.module.scss";

export function SpecialOfferBanner({text, linkText, linkUrl = "#"}) {
  return (
    <div className={styles.specialOfferBanner}>
        {text} <a href={linkUrl}>{linkText}</a>
    </div>
  )
}
