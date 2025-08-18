import {z} from 'zod'

export const singInSchema = z.object({
    identifier: z.string(), // username === identifier
    password: z.string(),
})