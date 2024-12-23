import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HALogIn } from './hoteladmin-login/Entities/login.entity';
import { HotelAdminLoginModule } from './hoteladmin-login/hoteladmin-login.module';
import { AuthModule } from './auth/auth.module';
import { PostHotelInfo } from './posthotel_info/Entities/posthotel.entity';
import { PostHotelInfoModule } from './posthotel_info/posthotel_info.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 1111,
      username: 'postgres',
      password: '5555',
      database: 'TPABP',
      entities: [HALogIn, PostHotelInfo],
      synchronize: true,
    }),
    HotelAdminLoginModule,
    PostHotelInfoModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
