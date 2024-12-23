import { Controller, Post, Body, Req, UseGuards, Get, Query, NotFoundException } from '@nestjs/common';
import { PostHotelInfoService } from './posthotel_info.service';
import { CreatePostHotelDTO } from './DTOs/create_posthotel.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('posthotel-info')
@UseGuards(AuthGuard)
export class PostHotelInfoController {

  constructor(private readonly postHotelInfoService: PostHotelInfoService) {}

  @Get('search')
  async searchHotelName(@Query('HotelName') HotelName: string) {
      const hotel = await this.postHotelInfoService.findByHotelName(HotelName);
      if (!hotel) {
          throw new NotFoundException('Hotel not found!');
      }
      return hotel;
  }

  
  @Post()
  async create(@Body() createPostHotelDTO: CreatePostHotelDTO, @Req() req: any) {
    console.log('User data:', req.user);
    const adminId = req.user.adminID;  // Changed from req.user.sub to req.user.id
    return this.postHotelInfoService.create(createPostHotelDTO, adminId);
  }

  @Get()
  async findAll(@Req() req: any) 
  {
    const adminId = req.user.sub;
    return this.postHotelInfoService.findAll(adminId);
  }

}
