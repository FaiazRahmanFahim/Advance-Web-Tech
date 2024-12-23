import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HALogIn } from 'src/hoteladmin-login/Entities/login.entity';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([HALogIn])],
  controllers: [AuthController],
  providers: [AuthService,AuthGuard],
  exports: [AuthService, AuthGuard]
})
export class AuthModule {}