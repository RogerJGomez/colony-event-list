import React from 'react'
import styles from './ListContainer.module.scss'

interface Props {
  children: React.ReactNode
}

export const ListContainer: React.FC<Props> = ({ children }: Props): React.ReactElement => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContent}>{children}</div>
    </div>
  )
}
