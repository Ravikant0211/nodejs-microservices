import { ICatalogRepository } from "../interface/catalogRepository.interface";
import { Product } from "../models/product";
import { ProductFactory } from "../utils/fixtures";

export class CatalogRepository implements ICatalogRepository {
    create(data: any): Promise<Product> {
        const product = ProductFactory.build();
        return Promise.resolve(product);
    }
    update(data: any): Promise<Product> {
        const product = ProductFactory.build();
        return Promise.resolve(product);
    }
    delete(id: number): Promise<Product> {
        const product = ProductFactory.build();
        return Promise.resolve(product);
    }
    findOne(id: number): Promise<Product | null> {
        const product = ProductFactory.build();
        return Promise.resolve(product);
    }
    findAll(limit: number, offset: number): Promise<Product[]> {
        const products = ProductFactory.buildList(limit);
        return Promise.resolve(products);
    }
    
}