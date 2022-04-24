import React from 'react'
import { ListContainer } from './components/ListContainer'
import { ListItem } from './components/ListItem'

function App() {
  return (
    <ListContainer>
      {[0, 1, 2].map(item => (
        <ListItem
          image='https://as1.ftcdn.net/v2/jpg/02/39/03/26/1000_F_239032634_UCPzWyu4XJTDq6q2PC4bRGDXPhESFbTZ.jpg'
          date='24 Apr'
          text='"Lorem ipsum dolor sit amet, consetetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
        />
      ))}
    </ListContainer>
  )
}

export default App
