import React from 'react'
import styles from './Footer.module.css'
import Image from 'next/image'
//Icons
import { FaFacebook, FaInstagram } from 'react-icons/fa'
import { MdOutlineMail } from 'react-icons/md'

const Footer = () => {
  return (
    <div className={styles.footerWrapper}>
      <div className={styles.socials}>
        <a href="https://www.facebook.com/Bitingrattan" target="_blank">
          <FaFacebook size="2rem" />
        </a>
        <a href="https://www.instagram.com/bitingrattan/" target="_blank">
          <FaInstagram size="2rem" />
        </a>
        <a href="mailto:bitingrattanstickfighting@gmail.com">
          <MdOutlineMail size="2rem" />
        </a>
      </div>

      <div className={styles.logoContainer}>
        <Image
          src="/biting-rattan-logo.png"
          alt="biting rattan logo"
          // width="0"
          // height="0"
          // sizes="100vw"
          // style={{ width: '100%', height: 'auto' }}
          fill
        />
      </div>

      <div className={styles.copyRightContainer}>
        <p>&copy; Biting Rattan FC</p>
      </div>
    </div>
  )
}

export default Footer
