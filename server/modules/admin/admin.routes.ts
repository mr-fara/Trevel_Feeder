import {Router} from 'express';
import rateLimit from 'express-rate-limit';
import {requireAdmin} from '../../middleware/requireAdmin.ts';
import {validateBody} from '../../middleware/validateBody.ts';
import * as controller from './admin.controller.ts';
import {adminPasswordSchema, adminProfileSchema, enquiryStatusSchema, loginSchema, transferStatusSchema} from './admin.schema.ts';

export const adminRouter = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 8,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  handler: (_request, response) => {
    response.status(429).json({error: {code: 'LOGIN_RATE_LIMITED', message: 'Too many sign-in attempts. Try again later.'}});
  },
});

adminRouter.post('/auth/login', loginLimiter, validateBody(loginSchema), controller.login);
adminRouter.get('/auth/session', requireAdmin, controller.getSession);
adminRouter.post('/auth/logout', requireAdmin, controller.logout);
adminRouter.use(requireAdmin);
adminRouter.put('/account/profile', validateBody(adminProfileSchema), controller.updateProfile);
adminRouter.patch('/account/password', validateBody(adminPasswordSchema), controller.changePassword);
adminRouter.get('/dashboard', controller.getDashboard);
adminRouter.get('/enquiries', controller.getEnquiries);
adminRouter.patch('/enquiries/:id/status', validateBody(enquiryStatusSchema), controller.patchEnquiryStatus);
adminRouter.get('/transfers', controller.getTransfers);
adminRouter.patch('/transfers/:id/status', validateBody(transferStatusSchema), controller.patchTransferStatus);
adminRouter.put('/content/:collection', controller.putContent);
