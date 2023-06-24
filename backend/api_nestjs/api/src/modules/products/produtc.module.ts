import { ProductsPrismaRepository } from './repositories/prisma/product.repository';
import { PrismaService } from 'src/shared/database/prisma.service';
import { ProductController } from './controllers/product.controller';
import { ProductsService } from './services/product.service';
import { ProductsRepository } from './repositories/product.repository';
import { Module } from '@nestjs/common';

@Module({
  controllers: [ProductController],
  providers: [
    ProductsService,
    PrismaService,
    {
      provide: ProductsRepository,
      useClass: ProductsPrismaRepository,
    },
  ],
  exports: [ProductsService],
})
export class ProductModule {}
