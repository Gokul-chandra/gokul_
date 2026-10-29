import { z } from "zod";

export const customerTypes = [
  "STUDENT",
  "INSTITUTION",
  "INDIVIDUAL",
  "STARTUP",
  "SMALL_BUSINESS",
  "COMPANY",
  "OTHER",
] as const;

export const customerTypeLabels: Record<(typeof customerTypes)[number], string> = {
  STUDENT: "Student",
  INSTITUTION: "College / institution",
  INDIVIDUAL: "Individual",
  STARTUP: "Startup",
  SMALL_BUSINESS: "Small business",
  COMPANY: "Company",
  OTHER: "Other",
};

const password = z
  .string()
  .min(10, "Use at least 10 characters")
  .max(128)
  .refine((p) => /[A-Za-z]/.test(p) && /\d/.test(p), "Include at least one letter and one number");

export const registerSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().toLowerCase().email().max(254),
  password,
  role: z.enum(["CUSTOMER", "DEVELOPER"]), // ADMIN can never be self-registered
  customerType: z.enum(customerTypes).optional(),
  acceptTerms: z.literal(true, { errorMap: () => ({ message: "You must accept the Terms and Privacy Policy" }) }),
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  password: z.string().min(1).max(128),
});
