import { Injectable } from '@nestjs/common'
import { admin } from './firebase-admin'

@Injectable()
export class FirebaseAuthService {
  async createUser({ email, password }: { email: string; password: string }) {
    return admin.auth().createUser({ email, password })
  }
} 