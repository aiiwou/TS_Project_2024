import { FC } from 'react'
import { Link} from 'react-router-dom'
import useLocalStorage from '../types/UseLocalStorage'

const MyProfileLink: FC = () => {
    const [auth,] = useLocalStorage("token")

  return (
    <Link to={`/${auth.id}`}>Мой профиль</Link>
  )
}

export default MyProfileLink