import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import {env} from './config/env.ts';
import {apiRouter} from './api.routes.ts';
import {errorHandler} from './middleware/errorHandler.ts';
import {notFound} from './middleware/notFound.ts';
import {requestId} from './middleware/requestId.ts';

export const app = express();

app.disable('x-powered-by');
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      imgSrc: ["'self'", 'data:', 'https://images.unsplash.com'],
      ...(env.NODE_ENV === 'development' ? {
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'blob:'],
        workerSrc: ["'self'", 'blob:'],
      } : {}),
    },
  },
}));
app.use(requestId);
app.use(express.json({limit: '32kb'}));
app.use((request, response, next) => {
  const startedAt = Date.now();
  response.on('finish', () => {
    console.info(JSON.stringify({
      event: 'http_request',
      requestId: response.locals.requestId,
      method: request.method,
      path: request.originalUrl.split('?')[0],
      status: response.statusCode,
      durationMs: Date.now() - startedAt,
    }));
  });
  next();
});

app.use('/api', rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 120,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  handler: (_request, response) => {
    response.status(429).json({error: {code: 'RATE_LIMITED', message: 'Too many requests'}});
  },
}));
app.use('/api', apiRouter);
app.use('/api', notFound);
