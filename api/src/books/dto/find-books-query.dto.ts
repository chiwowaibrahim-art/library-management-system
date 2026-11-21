
import { Type } from 'class-transformer';

import {
  IsInt,
  IsOptional,
  IsString,
  Min,
  Max,
} from 'class-validator';

export class FindBooksQueryDto {
  @IsOptional()
  @IsString()
  genreId?: string;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;
}
