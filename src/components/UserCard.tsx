import {FC} from 'react'
import { Link } from 'react-router-dom';
import styles from '../css/UserCard.module.css'
import { IUser } from '../types/User';
import { defaultAvatarURL } from '../assets/defaultAvatar';
const UserCard: FC<{user: IUser}> = (props) => {
    const {user} = props;
    return (
        <div className={styles['user-card']}>
            <img className={styles['user-card-img']} src={user.avatar ? user.avatar : defaultAvatarURL} alt="" />
            <h2 className={styles['user-card-name']}>{user.first_name + ' ' + user.last_name}</h2>
            <h6 className={styles['user-card-mail']}>{user.email}</h6>
            <Link to={`/${user.id}`}>
                <button className={`${styles['user-card-btn']} btn-reset btn`}>Подробнее</button>
            </Link>
        </div>
    )
}

export default UserCard