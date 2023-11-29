import { IsDate, IsString, IsArray, IsOptional } from "class-validator";

export class CreateBookDto {
    @IsString()
    title: String;
    
    @IsArray()
    @IsString({each: true})
    author: String[];

    @IsString()
    publisher: String;

    @IsDate()
    publish_date: Date = new Date();
}
