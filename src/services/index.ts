import {
  ColonyClient,
  ColonyRole,
  getBlockTime,
  getLogs,
} from '@colony/colony-js'
import { utils } from 'ethers'
import { InfuraProvider, Log } from 'ethers/providers'
import { EventLog } from '../types/index'

export const getColonyInitialisedEvents = async (
  client: ColonyClient,
  provider: InfuraProvider,
): Promise<EventLog[]> => {
  const eventFilter = client.filters.ColonyInitialised(null, null)
  const eventLogs = await getLogs(client, eventFilter)

  const parsedEvents = eventLogs.map(async (event: Log) => {
    const parsedEvent = client.interface.parseLog(event)
    const logTime = await getBlockTime(provider, event.blockHash ?? '')

    return {
      type: parsedEvent.name,
      transactionHash: event.transactionHash as string,
      date: logTime,
    }
  })

  return Promise.all(parsedEvents)
}

const getColonyRoleSetEvent = async (
  client: ColonyClient,
  provider: InfuraProvider,
): Promise<EventLog[]> => {
  // @ts-ignore
  // ColonyRoleSet is not defined in the client filters
  const eventFilter = client.filters.ColonyRoleSet(null, null, null, null)
  const eventLogs = await getLogs(client, eventFilter)
  const parsedEvents = eventLogs.map(async (event: Log) => {
    const parsedEvent = client.interface.parseLog(event)
    const userAddress: string = parsedEvent.values.user
    const role = ColonyRole[parsedEvent.values.role]
    const domainId = new utils.BigNumber(parsedEvent.values.domainId).toString()
    const logTime = await getBlockTime(provider, event.blockHash ?? '')

    return {
      type: parsedEvent.name,
      transactionHash: event.transactionHash as string,
      date: logTime,
      userAddress,
      role,
      domainId,
    }
  })

  return Promise.all(parsedEvents)
}

const getColonyPayoutClaimedEventLogs = async (
  client: ColonyClient,
  provider: InfuraProvider,
): Promise<EventLog[]> => {
  const eventFilter = client.filters.PayoutClaimed(null, null, null)
  const wei = new utils.BigNumber(10)
  const eventLogs = await getLogs(client, eventFilter)
  const parsedEvents = eventLogs.map(async (event: Log) => {
    const parsedEvent = client.interface.parseLog(event)
    const humanReadableAmount = new utils.BigNumber(parsedEvent.values.amount)
    const fundingPotId = new utils.BigNumber(
      parsedEvent.values.fundingPotId,
    ).toString()
    const { associatedTypeId } = await client.getFundingPot(fundingPotId)
    const { recipient: userAddress } = await client.getPayment(associatedTypeId)
    const logTime = await getBlockTime(provider, event.blockHash ?? '')
    const claimedAmount = humanReadableAmount.div(wei.pow(18)).toString()

    return {
      type: parsedEvent.name,
      transactionHash: event.transactionHash as string,
      userAddress,
      date: logTime,
      claimedAmount,
      fundingPotId,
      token: parsedEvent.values.token,
    }
  })

  return Promise.all(parsedEvents)
}

const getColonyDomainAddedEventLogs = async (
  client: ColonyClient,
  provider: InfuraProvider,
): Promise<EventLog[]> => {
  const eventFilter = client.filters.DomainAdded(null)
  const eventLogs = await getLogs(client, eventFilter)
  const parsedEvents = eventLogs.map(async (event: Log, index) => {
    const parsedEvent = client.interface.parseLog(event)
    const domainId = new utils.BigNumber(parsedEvent.values.domainId).toString()
    const logTime = await getBlockTime(provider, event.blockHash ?? '')

    return {
      type: parsedEvent.name,
      transactionHash: event.transactionHash as string,
      date: logTime,
      domainId,
    }
  })

  return Promise.all(parsedEvents)
}

const getColonyEvents = async (client: ColonyClient): Promise<EventLog[]> => {
  const provider = new InfuraProvider()
  const colonyInitialisedEvents = await getColonyInitialisedEvents(
    client,
    provider,
  )
  const colonyRoleSetEvent = await getColonyRoleSetEvent(client, provider)
  const colonyPayoutClaimedEvents = await getColonyPayoutClaimedEventLogs(
    client,
    provider,
  )
  const colonyDomainAddedEventLogs = await getColonyDomainAddedEventLogs(
    client,
    provider,
  )

  const eventLogs = colonyInitialisedEvents.concat(
    colonyRoleSetEvent,
    colonyPayoutClaimedEvents,
    colonyDomainAddedEventLogs,
  )

  return eventLogs.sort((eventA, eventB) => eventA.date - eventB.date)
}

export default getColonyEvents
