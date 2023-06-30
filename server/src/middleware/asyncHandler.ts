import { Request, Response, NextFunction } from "express";
// this asyncHandler file is needed to catch the error in express, it saves as try catch code....
// when writing catch(next) the err param transferred to next

const asyncHandler = (fn: any) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
