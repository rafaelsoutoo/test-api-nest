import 'dotenv/config'
import { plainToInstance } from 'class-transformer'
import { validateSync } from 'class-validator'
import { EnvVariables } from 'src/env/env.dto'

// parse env vars into class
const envVariables = plainToInstance(EnvVariables, process.env, {
  enableImplicitConversion: true,
})

// validate values
const errors = validateSync(envVariables, {
  skipMissingProperties: false,
})

if (errors.length > 0) {
  console.error('❌ Invalid environment variables:', errors)
  throw new Error('Invalid environment variables')
}

export const env = envVariables
