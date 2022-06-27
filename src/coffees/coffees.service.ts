import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateCoffeeDto } from './dto';

@Injectable()
export class CoffeesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.coffee.findMany();
  }

  async findOne(id: string) {
    const coffee = await this.prisma.coffee.findFirst({
      where: { id },
    });
    if (!coffee) throw new NotFoundException(`Coffee with id ${id} not found`);
    return coffee;
  }

  async create(createCoffeeDto: any) {
    const coffee = await this.prisma.coffee.create({
      data: {
        ...createCoffeeDto,
      },
    });
    return coffee;
  }

  async update(id: string, updateCoffee: UpdateCoffeeDto) {
    const coffee = await this.prisma.coffee.findUnique({ where: { id } });
    if (!coffee)
      throw new NotFoundException(`Cannot update coffee with id ${id}`);
    return this.prisma.coffee.update({
      where: { id },
      data: updateCoffee,
    });
  }

  async remove(id: string) {
    const coffee = await this.findOne(id);
    await this.prisma.coffee.delete({ where: { id: coffee.id } });
  }
}
