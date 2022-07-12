export class AccessToken {
  constructor (private readonly value: string) {}

  static get expirationInMs (): number {
    const thirtyMinutesInMilliSeconds = 30 * 60 * 1000

    return thirtyMinutesInMilliSeconds
  }
}
