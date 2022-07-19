export class AccessToken {
  constructor (readonly value: string) {}

  static get expirationInMs (): number {
    const thirtyMinutesInMilliSeconds = 30 * 60 * 1000

    return thirtyMinutesInMilliSeconds
  }
}
