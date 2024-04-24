import { z } from 'zod';

export const createPostSchema = z.object({
    title: z.string({
        required_error: 'Title is required',
        invalid_type_error: 'Invalid title'
    }),
    description: z.string({
        required_error: 'Description is required',
        invalid_type_error: 'Invalid description'
    }),
    shareStatus: z.boolean({
        invalid_type_error: 'The share status must be public or private'
    }).optional(),
});

export const updatePostSchema = z.object({
    title: z.string({
        invalid_type_error: 'Invalid title'
    }).optional(),
    description: z.string({
        invalid_type_error: 'Invalid description'
    }).optional(),
    shareStatus: z.boolean({
        invalid_type_error: 'The share status must be public or private'
    }).optional(),
});