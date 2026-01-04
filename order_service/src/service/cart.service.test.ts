import { CartRepositoryType } from "../types/repository.type";
import * as repository from "../repository/cart.repository";
import { CreateCart } from "../service/cart.service";

describe("Cart Service", () => {

    let repo: CartRepositoryType

    beforeEach(() => {
        repo = repository.CartRepository;
    })

    afterEach(() => {
        repo = {} as CartRepositoryType;
    })

    test("should return correct data while creating cart", async () => {
        const mockCartData = { title: "Smartphone", price: 200 };

        jest.spyOn(repo, "create").mockImplementationOnce(() => Promise.resolve({
            message: "Fake response from createCart",
            input: mockCartData
        }))

        const res = await CreateCart(mockCartData, repo);

        expect(res).toEqual({
            message: "Fake response from createCart",
            input: mockCartData
        })
    })
});