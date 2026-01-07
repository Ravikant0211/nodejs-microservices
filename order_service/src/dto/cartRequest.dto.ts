import { Static, Type } from "@sinclair/typebox";

export const CartRequestSchema = Type.Object({
    productId: Type.Integer({ description: "ID of the product to add to the cart" }),
    customerId: Type.Integer({ description: "ID of the customer" }),
    qty: Type.Integer({ description: "Quantity of the product to add" }),
})

export type CartRequestInput = Static<typeof CartRequestSchema>;

export const CartEditRequestSchema = Type.Object({
    id: Type.Integer({ description: "ID of the cart item" }),
    qty: Type.Integer({ description: "Quantity of the product to add" }),
})

export type CartEditRequestInput = Static<typeof CartEditRequestSchema>;
