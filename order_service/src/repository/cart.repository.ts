import { DB } from "../db/db.connection";
import { cartsTable } from "../db/schema";
import { CartRepositoryType } from "../types/repository.type";

const createCart = async (input: any): Promise<{}> => {
  const result = await DB.insert(cartsTable).values({
    customerId: 123,
  }).returning({ cartId: cartsTable.id });
  console.log("result", result);
  return Promise.resolve({ message: "Fake response from createCart", result });
};

const findCart = async (input: any): Promise<{}> => {
  return Promise.resolve({});
};

const updateCart = async (input: any): Promise<{}> => {
  return Promise.resolve({}); 
};

const deleteCart = async (input: any): Promise<{}> => {
  return Promise.resolve({});
};

export const CartRepository: CartRepositoryType = {
  create: createCart,
  find: findCart,
  update: updateCart,
  delete: deleteCart,
};