import { FC } from 'react'
import useLocalStorage from '../types/UseLocalStorage'
import styles from '../css/Header.module.css'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'

const Registration: FC = () => {

  const navigate = useNavigate()

  const [, setToken] = useLocalStorage("token")

    
  return (
    <button onClick={() => {
      setToken({token:"", id: 0})
      navigate('/reg')
    }} className={clsx('btn-reset btn', styles['header-btn'])}>Выход</button>
  )
}

export default Registration