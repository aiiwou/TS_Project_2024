import { useState, FC } from 'react'
import { IUser } from './types/User'
import clsx from 'clsx'
import styles from './css/Modal.module.css'
import inputStyles from './css/RegChangeInputs.module.css'
import axios from 'axios'


type modalProps = {
  user: IUser,
  open: boolean,
  close: () => void,
  updateRenderedUser: React.Dispatch<React.SetStateAction<IUser | undefined>>,

}

const Modal: FC<modalProps> = (props) => {

  const { user, open, close, updateRenderedUser, } = props

  const [changedUser, setChangedUser] = useState<IUser>(user)


  const updateUser = (name: keyof IUser, value: string) => {
  
    setChangedUser({ ...changedUser, [name]: value })
  }

  const patchUser = () => {
    axios.patch<IUser>(`https://reqres.in/api/users/${changedUser.id}`, { ...changedUser }, { headers: { 'Content-Type': 'application/json' } })
      .then(res => console.log(res.data)).catch(error => console.error(error));
  }

  const applyChanges = () => {
    
    const isntEmpty = Object.values({...changedUser, avatar: "заглушка"}).every(el => !!el)
    if (isntEmpty) {
      patchUser()
      updateRenderedUser(changedUser)
      close()
    } else {
      alert("Недопустимые значения")
    }
  }


  return (
    <div onClick={() => {
      close()
      setChangedUser(user)
    }}
      className={clsx(styles.modal_container, open && styles.open)}
    >
      <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
        <p>Заполните то, что хотите изменить</p>
        <input
          className={inputStyles["inputs-search"]}
          onChange={(e) => updateUser('first_name', e.target.value)}
          value={changedUser.first_name} type="text" placeholder='Имя' required />
        <input
          className={inputStyles["inputs-search"]}
          onChange={(e) => updateUser('last_name', e.target.value)}
          value={changedUser.last_name} type="text" placeholder='Фамилия' required />
        <input
          className={inputStyles["inputs-search"]}
          onChange={(e) => updateUser('email', e.target.value)}
          value={changedUser.email} type="mail" placeholder='Email' required />
        <input
          className={inputStyles["inputs-search"]}
          onChange={(e) => updateUser('avatar', e.target.value)}
          value={changedUser.avatar} type="text" placeholder='Ссылка на аватарку' required />
        <button onClick={applyChanges}>Изменить</button>
      </div>
    </div>

  )
}

export default Modal