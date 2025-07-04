import * as admin from 'firebase-admin'
import { env } from 'src/env'

const firebaseCredentials = JSON.parse(env.FIREBASE_ADMIN_CREDENTIALS)

admin.initializeApp({
  credential: admin.credential.cert(firebaseCredentials),
})

export { admin }