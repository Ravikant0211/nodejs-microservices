import { ICatalogRepository } from "../interface/catalogRepository.interface";
import { Product } from "../models/product";

export class CatalogRepository implements ICatalogRepository {
    create(data: any): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    update(data: any): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findOne(id: number): Promise<Product | null> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }
    
}