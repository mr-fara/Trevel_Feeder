import * as enquiryRepository from './enquiry.repository.ts';
import type {EnquiryInput} from './enquiry.schema.ts';

export function createEnquiry(input: EnquiryInput) {
  return enquiryRepository.createEnquiry(input);
}
