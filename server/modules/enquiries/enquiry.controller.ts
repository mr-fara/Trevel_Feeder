import type {RequestHandler} from 'express';
import {asyncHandler} from '../../shared/asyncHandler.ts';
import {createEnquiry} from './enquiry.service.ts';
import type {EnquiryInput} from './enquiry.schema.ts';

export const submitEnquiry: RequestHandler = asyncHandler(async (request, response) => {
  const enquiry = await createEnquiry(request.body as EnquiryInput);
  response.status(201).json({data: enquiry});
});
