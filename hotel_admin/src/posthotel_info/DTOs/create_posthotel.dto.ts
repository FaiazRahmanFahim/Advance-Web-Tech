import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePostHotelDTO {

    @IsNotEmpty()
    @IsString()
    HotelName: string;

    @IsNotEmpty()
    @IsString()
    roomType: string;

    @IsNotEmpty()
    @IsNumber()
    Price: number;

    @IsNotEmpty()
    @IsNumber()
    NumberOfRoom: number;
}
