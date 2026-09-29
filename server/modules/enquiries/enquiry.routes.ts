import {Router} from 'express';
import {validateBody} from '../../middleware/validateBody.ts';
import {submitEnquiry} from './enquiry.controller.ts';
import {enquirySchema} from './enquiry.schema.ts';

export const enquiryRouter = Router();
enquiryRouter.post('/', validateBody(enquirySchema), submitEnquiry);
