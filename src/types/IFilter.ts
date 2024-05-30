export type searchingFilter = "name" | "email"
export type sorting = "evenID" | "oddID" | "letter" | ""

export interface IFilter {
    searching: string,
    searchingFilter: searchingFilter,
    page: number,
    sorting: sorting
}

export interface IOption {
    name: string,
    value: searchingFilter | sorting
}

export const SORTING_OPTIONS: IOption[] = [
    {
        name: "Показывать четные ID",
        value: "evenID"
    },
    {
        name: "Показывать нечетные ID",
        value: "oddID"
    },
    {
        name: "Не начинаются с буквы:",
        value: "letter"
    }
]

export const SEARCHING_OPTIONS: IOption[] = [
    {
        name: "По имени",
        value: "name"
    },
    {
        name: "По почте",
        value: "email"
    }
]