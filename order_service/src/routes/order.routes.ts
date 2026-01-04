import express, { NextFunction, Request, Response } from 'express';

const router = express.Router();

router.post("/order", (req: Request, res: Response, next: NextFunction) => {
    return res.status(201).json({ message: "order created successfully" });
})

router.get("/order", (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({ message: "order retrieved successfully" });
})

router.get("/order/:id", (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({ message: "order retrieved successfully" });
})

router.delete("/order/:id", (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({ message: "order deleted successfully" });
})

export default router;