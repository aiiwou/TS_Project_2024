import { FC } from 'react'
import styles from '../css/PaginatorButton.module.css'
import clsx from 'clsx'

type PaginatorButtonProps = {
  active: boolean,
  updatePage: () => void,
  children: number
}

const PaginatorButton: FC<PaginatorButtonProps> = (props) => {

  const {active, updatePage, children} = props


  return (
    <button
      onClick={updatePage}
     className={clsx(styles['paginator-btn'], active && styles['paginator-active'])}
     >
      {children}
     </button>
  )
}

export default PaginatorButton