import type {RequestHandler} from 'express';

export const notFound: RequestHandler = (request, response) => {
  response.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: `No API route for ${request.method} ${request.path}`,
      requestId: response.locals.requestId,
    },
  });
};
