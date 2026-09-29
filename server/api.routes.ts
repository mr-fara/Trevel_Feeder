import {Router} from 'express';
import rateLimit from 'express-rate-limit';
import {asyncHandler} from './shared/asyncHandler.ts';
import {pool} from './db/pool.ts';
import {catalogRouter} from './modules/catalog/catalog.routes.ts';
import {enquiryRouter} from './modules/enquiries/enquiry.routes.ts';
import {transferRouter} from './modules/transfers/transfer.routes.ts';
import {adminRouter} from './modules/admin/admin.routes.ts';

export const apiRouter = Router();

apiRouter.get('/health', asyncHandler(async (_request, response) => {
  await pool.query('SELECT 1');
  response.json({data: {status: 'ok', database: 'connected'}});
}));
apiRouter.use('/', catalogRouter);
const submissionLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  handler: (_request, response) => {
    response.status(429).json({error: {code: 'RATE_LIMITED', message: 'Too many submissions. Try again later.'}});
  },
});
apiRouter.use('/enquiries', submissionLimit, enquiryRouter);
apiRouter.use('/transfers', submissionLimit, transferRouter);
apiRouter.use('/admin', adminRouter);
