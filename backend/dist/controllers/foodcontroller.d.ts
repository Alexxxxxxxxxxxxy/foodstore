import type { Request, Response } from "express";
declare const addFood: (req: Request, res: Response) => Promise<void>;
declare const foodList: (req: Request, res: Response) => Promise<void>;
declare const removeFood: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export { addFood, foodList, removeFood };
//# sourceMappingURL=foodcontroller.d.ts.map