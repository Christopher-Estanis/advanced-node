import './config/module-alias'
import 'reflect-metadata'

import { env } from '@/main/config/env'
import { app } from '@/main/config/app'

app.listen(Number(env.app.port), env.app.ip, () => console.log(`Server running at http://${env.app.ip}:${env.app.port}`))
