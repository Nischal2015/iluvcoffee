import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @Type(() => Number)
  @IsOptional()
  offset: number;

  @Type(() => Number)
  @IsPositive()
  @IsOptional()
  limit: number;
}
