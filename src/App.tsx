import React, { useEffect } from 'react'
import { ListContainer } from './components/ListContainer'
import { ListItem } from './components/ListItem'
// import { colonyClient } from './config/client'
// import { parsedLogs } from './config/services'
import { getColonyNetworkClient, Network } from '@colony/colony-js'
import { Wallet } from 'ethers'
import { InfuraProvider } from 'ethers/providers'

function App() {
  //console.log(parsedLogs)
  // Set up the network address constants that you'll be using
  // The two below represent the current ones on mainnet
  // Don't worry too much about them, just use them as-is
  async function lol() {
    const MAINNET_NETWORK_ADDRESS = `0x5346D0f80e2816FaD329F2c140c870ffc3c3E2Ef`
    const MAINNET_BETACOLONY_ADDRESS = `0x869814034d96544f3C62DE2aC22448ed79Ac8e70`

    // Get a new Infura provider (don't worry too much about this)
    const provider = new InfuraProvider()

    // Get a random wallet
    // You don't really need control over it, since you won't be firing any trasactions out of it
    const wallet = Wallet.createRandom()
    // Connect your wallet to the provider
    const connectedWallet = wallet.connect(provider)
    console.log(connectedWallet)

    // Get a network client instance
    const networkClient = await getColonyNetworkClient(
      Network.Mainnet,
      connectedWallet,
      {
        networkAddress: MAINNET_NETWORK_ADDRESS,
      },
    )
    console.log(networkClient)
    console.log(networkClient.getColonyCount())
    console.log(networkClient.getCurrentColonyVersion())

    // Get the colony client instance for the betacolony
    const colonyClient = await networkClient
      .getColonyClient(MAINNET_BETACOLONY_ADDRESS)
      .catch(error => console.log(error))

    console.log(colonyClient)
  }

  useEffect(() => {
    lol()
  }, [])

  return (
    <ListContainer>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => (
        <ListItem
          key={index}
          image='https://as1.ftcdn.net/v2/jpg/02/39/03/26/1000_F_239032634_UCPzWyu4XJTDq6q2PC4bRGDXPhESFbTZ.jpg'
          date='24 Apr'
          text='"Lorem ipsum dolor sit amet, consetetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
        />
      ))}
    </ListContainer>
  )
}

export default App
