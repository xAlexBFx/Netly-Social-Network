import { z } from 'zod';

export const registerSchema = z.object({
    username: z.string({
        required_error: 'Username is required',
        invalid_type_error: 'Invalid username'
    }),
    email: z.string({
        required_error: 'Email is required',
        invalid_type_error: 'Invalid email'
    }).email({
        message: 'Invalid email'
    }),
    password: z.string({
        required_error: 'Password is required',
        invalid_type_error: 'Invalid password'
    })
    .min(6, {
        message: 'The password must be at least 6 characters'
    }),
    description: z.string({invalid_type_error: 'Invalid description'}).optional(),
    gender: z.string({
        required_error: 'Gender is required'
    }),
    nationality: z.string({
        required_error: 'Nationality is required'
    }),
    birthDate: z.string().date({
        required_error: 'Birth date is required',
        invalid_type_error: 'Invalid birth date'
    }).max(new Date(), {
        message: 'You are too young'
    })
});

export const loginSchema = z.object({
    toFindUserData: z.string({
        required_error: 'Email or username is required',
    }).or(z.string().email({
        message: 'Invalid email'
    })),
    password: z.string({
        required_error: 'Password is required',
        invalid_type_error: 'Invalid password'
    })
    .min(6, {
        message: 'The password must be at least 6 characters'
    })
});