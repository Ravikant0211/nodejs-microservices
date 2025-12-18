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
                .mockImplementationOnce(() => Promise.reject(new Error('error occurred on create product')))
            const response = await request(app)
                .post('/product')
                .send(requestBody)
                .set('Content-Type', 'application/json'); 
            expect(response.status).toBe(500);
            expect(response.body).toEqual('error occurred on create product');
        })
    })
})