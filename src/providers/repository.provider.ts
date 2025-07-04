import { Provider } from '@nestjs/common'
import { UsersRepository } from 'src/users/repositories/users-repository'
import { FirebaseUserRepository } from 'src/users/repositories/firebase/firebase-user.repository'
import { PrismaUserRepository } from 'src/users/repositories/prisma/prisma-user.repository'
import { env } from 'src/env' 

export const RepositoryProviders: Provider[] = [
  {
    provide: UsersRepository,
    useFactory: (
      prismaRepo: PrismaUserRepository,
      firebaseRepo: FirebaseUserRepository
    ) => {
      return env.DATABASE_TYPE === 'firebase' ? firebaseRepo : prismaRepo
    },
    inject: [PrismaUserRepository, FirebaseUserRepository],
  },
  PrismaUserRepository,
  FirebaseUserRepository,
]
