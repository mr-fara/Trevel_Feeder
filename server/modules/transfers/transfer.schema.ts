import {z} from 'zod';

const optionalText = (max: number) => z.string().trim().max(max).optional().or(z.literal('')).transform((value) => value || undefined);

export const transferSchema = z.object({
  airport: z.string().trim().min(2).max(160),
  destination: z.string().trim().min(2).max(200),
  arrivalDate: z.iso.date(),
  arrivalTime: z.union([z.iso.time({precision: -1}), z.literal('')]).optional().transform((value) => value || undefined),
  flightNumber: optionalText(32),
  passengers: z.coerce.number().int().min(1).max(50),
  vehicleType: z.string().trim().min(2).max(100),
  fullName: z.string().trim().min(2).max(120),
  email: z.email().max(254),
  phone: z.string().trim().min(7).max(32).regex(/^[+()\d\s.-]+$/),
}).strict();

export type TransferInput = z.infer<typeof transferSchema>;
