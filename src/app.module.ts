import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';

@Module({
  imports: [CoffeesModule, PrismaModule, CoffeeRatingModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
