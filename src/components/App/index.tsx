import React from 'react'
import EventList from '../EventList'
import ListItem from '../ListItem'
import styles from './App.module.scss'
import colonyClient from '../../config/client'

function App() {
  console.log(colonyClient)

  return (
    <div className={styles.container}>
      <EventList>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => (
          <ListItem
            key={index}
            image='https://as1.ftcdn.net/v2/jpg/02/39/03/26/1000_F_239032634_UCPzWyu4XJTDq6q2PC4bRGDXPhESFbTZ.jpg'
            date='24 Apr'
            text='"Lorem ipsum dolor sit amet, consetetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
          />
        ))}
      </EventList>
    </div>
  )
}

export default App
