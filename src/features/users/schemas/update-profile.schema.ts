import { z } from 'zod';

// Mirrors UpdateProfileDto on the backend (users/dto/update-profile.dto.ts).
// firstName/lastName are required here even though the backend's DTO makes
// them technically optional-and-blankable — the frontend deliberately
// enforces the sane UX (never let a user submit a blank name) rather than
// exploiting the backend's looser validation.
export const updateProfileSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, 'First name is required')
    .max(50, 'Max 50 characters'),
  lastName: z
    .string()
    .trim()
    .min(1, 'Last name is required')
    .max(50, 'Max 50 characters'),
  bio: z.string().max(280, 'Max 280 characters').optional().or(z.literal('')),
  // Empty string is allowed at the form layer (means "no change" / "clear"),
  // but is stripped before the request is sent — the backend's @IsUrl
  // would reject an empty string outright. See EditProfileForm's onSubmit.
  avatarUrl: z
    .union([z.string().trim().url('Enter a valid URL'), z.literal('')])
    .optional(),
});

export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;
