import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PaginationQueryDto } from 'src/common/pagination-query.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCoffeeDto, UpdateCoffeeDto } from './dto';

@Injectable()
export class CoffeesService {
  constructor(private readonly prisma: PrismaService) {
    prisma.$on<any>('query', (event: Prisma.QueryEvent) => {
      console.log('Query: ' + event.query);
    });
  }

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.prisma.coffee.findMany({
      skip: offset,
      take: limit,
      include: {
        flavors: true,
      },
    });
  }

  async findOne(id: string) {
    const coffee = await this.prisma.coffee.findFirst({
      where: { id },
      include: {
        flavors: true,
      },
    });
    if (!coffee) throw new NotFoundException(`Coffee with id ${id} not found`);
    return coffee;
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    const { brand, flavors, name } = createCoffeeDto;

    const coffee = await this.prisma.coffee.create({
      data: {
        name,
        brand,
        flavors: {
          connectOrCreate: flavors.map((flavor) => ({
            where: { name: flavor },
            create: { name: flavor },
          })),
        },
      },
      include: {
        flavors: true,
      },
    });
    return coffee;
  }

  async update(id: string, updateCoffee: UpdateCoffeeDto) {
    const { flavors, ...others } = updateCoffee;
    const coffee = await this.prisma.coffee.findUnique({ where: { id } });
    if (!coffee)
      throw new NotFoundException(`Cannot update coffee with id ${id}`);
    return this.prisma.coffee.update({
      where: { id },
      data: {
        ...others,
        flavors: {
          connectOrCreate:
            flavors &&
            flavors.map((flavor) => ({
              where: { name: flavor },
              create: { name: flavor },
            })),
        },
      },
      include: {
        flavors: true,
      },
    });
  }

  async remove(id: string) {
    const coffee = await this.findOne(id);
    await this.prisma.coffee.delete({ where: { id: coffee.id } });
  }
}
