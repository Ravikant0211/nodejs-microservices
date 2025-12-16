import { Product } from "../models/product";

export interface ICatalogRepository {
    create(data: any): Promise<Product>,
    update(data: any): Promise<Product>,
    delete(id: number): Promise<any>,
    findOne(id: number): Promise<Product | null>,
    findAll(limit: number, offset: number): Promise<Product[]>,
}