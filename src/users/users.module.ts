import { Module } from '@nestjs/common'
import { CreateUserUseCase } from './use-cases/create-user.use-case'
import { UsersController } from './users.controller'
import { PrismaUserRepository } from './repositories/prisma/prisma-user.repository'
import { UsersRepository } from './repositories/users-repository'
import { PrismaModule } from '../database/prisma/prisma.module'
import { RepositoryProviders } from 'src/providers/repository.provider'
import { FirebaseModule } from '../config/firebase/firebase.module'

@Module({
  imports: [PrismaModule, FirebaseModule],
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    ...RepositoryProviders,
  ],
  exports: [CreateUserUseCase],
})
export class UsersModule { }
