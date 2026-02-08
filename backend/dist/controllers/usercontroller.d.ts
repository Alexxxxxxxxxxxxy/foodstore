import type { Request, Response } from "express";
declare const login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const register: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export { login, register };
//# sourceMappingURL=usercontroller.d.ts.map