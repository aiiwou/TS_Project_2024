import { useEffect, useState, FC } from 'react'
import { IUser } from './types/User'
import axios from 'axios'
import styles from './css/Registration.module.css'
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'
import inputStyles from './css/RegChangeInputs.module.css'
import useLocalStorage from './types/UseLocalStorage'

type registrationItem = {
    email: string,
    password: string
}

const RegPage: FC = () => {
    const [token, setToken] = useLocalStorage("token")
    const [, setRegistredUsers] = useLocalStorage("registredUsers")
    
    const [newUser, setNewUser] = useState<IUser>({
        first_name: '',
        last_name: '',
        avatar: '',
        id: Math.ceil(Math.random() * Math.random() * 1000) + 12,
        email: ""
    })


    const navigate = useNavigate()
    const [password, setPassword] = useState<string>("")

    useEffect(() => {
        if (token.token) navigate('/')
    }, [token])

    const updateNewUser = (title: keyof IUser, value: IUser[keyof IUser]) => {
        setNewUser({ ...newUser, [title]: value })
    }


    const sendRegistrationPost = (post: registrationItem) => {
        const isntEmpty = Object.values({...newUser, avatar: "заглушка"}).every(el => !!el)
        if (isntEmpty) {
            axios.post('https://reqres.in/api/register', post)
            .then(res => {
                if (res.status == 200) {
                    postUser({...newUser})
                    setRegistredUsers(newUser)
                    setToken({token: res.data.token, id: newUser.id})
                    navigate('/')
                }
            })
            .catch(er => {
                console.error(er)
                alert('Неверная почта')
            })
        } else {
            alert("Поля не должны быть пустыми")
        }
        
    }

    const postUser = (user: IUser) => {
        axios.post('https://reqres.in/api/users', user)
        .then(res => console.log(res.status)).catch(err => console.error(err))
    }

    return (
        <div className="container">
            <div className={styles.form}>
                
                <input
                className={inputStyles["inputs-search"]}
                required type="text" placeholder='Имя' onChange={(e) => updateNewUser('first_name', e.target.value)} />
                <input
                className={inputStyles["inputs-search"]}
                required type="text" placeholder='Фамилия' onChange={(e) => updateNewUser('last_name', e.target.value)} />
                <input
                className={inputStyles["inputs-search"]}
                type="text" placeholder='Ссылка на аватарку'
                 onChange={(e) => updateNewUser('avatar', e.target.value)} />
                 <input
                className={inputStyles["inputs-search"]}
                required type="text" placeholder='Почта' onChange={(e) => updateNewUser('email', e.target.value)} />
                <input
                className={inputStyles["inputs-search"]}
                required type="password" placeholder='Пароль' onChange={(e) => setPassword(e.target.value)} />
                <button onClick={() => sendRegistrationPost({email: newUser.email, password})} className={clsx(styles['reg-btn'], 'btn btn-reset')}>Регистрация</button>
            </div>
        </div>
    )
}

export default RegPage