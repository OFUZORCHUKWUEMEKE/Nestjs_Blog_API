import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: "postgres",
    password: process.env.DB_PASSWORD,
    database: 'blog',
    autoLoadEntities: true,
    synchronize: true
  })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
