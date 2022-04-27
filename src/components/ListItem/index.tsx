import React from 'react'
import Blockies from 'react-blockies'
import { format } from 'date-fns'
import { EventLog } from '../../types'
import styles from './ListItem.module.scss'

interface Props {
  event: EventLog
}

const ListItem: React.FC<Props> = ({ event }: Props): React.ReactElement => {
  const EVENT_TEXTS: Record<string, JSX.Element> = {
    ColonyInitialised: (
      <p className={styles.text}>
        Congratulations! It's a beautiful baby colony!
      </p>
    ),
    ColonyRoleSet: (
      <p className={styles.text}>
        <span className={styles.bold}>{event.role}</span>
        role assigned to user
        <span className={styles.bold}>{event.userAddress}</span>
        in domain
        <span className={styles.bold}>{event.domainId}</span>
      </p>
    ),
    PayoutClaimed: (
      <p className={styles.text}>
        User <span className={styles.bold}>{event.userAddress}</span>
        claimed
        <span className={styles.bold}>
          {event.claimedAmount}
          {event.token}
        </span>
        payout from pot
        <span className={styles.bold}>{styles.fundingPotId}</span>.
      </p>
    ),
    DomainAdded: (
      <p className={styles.text}>
        Domain <span className={styles.bold}>{event.domainId}</span>
        added.
      </p>
    ),
  }

  return (
    <li className={styles.listItem}>
      <Blockies
        seed={event.userAddress || event.transactionHash}
        size={9}
        scale={4}
        className={styles.avatar}
      />
      <div className={styles.listContent}>
        {EVENT_TEXTS[event.type]}
        <p className={styles.date}>{format(event.date, 'dd MMM')}</p>
      </div>
    </li>
  )
}

export default ListItem
