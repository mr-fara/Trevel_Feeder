import {z} from 'zod';

export const loginSchema = z.object({
  email: z.email().max(254),
  password: z.string().min(1).max(200),
}).strict();

export const listQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  status: z.string().optional(),
  search: z.string().trim().max(120).optional(),
});

export const enquiryStatusSchema = z.object({
  status: z.enum(['new', 'contacted', 'confirmed', 'closed']),
}).strict();

export const transferStatusSchema = z.object({
  status: z.enum(['new', 'confirmed', 'completed', 'cancelled']),
}).strict();

export type RequestListQuery = z.infer<typeof listQuerySchema>;
