import React from 'react'
import styles from './ListItem.module.scss'

interface Props {
  text: string
  date: string
  image: string
}

const ListItem: React.FC<Props> = ({
  text,
  image,
  date,
}: Props): React.ReactElement => {
  return (
    <li className={styles.listItem}>
      <img src={image} className={styles.avatar} alt='profile-pic' />
      <div className={styles.listContent}>
        <p className={styles.text}>{text}</p>
        <p className={styles.date}>{date}</p>
      </div>
    </li>
  )
}

export default ListItem
