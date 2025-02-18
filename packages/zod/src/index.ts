import z from "zod";

export const SignInValidation = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(55)
})

export const SignUpValidation = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string().min(6).max(55)
})
