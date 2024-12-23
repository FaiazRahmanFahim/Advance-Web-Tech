import { Injectable } from '@nestjs/common';
import { PostHotelInfo } from './Entities/posthotel.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostHotelDTO } from './DTOs/create_posthotel.dto';

@Injectable()
export class PostHotelInfoService {

  constructor(
    
    @InjectRepository(PostHotelInfo)
    private postHotelInfoRepository: Repository<PostHotelInfo>
  ) {}

  async create(createPostHotelDTO: CreatePostHotelDTO, adminId: number): Promise<PostHotelInfo> {
    const hotelInfo = this.postHotelInfoRepository.create({
      ...createPostHotelDTO,
      adminID: adminId
    });  
    return await this.postHotelInfoRepository.save(hotelInfo);
  }

  async findByHotelName(HotelName: string): Promise<PostHotelInfo|null> {
    return await this.postHotelInfoRepository
        .createQueryBuilder('PostHotel_Info')
        .where('PostHotel_Info.HotelName ILIKE :HotelName', { HotelName: `%${HotelName}%` })
        .getOne();
  }


  async findAll(adminId: number): Promise<PostHotelInfo[]> {
    return await this.postHotelInfoRepository.find({
      where: { adminID: adminId }
    });
  }
}
