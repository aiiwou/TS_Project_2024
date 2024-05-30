import { FC, useMemo } from 'react'
import styles from '../css/Paginator.module.css'
import PaginatorButton from './PaginatorButton'

type PaginatorProps = {
  activePage: number,
  updatePage: (button: number) => void,
  pagesCount: number
}

const Paginator: FC<PaginatorProps> = (props) => {

  const {activePage, updatePage, pagesCount} = props
  const pagesArray = useMemo(() => Array.from({length: pagesCount}, (_,i) => i + 1), [pagesCount])


  return (
    <div className={styles.paginator}>
      {
        pagesArray.map(button => (
          <PaginatorButton key={button}
           active={activePage === button}
           updatePage={() => updatePage(button)}
           >
            {button}
          </PaginatorButton>
        )
      )
      }
    </div>
  )
}

export default Paginator