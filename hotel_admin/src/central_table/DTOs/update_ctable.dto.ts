import { IsOptional, IsString, IsBoolean, IsNumber } from 'class-validator';

export class UpdateCTableDTO {
    @IsOptional()
    @IsString()
    user_type?: string;

    @IsOptional()
    @IsBoolean()
    is_admin?: boolean;

    @IsOptional()
    @IsString()
    username?: string;

    @IsOptional()
    @IsString()
    email?: string;

    @IsOptional()
    @IsString()
    password?: string;

    @IsOptional()
    @IsString()
    phone_number?: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsString()
    HotelName?: string;

    @IsOptional()
    @IsString()
    NumberOfRoom?: number;

    @IsOptional()
    @IsString()
    roomType?: string;

    @IsOptional()
    @IsNumber()
    numberOfpeople?: number;

    @IsOptional()
    @IsString()
    checkInDate?: string;

    @IsOptional()
    @IsString()
    checkOutDate?: string;

    @IsOptional()
    @IsString()
    flightName?: string;

    @IsOptional()
    @IsString()
    AirlineName?: string;

    @IsOptional()
    @IsString()
    FromPlace?: string;

    @IsOptional()
    @IsString()
    ToPlace?: string;

    @IsOptional()
    @IsNumber()
    Price?: number;

    @IsOptional()
    @IsString()
    Availability?: string;

    @IsOptional()
    @IsString()
    carModel?: string;

    @IsOptional()
    @IsString()
    carNumber?: string;

    @IsOptional()
    @IsString()
    pickUpDate?: string;

    @IsOptional()
    @IsString()
    dropOffDate?: string;
}