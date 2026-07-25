import {z} from "zod";
const password=z.string().min(8).max(72).regex(/[A-Z]/,"Add an uppercase letter").regex(/[a-z]/,"Add a lowercase letter").regex(/[0-9]/,"Add a number");
export const loginSchema=z.object({email:z.email().transform(v=>v.toLowerCase()),password:z.string().min(1)});
export const customerRegistrationSchema=z.object({fullName:z.string().min(2).max(80),email:z.email().transform(v=>v.toLowerCase()),phone:z.string().regex(/^\+?[1-9]\d{9,14}$/),password,address:z.string().max(250).optional().default(""),emergencyContact:z.string().max(30).optional().default("")});
export const driverRegistrationSchema=z.object({fullName:z.string().min(2).max(80),email:z.email().transform(v=>v.toLowerCase()),phone:z.string().regex(/^\+?[1-9]\d{9,14}$/),password,city:z.string().min(2).max(80),drivingLicenceNumber:z.string().min(5).max(40),drivingExperienceYears:z.coerce.number().min(0).max(60),languages:z.array(z.string()).min(1),address:z.string().max(250).optional().default(""),emergencyContact:z.string().max(30).optional().default("")});
export const forgotPasswordSchema=z.object({email:z.email().transform(v=>v.toLowerCase())});
export const resetPasswordSchema=z.object({token:z.string().min(20),password});
