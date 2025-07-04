import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FirebaseConfigService } from './firebase-config.service';
import { FirebaseService } from './firebase.service';
import { admin } from './firebase-admin';

@Global()
@Module({})
export class FirebaseModule {
  static forRoot(): DynamicModule {
    const firebaseConfigProvider = {
      provide: FirebaseConfigService,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const apiKey = configService.get<string>('FIREBASE_API_KEY');
        if (!apiKey) {
          throw new Error('FIREBASE_API_KEY environment variable is not set');
        }
        return new FirebaseConfigService(apiKey);
      },
    };

    const firebaseProvider = {
      provide: 'FIREBASE_ADMIN',
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const credentials = configService.get<string>(
          'FIREBASE_ADMIN_CREDENTIALS',
        );
        if (!credentials) {
          throw new Error(
            'FIREBASE_ADMIN_CREDENTIALS environment variable is not set',
          );
        }

       if(!admin){
        throw new Error(
          'Error firebase admin',
        );

        return admin
       }
       
      },
    };

    return {
      module: FirebaseModule,
      providers: [firebaseConfigProvider, firebaseProvider, FirebaseService],
      exports: [firebaseConfigProvider, firebaseProvider, FirebaseService],
    };
  }
}
