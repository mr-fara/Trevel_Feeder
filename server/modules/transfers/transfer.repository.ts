import {pool} from '../../db/pool.ts';
import type {TransferInput} from './transfer.schema.ts';

export async function createTransferRequest(input: TransferInput) {
  const result = await pool.query<{id: string; created_at: Date}>(
    `INSERT INTO transfer_requests
      (airport, destination, arrival_date, arrival_time, flight_number, passenger_count, vehicle_type, full_name, email, phone)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
     RETURNING id, created_at`,
    [input.airport, input.destination, input.arrivalDate, input.arrivalTime ?? null,
      input.flightNumber ?? null, input.passengers, input.vehicleType, input.fullName,
      input.email, input.phone],
  );

  return {id: result.rows[0].id, createdAt: result.rows[0].created_at};
}
