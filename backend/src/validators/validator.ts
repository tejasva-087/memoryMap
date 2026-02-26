import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

const validator =
  (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        status: "fail",
        errors: result.error.flatten(),
      });
    }

    req.body = result.data;
    next();
  };

export default validator;
