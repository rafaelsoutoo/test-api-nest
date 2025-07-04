import { Module } from '@nestjs/common'
import { CreateUserUseCase } from './use-cases/create-user.use-case'
import { UsersController } from './users.controller'
import { PrismaModule } from '../config/prisma/prisma.module'
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
