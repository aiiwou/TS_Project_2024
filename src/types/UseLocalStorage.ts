import { IUser } from "./User"
import { AuthInfo } from "./AuthInfo";
function useLocalStorage(key: "token"): [AuthInfo, (newValue: AuthInfo) => void];
function useLocalStorage(key: "registredUsers"): [IUser[], (newValue: IUser) => void];
function useLocalStorage(key: "registredUsers" | "token"): [IUser[] | AuthInfo, Function] {


    if (key == "token") {
        const value = localStorage.getItem(key)
        const authItems: AuthInfo = value ? JSON.parse(value) : {}

        const setValue = (newValue: AuthInfo) => {
            localStorage.setItem(key, JSON.stringify(newValue))
        }

        return [authItems, setValue]
    } else {
        const value = localStorage.getItem(key)
        const registredUsers: IUser[] = value ? JSON.parse(value) : []

        const setValue = (newValue: IUser) => {
            const newUsers = [...registredUsers, newValue]
            localStorage.setItem(key, JSON.stringify(newUsers))
        }
        return [registredUsers, setValue]
    }
}

export default useLocalStorage