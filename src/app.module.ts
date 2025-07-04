import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config';


import { PrismaModule } from './config/prisma/prisma.module' 
import { UsersModule } from './users/users.module' 

import { RepositoryProviders } from './providers/repository.provider'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UsersModule,
  ],
  controllers: [],
  providers: [...RepositoryProviders],
})
export class AppModule {}
