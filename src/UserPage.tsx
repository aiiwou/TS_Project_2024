import { useEffect, useState, FC } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IUser } from './types/User'
import styles from './css/UserPage.module.css'
import axios from 'axios'
import Modal from './Modal'
import clsx from 'clsx'
import useLocalStorage from './types/UseLocalStorage'
import { defaultAvatarURL } from './assets/defaultAvatar'

const UserPage: FC = () => {

    useEffect(() => {
        const [token,] = useLocalStorage("token")
        const data = token.token
        if (!data) {
            navigate('/reg')
        }
    }, [])

    const [open, setOpen] = useState(false)
    const { id } = useParams()
    const [user, setUser] = useState<IUser>()
    const close = () => setOpen(false)
    const [registredUsers,] = useLocalStorage("registredUsers")

    useEffect(() => {
        axios.get<{ data: IUser }>(`https://reqres.in/api/users/${id}`).then(res => res.data)
            .then(data => setUser(data.data))
            .catch(err => {
                if (id)
                    setUser(registredUsers.find(user => user.id == +id)
                    )
            })
    }, [id])

    const navigate = useNavigate()

    return (
        <div className='container'>
            {user ? (
                <><div className={styles.wrapper}>
                    <button onClick={() => navigate(-1)} className={styles['back-btn']}>Назад</button>
                    <img className={styles['user-page__img']} src={user.avatar ? user.avatar : defaultAvatarURL} alt="" />
                    <p className={styles['user-page__name']}>{`${user.first_name} ${user.last_name}`}</p>
                    <p className={styles['user-page__email']}>Email: {user.email}</p>
                </div>
                    <button className={clsx('btn btn-reset', styles["add-btn"])} onClick={() => setOpen(!open)}>Изменить данные</button>
                    <Modal updateRenderedUser={setUser} close={close} open={open} user={user} /> </>

            ) : (
                <p>Произошла ошибка: юзер не найден</p>
            )}


        </div>


    )
}

export default UserPage