import express, { type Request, type Response } from "express";
declare const getOrder: (req: Request, res: Response) => Promise<void>;
declare const getAllOrder: (req: Request, res: Response) => Promise<void>;
declare const updateOrder: (req: Request, res: Response) => Promise<void>;
declare const createOrder: (req: Request, res: Response) => Promise<express.Response<any, Record<string, any>> | undefined>;
declare const queryOrder: (req: Request, res: Response) => Promise<void>;
declare const refund: (req: Request, res: Response) => Promise<void>;
declare const queryFund: (req: Request, res: Response) => Promise<void>;
declare const closeOrder: (req: Request, res: Response) => Promise<void>;
declare const notifyUrl: (req: Request, res: Response) => Promise<express.Response<any, Record<string, any>> | undefined>;
export { createOrder, queryOrder, refund, queryFund, closeOrder, notifyUrl, getOrder, getAllOrder, updateOrder };
//# sourceMappingURL=ordercontroller.d.ts.map