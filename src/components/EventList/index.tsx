import React from 'react'
import styles from './EventList.module.scss'

interface Props {
  children: React.ReactNode
}

const EventList: React.FC<Props> = ({
  children,
}: Props): React.ReactElement => {
  return <ul className={styles.list}>{children}</ul>
}

export default EventList
