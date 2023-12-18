export type Guest = {
  name: string
  email: string
  paid: boolean
  uuid: string
  receiptImage: string
}
export type EventData = {
  uuid: string
  owner: string
  valuePerGuest: number

  amountValue: number
  date: string
  beverageIncluded: boolean
  observations: string
  description: string
  
  guests: Guest[]

  amIOwner?: boolean
  pixKey: string
}