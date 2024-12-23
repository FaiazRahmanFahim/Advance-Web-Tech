import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdatePostHotelDTO {

    @IsOptional()
    @IsString()
    HotelName: string;

    @IsOptional()
    @IsString()
    roomType: string;

    @IsOptional()
    @IsNumber()
    Price: number;

    @IsOptional()
    @IsNumber()
    NumberOfRoom: number;
}
