import { z } from 'zod';

export const createCommentSchema = z.object({
    message: z.string({
        required_error: 'The body is required',
        invalid_type_error: 'Invalid body'
    })
});