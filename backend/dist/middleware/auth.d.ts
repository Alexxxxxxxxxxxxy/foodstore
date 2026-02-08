import type { NextFunction, Request, Response } from "express";
declare const authMiddleWare: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export default authMiddleWare;
//# sourceMappingURL=auth.d.ts.map