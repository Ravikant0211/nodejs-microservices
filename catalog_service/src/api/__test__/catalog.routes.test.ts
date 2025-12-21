import request from 'supertest';
import express from 'express';
import { faker } from '@faker-js/faker';
import CatalogRoutes, { catalogService } from '../catalog.routes';
import { ProductFactory } from '../../utils/fixtures';

const app = express();
app.use(express.json());

app.use(CatalogRoutes);

const mockRequest = () => {
    return {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      stock: faker.number.int({ min: 10, max: 100 }),
      price: +faker.commerce.price()
    };
}

describe("Catalog Routes", () => {
    describe("POST /product", () => {
        test("Should create product successfully", async () => {
            const requestBody = mockRequest();
            const product = ProductFactory.build();
            jest
                .spyOn(catalogService, "createProduct")
                .mockImplementationOnce(() => Promise.resolve(product))
            const response = await request(app)
                .post('/product')
                .send(requestBody)
                .set('Content-Type', 'application/json'); 
            expect(response.status).toBe(201);
            expect(response.body).toEqual(product);
        })

        test("Should response with validation error 400", async () => {
            const requestBody = mockRequest();
            const response = await request(app)
                .post('/product')
                .send({...requestBody, name: ""})
                .set('Content-Type', 'application/json'); 
            expect(response.status).toBe(400);
            expect(response.body).toEqual("name should not be empty");
        })

        test("Should response with an internal error code 500", async () => {
            const requestBody = mockRequest();
            jest
                .spyOn(catalogService, "createProduct")
                .mockImplementationOnce(() => Promise.reject(new Error('Unable to create the Product')))
            const response = await request(app)
                .post('/product')
                .send(requestBody)
                .set('Content-Type', 'application/json'); 
            expect(response.status).toBe(500);
            expect(response.body).toEqual('Unable to create the Product');
        })
    })

    describe("PATCH /product/:id", () => {
        test("Should update product successfully", async () => {
            const product = ProductFactory.build();
            const requestBody = {
                name: product.name,
                price: product.price,
                stock: product.stock,
            };
            jest
                .spyOn(catalogService, "updateProduct")
                .mockImplementationOnce(() => Promise.resolve(product))
            const response = await request(app)
                .patch(`/product/${product.id}`)
                .send(requestBody)
                .set('Content-Type', 'application/json'); 
            expect(response.status).toBe(200);
            expect(response.body).toEqual(product);
        })

        test("Should response with validation error 400", async () => {
            const product = ProductFactory.build();
            const requestBody = {
                name: product.name,
                price: -10,
                stock: product.stock,
            };
            const response = await request(app)
                .patch(`/product/${product.id}`)
                .send({ ...requestBody })
                .set('Content-Type', 'application/json'); 
            expect(response.status).toBe(400);
            expect(response.body).toEqual("price must not be less than 1");
        })

        test("Should response with an internal error code 500", async () => {
            const product = ProductFactory.build();
            const requestBody = mockRequest();
            jest
                .spyOn(catalogService, "updateProduct")
                .mockImplementationOnce(() => Promise.reject(new Error('Unable to update the Product')))
            const response = await request(app)
                .patch(`/product/${product.id}`)
                .send(requestBody)
                .set('Content-Type', 'application/json'); 
            expect(response.status).toBe(500);
            expect(response.body).toEqual('Unable to update the Product');
        })
    })

    describe("GET /products?limit=0&offset=0", () => {
        test("Should return a range of products based on limit and offset", async () => {
            const randomLimit = faker.number.int({ min: 10, max: 50 });
            const products = ProductFactory.buildList(randomLimit);
            jest
                .spyOn(catalogService, "getProducts")
                .mockImplementationOnce(() => Promise.resolve(products))
            const response = await request(app)
                .get(`/products?limit=${randomLimit}&offset=0`)
                .set('Content-Type', 'application/json'); 
            expect(response.status).toBe(200);
            expect(response.body).toEqual(products);
        })
    })

    describe("GET /product/:id", () => {
        test("Should return a product by id", async () => {
            const product = ProductFactory.build();
            jest
                .spyOn(catalogService, "getProduct")
                .mockImplementationOnce(() => Promise.resolve(product))
            const response = await request(app)
                .get(`/product/${product.id}`)
                .set('Content-Type', 'application/json'); 
            expect(response.status).toBe(200);
            expect(response.body).toEqual(product);
        })
    })

    describe("DELETE /product/:id", () => {
        test("Should delete a product by id", async () => {
            const product = ProductFactory.build();
            jest
                .spyOn(catalogService, "deleteProduct")
                .mockImplementationOnce(() => Promise.resolve({ id: product.id }))
            const response = await request(app)
                .delete(`/product/${product.id}`)
                .set('Content-Type', 'application/json'); 
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ id: product.id });
        })
    })
})