import { CartRequestInput } from "../dto/cartRequest.dto";
import { CartRepositoryType } from "../types/repository.type";
import { getProductDetails } from "../utils/broker";

export const CreateCart = async (input: CartRequestInput, repo: CartRepositoryType) => {

    // make a call to catalog microservice in sync way to check product availability
    const product = await getProductDetails(input.productId);
    if (product.stock < input.qty) {
        throw new Error('product out of stock');
    }
    const data = await repo.create(input);
    return data;
}

export const GetCart = async (input: any, repo: CartRepositoryType) => {
    const data = await repo.find(input);
    return data;
}

export const EditCart = async (input: any, repo: CartRepositoryType) => {
    const data = await repo.update(input);
    return data;
}

export const DeleteCart = async (input: any, repo: CartRepositoryType) => {
    const data = await repo.delete(input);
    return data;
}