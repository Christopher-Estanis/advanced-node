type FacebookData = {
  facebookId: string
  name: string
  email: string
}

type AccountData = {
  id?: string
  name?: string
}

export class FacebookAccount {
  id?: string
  name: string
  email: string
  facebookId: string

  constructor (facebookData: FacebookData, accountData?: AccountData) {
    this.id = accountData?.id
    this.name = accountData?.name ?? facebookData.name
    this.email = facebookData.email
    this.facebookId = facebookData.facebookId
  }
}
