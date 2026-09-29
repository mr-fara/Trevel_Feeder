import type {RequestHandler} from 'express';
import {asyncHandler} from '../../shared/asyncHandler.ts';
import {createTransferRequest} from './transfer.service.ts';
import type {TransferInput} from './transfer.schema.ts';

export const submitTransfer: RequestHandler = asyncHandler(async (request, response) => {
  const transfer = await createTransferRequest(request.body as TransferInput);
  response.status(201).json({data: transfer});
});
