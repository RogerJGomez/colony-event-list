export interface EventLog {
  type: string
  transactionHash: string
  token?: string
  date: number
  claimedAmount?: string
  fundingPotId?: string
  userAddress?: string
  domainId?: string
  role?: string
}
