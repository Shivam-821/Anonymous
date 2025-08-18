import {z} from 'zod'

export const usernameValidation = z
    .string()
    .min(2, "Username must have atleast 2 character")
    .max(20, "Username must not be greater than 20 characters")
    .regex(/^[a-zA-Z0-9]+$/, "Username must not contain special character")


export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: 'Invalid email address'}),
    password: z.string().min(6, {message: "Password must be at least 6 characters"})
})