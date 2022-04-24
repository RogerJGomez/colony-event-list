import React from 'react'
import styles from './ListItem.module.scss'

interface Props {
  text: string
  date: string
  image: string
}

export const ListItem: React.FC<Props> = ({
  text,
  image,
  date,
}: Props): React.ReactElement => {
  return (
    <div className={styles.listItem}>
      <img src={image} className={styles.avatar} alt='profile-pic' />
      <div className={styles.listContent}>
        <h4>{text}</h4>
        <p>{date}</p>
      </div>
    </div>
  )
}
