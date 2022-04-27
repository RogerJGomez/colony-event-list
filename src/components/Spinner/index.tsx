import React from 'react'
import styles from './Spinner.module.scss'

const SpinnerLoader: React.FC = (): React.ReactElement => {
  return <div className={styles.spinner} />
}

export default SpinnerLoader
