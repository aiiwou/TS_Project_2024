import { FC } from 'react'
import { IOption, searchingFilter, sorting } from '../types/IFilter'


type FilterSelectProps = {
    options: IOption[],
    updateSorting: (value: string) => void,
    activeSorting: sorting | searchingFilter,
    filterType: "filter" | "searching",
    className: string
}

const FilterSelect: FC<FilterSelectProps> = (props) => {
    const { options, updateSorting, activeSorting, filterType } = props

    return (
        <select
        value={activeSorting}
        onChange={(e) => updateSorting(e.target.value)}>
             { filterType == "filter" && (<option value="">Выберите фильтр...</option>)}
            {options.map(option => (
                <option key={option.value} value={option.value}>{option.name}</option>
            ))}
        </select>
    )
}

export default FilterSelect