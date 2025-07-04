import { admin } from "src/config/firebase/firebase-admin"
import { UsersRepository } from "../users-repository"
import { Injectable } from "@nestjs/common"
import { UserEntity } from "src/users/entities/user.entity"

@Injectable()
export class FirebaseUserRepository implements UsersRepository {
  private collection = admin.firestore().collection('users')

  async findByEmail(email: string): Promise<UserEntity | null> {
    const snapshot = await this.collection.where('email', '==', email).limit(1).get()
    if (snapshot.empty) return null

    const doc = snapshot.docs[0]
    const data = doc.data()

    return {
      id: doc.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role || 'admin',
      createdAt: data.created_at?.toDate() || new Date(),
    }
  }

  async create(data: any): Promise<UserEntity> {
    const now = new Date()
    const { uid, ...userData } = data
    const docRef = this.collection.doc(uid)
    await docRef.set({
      ...userData,
      role: userData.role || 'admin',
      createdAt: now,
    })

    return {
      id: uid,
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      role: userData.role || 'admin',
      createdAt: now,
    }
  }
}
