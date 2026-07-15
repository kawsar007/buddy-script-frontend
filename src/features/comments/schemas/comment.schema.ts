import { z } from 'zod';


export const commentTextSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, 'Write a comment first')
    .max(1000, 'Max 1000 characters'),
});

export type CommentTextValues = z.infer<typeof commentTextSchema>;
