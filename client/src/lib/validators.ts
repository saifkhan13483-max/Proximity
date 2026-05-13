import { z } from 'zod'

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must be under 100 characters'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .min(10, 'Please enter a valid phone number')
    .refine((val) => val.replace(/\D/g, '').length === 10, {
      message: 'Phone number must be 10 digits',
    }),
  serviceOfInterest: z.enum(
    ['Credit Analysis', 'Dispute Filing', 'Score Monitoring', 'Debt Validation', 'Not Sure'],
    { errorMap: () => ({ message: 'Please select a service' }) }
  ),
  message: z
    .string()
    .min(20, 'Message must be at least 20 characters')
    .max(1000, 'Message must be under 1000 characters'),
})

export type ContactFormSchema = z.infer<typeof contactFormSchema>
