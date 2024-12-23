import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HALogIn } from './Entities/login.entity';
import { CreateHALogInDTO } from './DTOs/create-halogin.dto';
import { UpdateHALogInDTO } from './DTOs/update-halogin.dto';
import * as crypto from 'crypto';


@Injectable()
export class HotelAdminLoginService {

  constructor(@InjectRepository(HALogIn) 
  private readonly haloginRepository: Repository<HALogIn>,
  ) {}

  async create(createHALogInDTO: CreateHALogInDTO): Promise<HALogIn> 
  {
    const admin = this.haloginRepository.create(createHALogInDTO);
    return this.haloginRepository.save(admin);
  }

  async findOne(ID: number): Promise<HALogIn> 
  {
    const admin = await this.haloginRepository.findOne({ where: {ID} });
    if (!admin) {
      throw new NotFoundException(`Admin with UID ${ID} not found`);
    }
    return admin;
  }

  async findAll(): Promise<HALogIn[]> 
  {
    return this.haloginRepository.find();
  }

  async update(ID: number, updateHALogInDTO: UpdateHALogInDTO): Promise<HALogIn> 
  {
    const admin = await this.findOne(ID); // Get the current admin
    Object.assign(admin, updateHALogInDTO); // Merge the new data
    return this.haloginRepository.save(admin);
  }


  async remove(ID: number): Promise<string> {
    const admin = await this.findOne(ID); 

    if (!admin) {
      throw new BadRequestException('Admin not found');
    }
    await this.haloginRepository.remove(admin); 
    return `Successfully deleted admin with ID: ${ID}`; 
  }

  
  // Log In
  async validatePassword(username: string, password: string): Promise<boolean> 
  {
      const user = await this.haloginRepository.findOne({ where: { username, password } });
      return !!user;
  }

  // password reset
  async initiatePasswordReset(email: string): Promise<string> 
  {
    const user = await this.haloginRepository.findOne({ where: { email } });

    if (!user) {
        throw new BadRequestException('Email not found in the database.');
    }
    // reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    //const expirationTime = new Date(Date.now() + 3600 * 1000); // Token valid for 1 hour

    user.reset_token = resetToken;
    await this.haloginRepository.save(user);
    console.log(`Password reset token for ${email}: ${resetToken}`);
    return `Password reset instructions sent to ${email}.`;
  }

  // reset the password
  async resetPassword(resetToken: string, newPassword: string): Promise<string> {
      
    const user = await this.haloginRepository.findOne({
      where: { reset_token: resetToken },
    });

    if (!user) {
      throw new BadRequestException('Invalid or expired reset token.');
    }
    
    user.password = newPassword;
    user.reset_token = null;
    await this.haloginRepository.save(user);
    return 'Password successfully reset.';
  }
}
