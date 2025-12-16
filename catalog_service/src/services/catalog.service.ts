import { ICatalogRepository } from "../interface/catalogRepository.interface";
import { Product } from "../models/product";

export class CatalogService {
  constructor(private readonly repository: ICatalogRepository) {}

  async createProduct(input: any) {
   const data = await this.repository.create(input);
   if (!data.id) {
    throw new Error('Unable to create the Product')
   }
   return data;
  }

  async updateProduct(input: any) {
    const data = await this.repository.update(input);
    // Emit an event to update data in elastic search
    return data;
  }

  async getProduct(id: number) {
    const product = await this.repository.findOne(id);
    return product;
  }

  // instead of this, we will get products from Elastic search
  async getProducts(limit: number, offset: number) {
    const products = await this.repository.findAll(limit, offset);

    return products;
  }

  async deleteProduct(id: number) {
    const response = await this.repository.delete(id);
    // delete product from Elastic search
    return response;
  }
}