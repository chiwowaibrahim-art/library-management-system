
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { FindBooksQueryDto } from './dto/find-books-query.dto';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  // Create a new book
  async create(createBookDto: CreateBookDto) {
    // Check whether the genre exists
    const genre = await this.prisma.genre.findUnique({
      where: { id: createBookDto.genreId },
    });

    if (!genre) {
      throw new NotFoundException(
        `Genre with ID ${createBookDto.genreId} not found`,
      );
    }

    return this.prisma.book.create({
      data: createBookDto,
      include: { genre: true },
    });
  }

  // Retrieve books with filtering, search and pagination
  async findAll(query: FindBooksQueryDto) {
    const {
      genreId,
      search,
      page = 1,
      limit = 10,
    } = query;

    const where: Prisma.BookWhereInput = {};

    // Filter books by genre
    if (genreId) {
      where.genreId = genreId;
    }

    // Search by title or author
    if (search?.trim()) {
      where.OR = [
        {
          title: {
            contains: search.trim(),
            mode: 'insensitive',
          },
        },
        {
          author: {
            contains: search.trim(),
            mode: 'insensitive',
          },
        },
      ];
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Retrieve books and total count
    const [data, total] = await this.prisma.$transaction([
      this.prisma.book.findMany({
        where,
        include: { genre: true },
        skip,
        take: limit,
        orderBy: { title: 'asc' },
      }),
      this.prisma.book.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Retrieve one book by ID
  async findOne(id: string) {
    const book = await this.prisma.book.findUnique({
      where: { id },
      include: { genre: true },
    });

    if (!book) {
      throw new NotFoundException(
        `Book with ID ${id} not found`,
      );
    }

    return book;
  }

  // Update a book
  async update(id: string, updateBookDto: UpdateBookDto) {
    await this.findOne(id);

    // Check the new genre if one was provided
    if (updateBookDto.genreId) {
      const genre = await this.prisma.genre.findUnique({
        where: { id: updateBookDto.genreId },
      });

      if (!genre) {
        throw new NotFoundException(
          `Genre with ID ${updateBookDto.genreId} not found`,
        );
      }
    }

    return this.prisma.book.update({
      where: { id },
      data: updateBookDto,
      include: { genre: true },
    });
  }

  // Delete a book
  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.book.delete({
      where: { id },
      include: { genre: true },
    });
  }
}
