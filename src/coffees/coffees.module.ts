import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';

@Module({
  controllers: [CoffeesController],
  providers: [CoffeesService, PrismaService],
})
export class CoffeesModule {}
