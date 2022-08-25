export const env = {
  facebookApi: {
    clientId: process.env.FB_CLIENT_ID ?? '395348482723343',
    clientSecret: process.env.FB_CLIENT_SECRET ?? 'c5a1a177158ccaadbe81d56963340ac8'
  },
  app: {
    ip: process.env.IP ?? '192.168.15.12',
    port: process.env.PORT ?? 5000
  }
}
