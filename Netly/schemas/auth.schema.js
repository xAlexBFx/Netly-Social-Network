import { z } from 'zod';

export const emailSchema = z.string({
    }).email({
        message: 'Invalid email.'
    });

export const usernameSchema = z.string({
        invalid_type_error: 'Invalid username'
    }).min(5, {
        message: 'The username must have at least 5 characters.'
    }).regex(/^[a-zA-Z0-9_-]+$/, {
        message: 'Username must not include spaces and only "-_" allowed.'
    });

export const birthdaySchema = z.string().date({
        invalid_type_error: 'Invalid birth date.'
    }).max(new Date(), {
        message: 'You are too young.'
    });

export const passwordSchema = z.string({
        invalid_type_error: 'Invalid password'
    }).min(6, {
        message: 'The password must have at least 6 characters.'
    }).regex(/\d.*\d/, {
        message: 'Password must include at least 2 numbers.'
    });



// export const registerSchema = z.object({
//     username: z.string({
//         required_error: 'Username is required',
//         invalid_type_error: 'Invalid username'
//     }),

//     description: z.string({invalid_type_error: 'Invalid description'}).optional(),
//     gender: z.string({
//         required_error: 'Gender is required'
//     }),
//     nationality: z.string({
//         required_error: 'Nationality is required'
//     }),
// });

// export const loginSchema = z.object({
//     toFindUserData: z.string({
//         required_error: 'Email or username is required',
//     }).or(z.string().email({
//         message: 'Invalid email'
//     })),
//     password: z.string({
//         required_error: 'Password is required',
//         invalid_type_error: 'Invalid password'
//     })
//     .min(6, {
//         message: 'Your password must have 6 characters'
//     })
// });