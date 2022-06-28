import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { COFFEE_BRANDS } from './coffees.constant';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';

class ConfigService {}
class DevelopmentConfigService {}
class ProductionConfigService {}
@Module({
  imports: [PrismaModule],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    { provide: COFFEE_BRANDS, useValue: ['Cappuccino', 'Latte', 'Mocha'] },
    {
      provide: ConfigService,
      useClass:
        process.env.NODE_ENV === 'development'
          ? DevelopmentConfigService
          : ProductionConfigService,
    },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
