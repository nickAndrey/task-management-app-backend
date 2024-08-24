import { NextFunction, Request, Response } from 'express';
import DTO from '../types/dto.type';

type Args = {
  dto: DTO;
};

const checkDtoMiddleware = ({ dto }: Args) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const validationErrors: { field: string; valid: boolean; msg?: string }[] = [];
    const requiredFields = Object.keys(dto).filter((field) => dto[field].required);
    const fieldsFromRequest = new Set(Object.keys(req.body));
    const missedFields: string[] = [];

    for (const field of requiredFields) {
      if (!fieldsFromRequest.has(field)) {
        missedFields.push(field);
      }

      const validateFn = dto?.[field]?.validate;

      if (typeof validateFn === 'function') {
        const validateRes = validateFn(req.body[field]);

        if (!validateRes.valid) {
          validationErrors.push({ field, ...validateRes });
        }
      }
    }

    if (missedFields.length > 0) {
      return res.status(400).send({
        data: missedFields,
        success: false,
        msg: `The following required fields are missing: ${missedFields.join(', ')}`,
      });
    }

    if (validationErrors.length > 0) {
      return res.status(400).send({
        data: validationErrors.map((item) => ({ field: item.field, msg: item.msg })),
        success: false,
        msg: `The request contains invalid fields: ${validationErrors
          .map((item) => item.field)
          .join(', ')}. Please correct the errors and try again.`,
      });
    }

    return next();
  };
};

export default checkDtoMiddleware;
