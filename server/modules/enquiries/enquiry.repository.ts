import {pool} from '../../db/pool.ts';
import type {EnquiryInput} from './enquiry.schema.ts';

export async function createEnquiry(input: EnquiryInput) {
  const result = await pool.query<{id: string; created_at: Date}>(
    `INSERT INTO enquiries
      (full_name, email, phone, service, destination, travel_date, return_date, passengers, trip_type, message, source)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
     RETURNING id, created_at`,
    [input.fullName, input.email, input.phone, input.service, input.destination ?? null,
      input.travelDate ?? null, input.returnDate ?? null, input.passengers ?? null,
      input.tripType ?? null, input.message ?? null, input.source],
  );

  return {id: result.rows[0].id, createdAt: result.rows[0].created_at};
}
