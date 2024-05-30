import { useEffect, useState, FC, useMemo } from 'react'
import UserCard from './UserCard';
import axios from 'axios';
import { IUser } from '../types/User';
import styles from '../css/Userlist.module.css'
import Paginator from './Paginator';
import FilterSelect from './FilterSelect';
import { IFilter, SORTING_OPTIONS, SEARCHING_OPTIONS } from '../types/IFilter';
import useLocalStorage from '../types/UseLocalStorage';
const PAGE_SIZE: number = 6

const UserList: FC = () => {
    const [posts, setPosts] = useState<IUser[]>([])

    const [filter, setFilter] = useState<IFilter>({
        searching: '',
        searchingFilter: 'name',
        page: 1,
        sorting: ""
    })

    const [registredUsers,] = useLocalStorage("registredUsers")

    const updateFilter = (name: keyof IFilter, value: IFilter[keyof IFilter]) => {
        setFilter({ ...filter, page: 1, [name]: value })
    }



    useEffect(() => {
        axios.get<{ data: IUser[] }>('https://reqres.in/api/users?per_page=12')
            .then(res => res.data)
            .then(data => {
                setPosts([...data.data, ...registredUsers])
            })
    }, [])

    const filteredPosts = useMemo(() => {
        if (!posts.length) return []

        const searchingRules = {
            name: (a: IUser) => { return `${a.first_name} ${a.last_name}` },
            email: (a: IUser) => { return a.email }
        }

        const sortingRules = {
            evenID: (a: IUser) => a.id % 2 == 0,
            oddID: (a: IUser) => a.id % 2 != 0,
            letter: (a: IUser) => {
                
                return searching.toLowerCase() != searchingRules[searchingFilter](a).slice(0, searching.length).toLowerCase()
            }
        }

        const { searching, searchingFilter, sorting } = filter
        let result = posts;
        if (sorting != 'letter') result = posts.filter(post => (searchingRules[searchingFilter](post))
            .toLowerCase().includes(searching.toLowerCase()))

        if (sorting) {
            result = result.filter(post => (sortingRules[sorting](post)))
        }
        return result

    }, [posts, filter])

    const pagesCount = Math.ceil(filteredPosts.length / PAGE_SIZE)

    return (

        <div className='container'>
            <div className={`${styles.inputs} flex`}>
                <input
                    className={`${styles['inputs-search']}`}
                    type="text"
                    placeholder={`Поиск`}
                    value={filter.searching}
                    onChange={(e) => setFilter(
                        {
                            ...filter,
                            searching: e.target.value,
                            page: 1,
                        }
                    )}
                />
                <FilterSelect
                    options={SEARCHING_OPTIONS}
                    activeSorting={filter.searchingFilter}
                    updateSorting={(value: string) => updateFilter('searchingFilter', value)}
                    filterType={"searching"}
                    className={styles['inputs-filter']} />
                <FilterSelect
                    options={SORTING_OPTIONS}
                    activeSorting={filter.sorting}
                    updateSorting={(value: string) => { updateFilter('sorting', value) }}
                    filterType={"filter"}
                    className={styles['inputs-filter']}
                    />
            </div>
            <div className={`${styles['user-list']} flex`}>
                {
                    filteredPosts.length ? (filteredPosts
                        .slice(PAGE_SIZE * (filter.page - 1), 6 + PAGE_SIZE * (filter.page - 1))
                        .map(post => (
                            <UserCard key={post.id} user={post} />
                        ))) : (<p>Нет пользователей</p>)
                }
            </div>
            {pagesCount > 1 && (<Paginator
                activePage={filter.page}
                updatePage={(button: number) => updateFilter('page', button)}
                pagesCount={pagesCount} />)}

        </div>
    )
}

export default UserList