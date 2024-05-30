import styles from './css/Header.module.css'
import Registration from './components/Registration'
import MyProfileLink from './components/MyProfileLink'
import { FC } from 'react'
const Header: FC = () => {
  return (
    <header className={`${styles.header} flex`}>
        <img src="src\img\logo.svg" alt="ANTI FISHERMAN FISHERMAN CLUB" />
        <MyProfileLink />
        <Registration />
    </header>
  )
}

export default Header