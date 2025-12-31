import { ICatalogRepository } from "../interface/catalogRepository.interface";
import { Product } from "../models/product";
import { ProductFactory } from "../utils/fixtures";
import { prisma } from "../lib/prisma";

export class CatalogRepository implements ICatalogRepository {

    _prisma: typeof prisma;

    constructor() {
        this._prisma = prisma;
    }

    async create(data: Product): Promise<Product> {
        return await this._prisma.product.create({ data });
    }

    async update(data: Product): Promise<Product> {
        return await this._prisma.product.update({
            where: { id: data.id },
            data,
        })
    }

    async delete(id: number): Promise<Product> {
        return await this._prisma.product.delete({
            where: { id }
        })
    }

    async findOne(id: number): Promise<Product> {
        const product = await this._prisma.product.findFirst({
            where: { id }
        })
        if (!product) throw new Error('Product not found');
        return product;
    }

    async findAll(limit: number, offset: number): Promise<Product[]> {
        return await this._prisma.product.findMany({
            take: limit,
            skip: offset
        })
    }
    
}