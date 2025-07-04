import { IsEnum, IsNumber, IsString } from 'class-validator'
import { Transform } from 'class-transformer'

export enum DatabaseType {
    PRISMA = 'prisma',
    FIREBASE = 'firebase',
}

export class EnvVariables {
    @IsEnum(['dev', 'test', 'production'])
    NODE_ENV: 'dev' | 'test' | 'production' = 'dev' // app environment

    @Transform(({ value }) => Number(value))
    @IsNumber()
    PORT: number = 3333 // server port

    @IsEnum(DatabaseType)
    DATABASE_TYPE: DatabaseType // db driver

    @IsString()
    FIREBASE_API_KEY: string // frontend firebase key

    @IsString()
    FIREBASE_ADMIN_CREDENTIALS: string // admin SDK credentials (JSON string)

    @IsString()
    DATABASE_URL: string // only for Prisma
}
