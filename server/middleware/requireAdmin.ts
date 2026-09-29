import {parseCookie} from 'cookie';
import type {RequestHandler} from 'express';
import {adminSessionCookie, readAdminSession} from '../modules/admin/admin.auth.ts';

export const requireAdmin: RequestHandler = (request, response, next) => {
  const token = parseCookie(request.headers.cookie ?? '')[adminSessionCookie.name];
  if (!token) {
    response.status(401).json({error: {code: 'ADMIN_AUTH_REQUIRED', message: 'Admin sign-in required'}});
    return;
  }

  void readAdminSession(token).then((email) => {
    if (!email) {
      response.status(401).json({error: {code: 'ADMIN_SESSION_EXPIRED', message: 'Admin session expired'}});
      return;
    }
    response.locals.adminEmail = email;
    next();
  }).catch(next);
};
