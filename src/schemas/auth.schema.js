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
    phoneNumber: z.string({
        invalid_type_error: 'Invalid phone number'
    }).regex(/^\d{1,3}-\d{3}-\d{3}-\d{4}$/, {
        message: 'Your phone number must see like this "+xxx-xxx-xxx-xxx"'
    }).optional(),
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
    birthday: z.string().date({
        required_error: 'Birthday is required',
        invalid_type_error: 'Invalid Birthday'
    }).max(new Date(), {
        message: 'You are too young'
    })
});

export const loginSchema = z.object({
    toFindUserData: z.string({
        required_error: 'Email, username or phone number is required',
    }).or(z.string().email({
        message: 'Invalid email'
    })).or(z.string().regex(/^\d{1,3}-\d{3}-\d{3}-\d{4}$/, {
        message: 'Your phone number must see like this "+xxx-xxx-xxx-xxx"'
    })),
    password: z.string({
        required_error: 'Password is required',
        invalid_type_error: 'Invalid password'
    })
    .min(6, {
        message: 'Your password must have 6 characters'
    })
});