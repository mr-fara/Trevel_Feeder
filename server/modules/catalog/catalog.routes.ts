import {Router} from 'express';
import * as controller from './catalog.controller.ts';

export const catalogRouter = Router();

catalogRouter.get('/content', controller.getContent);
catalogRouter.get('/destinations', controller.getDestinations);
catalogRouter.get('/destinations/:id', controller.getDestination);
catalogRouter.get('/packages', controller.getPackages);
catalogRouter.get('/packages/:id', controller.getPackage);
