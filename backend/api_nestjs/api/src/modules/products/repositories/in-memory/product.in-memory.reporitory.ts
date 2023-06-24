import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../../dtos/create-product-body';
import { PrecoProdutos } from '../../entities/product.entity';
import { ProductsRepository } from '../product.repository';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ProdutcsInMemoryRepository implements ProductsRepository {
  private database = {};
  private databasePath = path.resolve(__dirname, '../../../../../db.json');

  private persist() {
    fs.writeFile(this.databasePath, JSON.stringify(this.database));
  }

  constructor() {
    fs.readFile(this.databasePath, 'utf8')
      .then((data) => {
        this.database = JSON.parse(data);
      })
      .catch(() => {
        this.persist();
      });
  }

  create(data: CreateProductDto): PrecoProdutos | Promise<PrecoProdutos> {
    const newProdutcs = new PrecoProdutos();
    Object.assign(newProdutcs, {
      ...data,
    });
    if (Array.isArray(this.database['products'])) {
      this.database['products'].push(newProdutcs);
    } else {
      this.database['products'] = [newProdutcs];
    }
    this.persist();
    return plainToInstance(PrecoProdutos, newProdutcs);
  }

  findByEmail(nomeProduto: string): PrecoProdutos | Promise<PrecoProdutos> {
    const produtc = this.database['products'].find(
      (produtc: PrecoProdutos) => produtc.nomeProduto === nomeProduto,
    );
    return plainToInstance(PrecoProdutos, produtc);
  }

  findAll(): Promise<PrecoProdutos[]> | PrecoProdutos[] {
    const produtcs: PrecoProdutos[] = this.database['produtcs'] || [];
    return plainToInstance(PrecoProdutos, produtcs);
  }

  findOne(id: number): PrecoProdutos | Promise<PrecoProdutos> {
    const produtcs = this.database['produtc'].find(
      (produtcs: PrecoProdutos) => produtcs.id === id,
    );
    return plainToInstance(PrecoProdutos, produtcs);
  }

  delete(id: number): void | Promise<void> {
    const produtcIndex = this.database['produtcs'].findIndex(
      (produtcs: PrecoProdutos) => produtcs.id === id,
    );
    this.database['produtcs'].splice(produtcIndex, 1);
    this.persist();
  }
}
