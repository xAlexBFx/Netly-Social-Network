import { z } from 'zod';

export const createCommentSchema = z.object({
    message: z.string({
        required_error: 'The message is required',
        invalid_type_error: 'Invalid message'
    })
});