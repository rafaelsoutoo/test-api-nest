import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';


import { PrismaModule } from './config/prisma/prisma.module' 
import { UsersModule } from './users/users.module' 

import { RepositoryProviders } from './providers/repository.provider'
import { FirebaseModule } from './config/firebase/firebase.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    FirebaseModule.forRoot(),
    AuthModule,
    PrismaModule,
    UsersModule,
  ],
  providers: [...RepositoryProviders],
})
export class AppModule {}
