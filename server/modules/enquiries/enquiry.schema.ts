import {z} from 'zod';

const optionalText = (max: number) => z.string().trim().max(max).optional().or(z.literal('')).transform((value) => value || undefined);
const optionalDate = z.union([z.iso.date(), z.literal('')]).optional().transform((value) => value || undefined);

export const enquirySchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.email().max(254),
  phone: z.string().trim().min(7).max(32).regex(/^[+()\d\s.-]+$/),
  service: z.string().trim().min(2).max(100),
  destination: optionalText(200),
  travelDate: optionalDate,
  returnDate: optionalDate,
  passengers: z.union([z.string().trim().max(40), z.number().int().min(1).max(100)]).optional().transform((value) => value === undefined ? undefined : String(value)),
  tripType: optionalText(80),
  message: optionalText(4000),
  source: z.string().trim().max(80).optional().default('website'),
}).strict().refine((data) => !data.travelDate || !data.returnDate || data.returnDate >= data.travelDate, {
  message: 'Return date must be on or after departure date',
  path: ['returnDate'],
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
