import {stringifySetCookie} from 'cookie';
import type {RequestHandler} from 'express';
import {env} from '../../config/env.ts';
import {asyncHandler} from '../../shared/asyncHandler.ts';
import {HttpError} from '../../shared/httpError.ts';
import {adminSessionCookie, createAdminSession, isAdminSessionConfigured, verifyAdminCredentials} from './admin.auth.ts';
import * as adminService from './admin.service.ts';
import {enquiryStatusSchema, listQuerySchema, loginSchema, transferStatusSchema} from './admin.schema.ts';
import type {EnquiryStatus, TransferStatus} from './admin.repository.ts';
import {managedContentSchemas, type ManagedContentCollection} from './admin.content.schema.ts';

const sessionCookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  path: '/api/admin',
};

export const login: RequestHandler = asyncHandler(async (request, response) => {
  if (!isAdminSessionConfigured()) {
    throw new HttpError(503, 'Admin session signing is not configured on this server', 'ADMIN_NOT_CONFIGURED');
  }

  const credentials = loginSchema.parse(request.body);
  const admin = await verifyAdminCredentials(credentials.email, credentials.password);
  if (!admin) {
    throw new HttpError(401, 'Email or password is incorrect', 'INVALID_CREDENTIALS');
  }

  const token = await createAdminSession(admin.id, admin.email);
  response.setHeader('Set-Cookie', stringifySetCookie({name: adminSessionCookie.name, value: token,
    ...sessionCookieOptions,
    maxAge: adminSessionCookie.maxAge,
  }));
  response.json({data: {email: admin.email}});
});

export const getSession: RequestHandler = (_request, response) => {
  response.json({data: {email: response.locals.adminEmail}});
};

export const logout: RequestHandler = (_request, response) => {
  response.setHeader('Set-Cookie', stringifySetCookie({name: adminSessionCookie.name, value: '',
    ...sessionCookieOptions,
    maxAge: 0,
  }));
  response.status(204).end();
};

export const getDashboard: RequestHandler = asyncHandler(async (_request, response) => {
  response.json({data: await adminService.getDashboardStats()});
});

function getListQuery(request: Parameters<RequestHandler>[0]) {
  const result = listQuerySchema.safeParse(request.query);
  if (!result.success) {
    throw new HttpError(400, 'Invalid list filters', 'VALIDATION_ERROR', result.error.issues.map(({path, message}) => ({path, message})));
  }
  return result.data;
}

export const getEnquiries: RequestHandler = asyncHandler(async (request, response) => {
  const query = getListQuery(request);
  if (query.status && !enquiryStatusSchema.shape.status.safeParse(query.status).success) {
    throw new HttpError(400, 'Invalid enquiry status filter', 'VALIDATION_ERROR');
  }
  response.json({data: await adminService.listEnquiries(query)});
});

export const getTransfers: RequestHandler = asyncHandler(async (request, response) => {
  const query = getListQuery(request);
  if (query.status && !transferStatusSchema.shape.status.safeParse(query.status).success) {
    throw new HttpError(400, 'Invalid transfer status filter', 'VALIDATION_ERROR');
  }
  response.json({data: await adminService.listTransfers(query)});
});

export const patchEnquiryStatus: RequestHandler = asyncHandler(async (request, response) => {
  const {status} = enquiryStatusSchema.parse(request.body);
  const enquiry = await adminService.updateEnquiryStatus(request.params.id, status as EnquiryStatus);
  if (!enquiry) throw new HttpError(404, 'Enquiry not found', 'ENQUIRY_NOT_FOUND');
  response.json({data: enquiry});
});

export const patchTransferStatus: RequestHandler = asyncHandler(async (request, response) => {
  const {status} = transferStatusSchema.parse(request.body);
  const transfer = await adminService.updateTransferStatus(request.params.id, status as TransferStatus);
  if (!transfer) throw new HttpError(404, 'Transfer request not found', 'TRANSFER_NOT_FOUND');
  response.json({data: transfer});
});

export const putContent: RequestHandler = asyncHandler(async (request, response) => {
  const collection = request.params.collection;
  if (!Object.hasOwn(managedContentSchemas, collection)) {
    throw new HttpError(404, 'Managed content collection not found', 'CONTENT_COLLECTION_NOT_FOUND');
  }

  const key = collection as ManagedContentCollection;
  const validation = managedContentSchemas[key].safeParse(request.body);
  if (!validation.success) {
    throw new HttpError(400, 'Content validation failed', 'VALIDATION_ERROR', validation.error.issues.map(({path, message}) => ({path, message})));
  }

  await adminService.saveContent(key, validation.data);
  response.json({data: {collection: key, updated: true}});
});
