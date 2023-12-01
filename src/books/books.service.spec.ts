import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { Model } from 'mongoose';
import { Book } from './schemas/books.schema';
import { getModelToken } from '@nestjs/mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { DeepMocked, createMock } from '@golevelup/ts-jest'

describe('BooksService', () => {
  let service: BooksService;
  let model: DeepMocked<Model<Book>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getModelToken(Book.name),
          useValue: createMock<Model<Book>>()
        }
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    model = module.get(getModelToken(Book.name));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a book', async () => {
      const mockBook: CreateBookDto = { title: 'Test Book', author: ['Test Author'], publisher: 'Test Publisher', publish_date: new Date() };
      const mockDocument = {
        _id: 'generatedId',
        __v: 0,
        ...mockBook
      };
      jest.spyOn(model, 'create').mockReturnValueOnce(mockDocument as any);

      const result = await service.create(mockBook);

      expect(result).toEqual(mockDocument);
      expect(model.create).toHaveBeenCalledWith(mockBook);
    });
  });

  // describe('findAll', () => {
  //   it('should find all books', async () => {
  //     const mockBooks: Book[] = [{ title: 'Book 1' }, { title: 'Book 2' }];
  //     jest.spyOn(model, 'create').find.mockReturnValueOnce({ exec: jest.fn().mockResolvedValueOnce(mockBooks) } as any);

  //     const result = await service.findAll();

  //     expect(result).toEqual(mockBooks);
  //     expect(model.find).toHaveBeenCalled();
  //   });
  // });

  // describe('findAll', () => {
  //   it('should return an array of books', async () => {
  //     const expectedResult: Book[] = []; // Chỉ định kết quả mong đợi

  //     jest.spyOn(model, 'find').mockReturnValueOnce({
  //       exec: jest.fn().mockResolvedValueOnce(expectedResult),
  //     } as any);

  //     const result = await service.findAll();

  //     expect(result).toEqual(expectedResult);
  //   });
  // });

  // describe('findOne', () => {
  //   it('should return a book by ID', async () => {
  //     const bookId = 'some-book-id';
  //     const expectedBook: Book | null = null; // Chỉ định kết quả mong đợi

  //     jest.spyOn(bookModel, 'findById').mockReturnValueOnce({
  //       exec: jest.fn().mockResolvedValueOnce(expectedBook),
  //     } as any);

  //     const result = await service.findOne(bookId);

  //     expect(result).toEqual(expectedBook);
  //     expect(bookModel.findById).toHaveBeenCalledWith(bookId);
  //   });
  // });
});
