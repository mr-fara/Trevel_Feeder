import * as adminRepository from './admin.repository.ts';
import type {RequestListQuery} from './admin.schema.ts';
import type {EnquiryStatus, TransferStatus} from './admin.repository.ts';
import {saveContentDocument} from './admin.repository.ts';
import type {ManagedContentCollection} from './admin.content.schema.ts';

export const getDashboardStats = () => adminRepository.getDashboardStats();
export const listEnquiries = (query: RequestListQuery) => adminRepository.listEnquiries(query);
export const listTransfers = (query: RequestListQuery) => adminRepository.listTransfers(query);
export const updateEnquiryStatus = (id: string, status: EnquiryStatus) => adminRepository.updateEnquiryStatus(id, status);
export const updateTransferStatus = (id: string, status: TransferStatus) => adminRepository.updateTransferStatus(id, status);
export const saveContent = (collection: ManagedContentCollection, payload: unknown) => saveContentDocument(collection, payload);
export const getAdminProfile = (id: string) => adminRepository.getAdminProfile(id);
export const updateAdminProfile = (id: string, displayName: string, email: string) => adminRepository.updateAdminProfile(id, displayName, email);
export const updateAdminPassword = (id: string, passwordHash: string) => adminRepository.updateAdminPassword(id, passwordHash);
