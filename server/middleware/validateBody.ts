import type {RequestHandler} from 'express';
import type {z} from 'zod';
import {HttpError} from '../shared/httpError.ts';

export function validateBody<T extends z.ZodType>(schema: T): RequestHandler {
  return (request, _response, next) => {
    const result = schema.safeParse(request.body);
    if (!result.success) {
      const details = result.error.issues.map(({path, message, code}) => ({path, message, code}));
      next(new HttpError(400, 'Request validation failed', 'VALIDATION_ERROR', details));
      return;
    }

    request.body = result.data;
    next();
  };
}
