import type {RequestHandler} from 'express';
import {asyncHandler} from '../../shared/asyncHandler.ts';
import * as catalogService from './catalog.service.ts';

export const getContent: RequestHandler = asyncHandler(async (_request, response) => {
  response.json({data: await catalogService.getContent()});
});

export const getDestinations: RequestHandler = asyncHandler(async (_request, response) => {
  response.json({data: await catalogService.getCollection('destinations')});
});

export const getDestination: RequestHandler = asyncHandler(async (request, response) => {
  const destination = await catalogService.getById('destinations', request.params.id);
  if (!destination) {
    response.status(404).json({error: {code: 'DESTINATION_NOT_FOUND', message: 'Destination not found'}});
    return;
  }
  response.json({data: destination});
});

export const getPackages: RequestHandler = asyncHandler(async (_request, response) => {
  response.json({data: await catalogService.getCollection('tourPackages')});
});

export const getPackage: RequestHandler = asyncHandler(async (request, response) => {
  const tourPackage = await catalogService.getById('tourPackages', request.params.id);
  if (!tourPackage) {
    response.status(404).json({error: {code: 'PACKAGE_NOT_FOUND', message: 'Package not found'}});
    return;
  }
  response.json({data: tourPackage});
});
