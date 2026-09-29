import {Router} from 'express';
import {validateBody} from '../../middleware/validateBody.ts';
import {submitTransfer} from './transfer.controller.ts';
import {transferSchema} from './transfer.schema.ts';

export const transferRouter = Router();
transferRouter.post('/', validateBody(transferSchema), submitTransfer);
