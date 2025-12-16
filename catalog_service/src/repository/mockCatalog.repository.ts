import { ICatalogRepository } from "../interface/catalogRepository.interface";
import { Product } from "../models/product";

export class MockCatalogRepository implements ICatalogRepository {
  create(data: any): Promise<Product> {
    const mockedProduct = {
      id: 123,
      ...data,
    } as Product;

    return Promise.resolve(mockedProduct);
  }

  update(data: any): Promise<Product> {
    return Promise.resolve(data as unknown as Product);
  }

  delete(id: number): Promise<any> {
    return Promise.resolve({ id });
  }
  findOne(id: number): Promise<Product | null> {
    return Promise.resolve({ id } as unknown as Product);
  }
  findAll(limit: number, offset: number): Promise<Product[]> {
    return Promise.resolve([]);
  }
}
