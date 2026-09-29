import * as transferRepository from './transfer.repository.ts';
import type {TransferInput} from './transfer.schema.ts';

export function createTransferRequest(input: TransferInput) {
  return transferRepository.createTransferRequest(input);
}
