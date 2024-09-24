import React from 'react'
import styles from './footer.module.css'
import { useLocation } from 'react-router-dom'

export default function Footer() {

  const location = useLocation()

  return (
    <footer className={styles.footer}>
      footer
    </footer >
  )
}