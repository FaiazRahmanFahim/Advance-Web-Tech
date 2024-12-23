import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HALogIn } from 'src/hoteladmin-login/Entities/login.entity';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  
   private tokens = new Map<string, number>(); // Store tokens with admin IDs

   constructor(
      @InjectRepository(HALogIn)
      private adminRepository: Repository<HALogIn>
    ) {}

    async login(username: string, password: string) {

        const admin = await this.adminRepository.findOne({
          where: { username, password }
      });

        if (!admin) {
          throw new UnauthorizedException('Invalid credentials');
        }
        const token = crypto.randomBytes(32).toString('hex');
        this.tokens.set(token, admin.ID);
        return {
          access_token: token,
          adminId: admin.ID
        };
    }

    validateToken(token: string): number | null {
        return this.tokens.get(token) || null;
    }
}
