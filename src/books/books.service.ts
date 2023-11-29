import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BooksService {
  constructor(@InjectModel('Book') private bookModel) {}

  async create(createBookDto: CreateBookDto) {
    console.log(createBookDto);
    const createdBook = new this.bookModel(createBookDto);
    return createdBook.save();
  }

  async findAll() {
    return this.bookModel.find().exec();
  }

  async findOne(id: string) {
    return this.bookModel.findById(id).exec();
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    return this.bookModel.findByIdAndUpdate(id, updateBookDto).exec();
  }

  async remove(id: string) {
    return this.bookModel.findByIdAndDelete(id).exec();
  }
}
