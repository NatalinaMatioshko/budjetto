import { z } from "zod";

/** Auth forms */
export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required").max(100),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const transactionTypeSchema = z.enum([
  "INCOME",
  "EXPENSE",
  "TRANSFER",
]);

export const accountTypeSchema = z.enum([
  "CHECKING",
  "SAVINGS",
  "CASH",
  "CREDIT",
  "INVESTMENT",
  "OTHER",
]);

export const createTransactionSchema = z.object({
  amount: z.coerce.number().positive("Amount must be greater than zero"),
  type: transactionTypeSchema,
  description: z.string().max(500).optional().nullable(),
  date: z.coerce.date().optional(),
  accountId: z.string().min(1, "Account is required"),
  categoryId: z.string().optional().nullable(),
});

export const createCategorySchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  icon: z.string().max(50).optional().nullable(),
  color: z.string().max(30).optional().nullable(),
  type: transactionTypeSchema.default("EXPENSE"),
});

export const createBudgetSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  amount: z.coerce.number().positive("Budget amount must be greater than zero"),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  categoryId: z.string().optional().nullable(),
});

export const createAccountSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  type: accountTypeSchema.default("CHECKING"),
  balance: z.coerce.number().default(0),
  currency: z.string().length(3).default("UAH"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type CreateBudgetInput = z.infer<typeof createBudgetSchema>;
export type CreateAccountInput = z.infer<typeof createAccountSchema>;
