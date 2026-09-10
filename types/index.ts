/**
 * Shared TypeScript types for Budjetto entities.
 * Keep these aligned with prisma/schema.prisma.
 */

export type TransactionType = "INCOME" | "EXPENSE" | "TRANSFER";

export type AccountType =
  | "CHECKING"
  | "SAVINGS"
  | "CASH"
  | "CREDIT"
  | "INVESTMENT"
  | "OTHER";

export interface User {
  id: string;
  email: string;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  balance: number;
  currency: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  icon: string | null;
  color: string | null;
  type: TransactionType;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  description: string | null;
  date: Date;
  userId: string;
  accountId: string;
  categoryId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Budget {
  id: string;
  name: string;
  amount: number;
  spent: number;
  startDate: Date;
  endDate: Date;
  userId: string;
  categoryId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

/** Checklist item: що ще треба купити / зробити */
export interface ShoppingItem {
  id: string;
  title: string;
  amount: number | null;
  categoryId: string | null;
  notes: string | null;
  bought: boolean;
  boughtAt: Date | null;
  /** Optional link to a planned expense transaction */
  transactionId: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ShoppingItemWithRelations extends ShoppingItem {
  category?: Pick<Category, "id" | "name" | "color" | "icon"> | null;
}

/** Transaction with related display fields for lists/tables */
export interface TransactionWithRelations extends Transaction {
  account?: Pick<Account, "id" | "name">;
  category?: Pick<Category, "id" | "name" | "color" | "icon"> | null;
}

/** Budget with optional category and computed progress */
export interface BudgetWithProgress extends Budget {
  category?: Pick<Category, "id" | "name" | "color"> | null;
  progressPercent: number;
}

export interface ApiError {
  error: string;
  details?: unknown;
}
