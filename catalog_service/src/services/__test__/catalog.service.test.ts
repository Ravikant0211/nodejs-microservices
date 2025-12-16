import { ICatalogRepository } from "../../interface/catalogRepository.interface";
import { Product } from "../../models/product";
import { MockCatalogRepository } from "../../repository/mockCatalog.repository";
import { CatalogService } from "../catalog.service";
import { faker } from '@faker-js/faker';
import { Factory } from 'rosie';

const productFactory = new Factory<Product>()
    .attr("id", faker.number.int({ min: 1, max: 1000 }))
    .attr("name", faker.commerce.productName())
    .attr("description", faker.commerce.productDescription())
    .attr("stock", faker.number.int({ min: 10, max: 100 }))
    .attr("price", +faker.commerce.price())


const mockProduct = (rest) => {
    return {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      stock: faker.number.int({ min: 10, max: 100 }),
      ...rest
    };
}

describe("catalogService", () => {
  
    let repository: ICatalogRepository;

    beforeEach(() => {
        repository = new MockCatalogRepository();
    })

    afterEach(() => {
        repository = {} as MockCatalogRepository;
    })

    describe("createProduct", () => {

        test("should create product", async () => {
            const service = new CatalogService(repository);
            const reqBody = mockProduct({
                price: +faker.commerce.price(),
            });
            const result = await service.createProduct(reqBody);
            expect(result).toMatchObject({
                id: expect.any(Number),
                name: expect.any(String),
                description: expect.any(String),
                price: expect.any(Number),
                stock: expect.any(Number),
            })
        })

        test("should throw error if unable to create product", async () => {
          const service = new CatalogService(repository);
          const reqBody = mockProduct({
            price: +faker.commerce.price(),
          });

          jest
            .spyOn(repository, "create")
            .mockImplementation(() => Promise.resolve({} as Product));

          await expect(service.createProduct(reqBody)).rejects.toThrow(
            "Unable to create the Product"
          );
        });

        test("should throw error if product already exists", async () => {
          const service = new CatalogService(repository);
          const reqBody = mockProduct({
            price: +faker.commerce.price(),
          });

          jest
            .spyOn(repository, "create")
            .mockImplementation(() => Promise.reject(new Error('Product already exists')));

          await expect(service.createProduct(reqBody)).rejects.toThrow(
            "Product already exists"
          );
        });

    })

    describe("updateProduct", () => {
        test("should update product", async () => {
            const service = new CatalogService(repository);
            const reqBody = mockProduct({
                price: +faker.commerce.price(),
                id: faker.number.int({ min: 10, max: 1000 })
            });
            const result = await service.updateProduct(reqBody);
            expect(result).toMatchObject(reqBody);
        })   
        
        test("should throw error if product does not exists", async () => {
          const service = new CatalogService(repository);
          
          jest
            .spyOn(repository, "create")
            .mockImplementation(() => Promise.reject(new Error('Product does not exists')));

          await expect(service.createProduct({})).rejects.toThrow(
            "Product does not exists"
          );
        });
    })

    describe('getProducts', () => {

        test("should get products by offset and limit", async () => {
            const service = new CatalogService(repository);
            const randomLimit = faker.number.int({ min: 10, max: 50 });
            const products = productFactory.buildList(randomLimit);

            jest.spyOn(repository, "findAll").mockImplementationOnce(() => Promise.resolve(products))

            const results = await service.getProducts(randomLimit, 0);
            // console.log(results);
            expect(results.length).toEqual(randomLimit);
            expect(results).toMatchObject(products);
        })

        test("should throw error if products does not exists", async () => {
          const service = new CatalogService(repository);
          
          jest
            .spyOn(repository, "findAll")
            .mockImplementation(() => Promise.reject(new Error('Products does not exists')));

          await expect(service.getProducts(0, 0)).rejects.toThrow(
            "Products does not exists"
          );
        });
    })

    describe('getProduct', () => {
        test("Should get product by id", async () => {
          const service = new CatalogService(repository);
          const product = productFactory.build();

          jest
            .spyOn(repository, "findOne")
            .mockImplementationOnce(() => Promise.resolve(product));

          const results = await service.getProduct(product.id!);
          // console.log(results);
          expect(results).toMatchObject(product);
        });

        test("should throw error if product does not exist", async () => {
          const service = new CatalogService(repository);

          jest
            .spyOn(repository, "findOne")
            .mockImplementationOnce(() =>
              Promise.reject(new Error("Product doest not exists"))
            );

          await expect(service.getProduct(0)).rejects.toThrow(
            "Product doest not exists"
          );
        });
    })

    describe('deleteProduct', () => {
        test("Should delete product by id", async () => {
          const service = new CatalogService(repository);
          const product = productFactory.build();

          jest
            .spyOn(repository, "delete")
            .mockImplementationOnce(() => Promise.resolve({ id: product.id }));

          const results = await service.deleteProduct(product.id!);
          expect(results).toMatchObject({
            id: product.id
          });
        });
    })

});
