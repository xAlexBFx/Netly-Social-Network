import { z } from 'zod';

export const settingsSchema = z.object({
    settings: z.object({
        privateAccount: z.boolean({
            invalid_type_error: 'Invalid account status!'
        }).optional(),
        language: z.string({
            invalid_type_error: 'Invalid language!'
        }).optional(),
        restrictedMode: z.boolean({
            invalid_type_error: 'Invalid restricted status!'
        }).optional(),
        showStatus: z.boolean({
            invalid_type_error: 'Invalid show status!'
        }).optional(),
    }).strict()
});

