import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { IsOptional, IsString, IsArray, IsDate } from 'class-validator';

export class UpdateBookDto extends PartialType(CreateBookDto) {
    @IsString()
    @IsOptional()
    title?: String;
    
    @IsArray()
    @IsString({each: true})
    @IsOptional()
    author?: String[];

    @IsString()
    @IsOptional()
    publisher?: String;

    @IsDate()
    @IsOptional()
    publish_date?: Date;
}
