import { z } from 'zod';

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const postFormSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, 'Write something before posting')
    .max(5000, 'Max 5000 characters'),
  visibility: z.enum(['PUBLIC', 'PRIVATE']),
  image: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_IMAGE_BYTES, 'Image must be 5MB or smaller')
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only JPEG, PNG, or WEBP images are allowed',
    )
    .optional(),
});

export type PostFormValues = z.infer<typeof postFormSchema>;
