import type { Request, Response } from "express";
declare const addCart: (req: Request, res: Response) => Promise<void>;
declare const removeFromCart: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const getCart: (req: Request, res: Response) => Promise<void>;
export { addCart, removeFromCart, getCart };
//# sourceMappingURL=cartcontroller.d.ts.map