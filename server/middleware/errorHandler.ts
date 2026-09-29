import type {ErrorRequestHandler} from 'express';
import {HttpError} from '../shared/httpError.ts';

export const errorHandler: ErrorRequestHandler = (error: unknown, _request, response, _next) => {
  const requestId = response.locals.requestId as string | undefined;
  if (typeof error === 'object' && error !== null && 'type' in error) {
    const bodyError = error as {type?: string};
    if (bodyError.type === 'entity.parse.failed') {
      response.status(400).json({error: {code: 'INVALID_JSON', message: 'Request body must be valid JSON', requestId}});
      return;
    }
    if (bodyError.type === 'entity.too.large') {
      response.status(413).json({error: {code: 'PAYLOAD_TOO_LARGE', message: 'Request body is too large', requestId}});
      return;
    }
  }
  const databaseCode = typeof error === 'object' && error !== null && 'code' in error
    ? String(error.code)
    : '';
  const databaseUnavailable = ['ECONNREFUSED', 'ETIMEDOUT', '08001', '08006', '28P01', '3D000', '57P03'].includes(databaseCode);

  if (error instanceof HttpError) {
    response.status(error.statusCode).json({
      error: {code: error.code, message: error.message, details: error.details, requestId},
    });
    return;
  }

  console.error(JSON.stringify({event: 'request_error', requestId, error}));
  response.status(databaseUnavailable ? 503 : 500).json({
    error: {
      code: databaseUnavailable ? 'DATABASE_UNAVAILABLE' : 'INTERNAL_SERVER_ERROR',
      message: databaseUnavailable ? 'The service is temporarily unavailable' : 'An unexpected error occurred',
      requestId,
    },
  });
};
