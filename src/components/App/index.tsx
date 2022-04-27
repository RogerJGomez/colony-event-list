import React, { useEffect, useState } from 'react'
import colonyClient from '../../config/client'
import getColonyEvents from '../../services/index'
import { EventLog } from '../../types'
import EventList from '../EventList'
import ListItem from '../ListItem'
import SpinnerLoader from '../Spinner'
import styles from './App.module.scss'

function App() {
  const [events, setEvents] = useState<EventLog[]>([])
  const [loading, setLoading] = useState(false)

  const fetchEventLogs = async () => {
    setLoading(true)

    try {
      const client = await colonyClient()
      const eventLogs = await getColonyEvents(client)

      setEvents(eventLogs)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEventLogs()
  }, [])

  return (
    <div className={styles.container}>
      {events.length !== 0 && (
        <EventList>
          {events.map((event: EventLog, index) => (
            <ListItem key={`${event.transactionHash}-${index}`} event={event} />
          ))}
        </EventList>
      )}
      {loading && <SpinnerLoader />}
    </div>
  )
}

export default App
