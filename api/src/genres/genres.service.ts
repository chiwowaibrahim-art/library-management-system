
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Injectable()
export class GenresService {
  constructor(private prisma: PrismaService) {}

  // CREATE a genre
  async create(createGenreDto: CreateGenreDto) {
    return this.prisma.genre.create({
      data: createGenreDto,
    });
  }

  // GET all genres
  async findAll() {
    return this.prisma.genre.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  // GET one genre by ID
  async findOne(id: string) {
    const genre = await this.prisma.genre.findUnique({
      where: { id },
    });

    if (!genre) {
      throw new NotFoundException(`Genre with ID ${id} not found`);
    }

    return genre;
  }

  // UPDATE a genre
  async update(id: string, updateGenreDto: UpdateGenreDto) {
    await this.findOne(id);

    return this.prisma.genre.update({
      where: { id },
      data: updateGenreDto,
    });
  }

  // DELETE a genre
  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.genre.delete({
      where: { id },
    });
  }
}
