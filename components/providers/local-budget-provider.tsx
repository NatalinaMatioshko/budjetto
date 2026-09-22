"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  AccountType,
  BudgetWithProgress,
  CategorySpendBlock,
  ShoppingItemWithRelations,
  TransactionType,
  TransactionWithRelations,
} from "@/types";
import { budgetProgressPercent } from "@/lib/utils";
import { EXPENSE_CATEGORY_IDS, categoryDisplayName } from "@/lib/budget-structure";
import {
  addAccount,
  addBudget,
  addCategory,
  addShoppingItem,
  addToSavings,
  addTransaction,
  createSeedDb,
  deleteAccount,
  deleteBudget,
  deleteCategory,
  deleteShoppingItem,
  deleteTransaction,
  loadLocalDb,
  LOCAL_DB_KEY,
  resetLocalDb,
  saveLocalDb,
  SEED_REVISION,
  toggleShoppingBought,
  updateShoppingItem,
  updateTransaction,
  type LocalDb,
} from "@/lib/local-db";

interface LocalBudgetContextValue {
  ready: boolean;
  db: LocalDb;
  transactionsWithRelations: TransactionWithRelations[];
  budgetsWithProgress: BudgetWithProgress[];
  shoppingItemsWithRelations: ShoppingItemWithRelations[];
  pendingShopping: ShoppingItemWithRelations[];
  pendingShoppingTotal: number;
  expenseBlocks: CategorySpendBlock[];
  incomeTotal: number;
  incomeTransactions: TransactionWithRelations[];
  mainBalance: number;
  savingsBalance: number;
  savingsTransfers: TransactionWithRelations[];
  totalBalance: number;
  monthExpense: number;
  monthIncome: number;
  addAccount: (input: {
    name: string;
    type: AccountType;
    balance: number;
    currency?: string;
  }) => void;
  deleteAccount: (id: string) => void;
  addCategory: (input: {
    name: string;
    type: TransactionType;
    color?: string | null;
    icon?: string | null;
  }) => void;
  deleteCategory: (id: string) => void;
  addTransaction: (input: {
    amount: number;
    type: TransactionType;
    description?: string | null;
    date?: Date;
    accountId: string;
    categoryId?: string | null;
  }) => void;
  updateTransaction: (
    id: string,
    input: {
      amount: number;
      type: TransactionType;
      description?: string | null;
      date?: Date;
      accountId: string;
      categoryId?: string | null;
    }
  ) => void;
  deleteTransaction: (id: string) => void;
  addBudget: (input: {
    name: string;
    amount: number;
    startDate: Date;
    endDate: Date;
    categoryId?: string | null;
  }) => void;
  deleteBudget: (id: string) => void;
  addShoppingItem: (input: {
    title: string;
    amount?: number | null;
    categoryId?: string | null;
    notes?: string | null;
  }) => void;
  updateShoppingItem: (
    id: string,
    input: {
      title: string;
      amount?: number | null;
      categoryId?: string | null;
      notes?: string | null;
    }
  ) => void;
  toggleShoppingBought: (id: string, bought: boolean) => void;
  deleteShoppingItem: (id: string) => void;
  addToSavings: (amount: number, note?: string) => void;
  resetData: () => void;
}

const LocalBudgetContext = createContext<LocalBudgetContextValue | null>(null);

function startOfMonth(d = new Date()) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function endOfMonth(d = new Date()) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999);
}

export function LocalBudgetProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [db, setDb] = useState<LocalDb>(createSeedDb);

  useEffect(() => {
    setDb(loadLocalDb());
    setReady(true);
  }, []);

  // Hot-reload: re-check storage when seed version constants change
  useEffect(() => {
    setDb(loadLocalDb());
  }, [LOCAL_DB_KEY, SEED_REVISION]);

  const commit = useCallback((next: LocalDb) => {
    setDb(next);
    saveLocalDb(next);
  }, []);

  const value = useMemo<LocalBudgetContextValue>(() => {
    const accountMap = new Map(db.accounts.map((a) => [a.id, a]));
    const categoryMap = new Map(db.categories.map((c) => [c.id, c]));
    const budgetByCategory = new Map(
      db.budgets
        .filter((b) => b.categoryId)
        .map((b) => [b.categoryId as string, b])
    );

    const transactionsWithRelations: TransactionWithRelations[] = [
      ...db.transactions,
    ]
      .sort((a, b) => {
        const byDate =
          new Date(b.date).getTime() - new Date(a.date).getTime();
        if (byDate !== 0) return byDate;
        const byCreated =
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        if (byCreated !== 0) return byCreated;
        return b.id.localeCompare(a.id);
      })
      .map((tx) => {
        const account = accountMap.get(tx.accountId);
        const category = tx.categoryId
          ? categoryMap.get(tx.categoryId)
          : undefined;
        return {
          ...tx,
          account: account
            ? { id: account.id, name: account.name }
            : undefined,
          category: category
            ? {
                id: category.id,
                name: category.name,
                color: category.color,
                icon: category.icon,
              }
            : null,
        };
      });

    const budgetsWithProgress: BudgetWithProgress[] = db.budgets.map(
      (budget) => {
        const category = budget.categoryId
          ? categoryMap.get(budget.categoryId)
          : undefined;
        return {
          ...budget,
          category: category
            ? {
                id: category.id,
                name: category.name,
                color: category.color,
              }
            : null,
          progressPercent: budgetProgressPercent(budget.spent, budget.amount),
        };
      }
    );

    const shoppingItemsWithRelations: ShoppingItemWithRelations[] = [
      ...db.shoppingItems,
    ]
      .sort((a, b) => {
        const byBought = Number(a.bought) - Number(b.bought);
        if (byBought !== 0) return byBought;
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      })
      .map((item) => {
        const category = item.categoryId
          ? categoryMap.get(item.categoryId)
          : undefined;
        return {
          ...item,
          category: category
            ? {
                id: category.id,
                name: category.name,
                color: category.color,
                icon: category.icon,
              }
            : null,
        };
      });

    const pendingShopping = shoppingItemsWithRelations.filter((i) => !i.bought);
    const pendingShoppingTotal = pendingShopping.reduce(
      (sum, item) => sum + (item.amount ?? 0),
      0
    );

    const expenseBlocks: CategorySpendBlock[] = EXPENSE_CATEGORY_IDS.map(
      (catId) => {
        const category = categoryMap.get(catId);
        const items = transactionsWithRelations.filter(
          (tx) => tx.type === "EXPENSE" && tx.categoryId === catId
        );
        const spent = items.reduce((sum, tx) => sum + tx.amount, 0);
        const budget = budgetByCategory.get(catId);
        return {
          id: catId,
          name: categoryDisplayName(catId, category?.name),
          color: category?.color ?? null,
          icon: category?.icon ?? null,
          spent,
          budget: budget?.amount ?? null,
          items,
        };
      }
    );

    const incomeTransactions = transactionsWithRelations.filter(
      (tx) => tx.type === "INCOME"
    );
    const incomeTotal = incomeTransactions.reduce(
      (sum, tx) => sum + tx.amount,
      0
    );

    const mainBalance = accountMap.get("acc_main")?.balance ?? 0;
    const savingsBalance = accountMap.get("acc_savings")?.balance ?? 0;
    const savingsTransfers = transactionsWithRelations.filter(
      (tx) =>
        tx.type === "TRANSFER" &&
        (tx.description ?? "").toLowerCase().includes("накопичення")
    );

    const from = startOfMonth().getTime();
    const to = endOfMonth().getTime();

    const monthExpense = db.transactions
      .filter((tx) => {
        const t = new Date(tx.date).getTime();
        return tx.type === "EXPENSE" && t >= from && t <= to;
      })
      .reduce((sum, tx) => sum + tx.amount, 0);

    const monthIncome = db.transactions
      .filter((tx) => {
        const t = new Date(tx.date).getTime();
        return tx.type === "INCOME" && t >= from && t <= to;
      })
      .reduce((sum, tx) => sum + tx.amount, 0);

    return {
      ready,
      db,
      transactionsWithRelations,
      budgetsWithProgress,
      shoppingItemsWithRelations,
      pendingShopping,
      pendingShoppingTotal,
      expenseBlocks,
      incomeTotal,
      incomeTransactions,
      mainBalance,
      savingsBalance,
      savingsTransfers,
      totalBalance: db.accounts.reduce((sum, a) => sum + a.balance, 0),
      monthExpense,
      monthIncome,
      addAccount: (input) => commit(addAccount(db, input)),
      deleteAccount: (accountId) => commit(deleteAccount(db, accountId)),
      addCategory: (input) => commit(addCategory(db, input)),
      deleteCategory: (categoryId) => commit(deleteCategory(db, categoryId)),
      addTransaction: (input) => commit(addTransaction(db, input)),
      updateTransaction: (transactionId, input) =>
        commit(updateTransaction(db, transactionId, input)),
      deleteTransaction: (transactionId) =>
        commit(deleteTransaction(db, transactionId)),
      addBudget: (input) => commit(addBudget(db, input)),
      deleteBudget: (budgetId) => commit(deleteBudget(db, budgetId)),
      addShoppingItem: (input) => commit(addShoppingItem(db, input)),
      updateShoppingItem: (itemId, input) =>
        commit(updateShoppingItem(db, itemId, input)),
      toggleShoppingBought: (itemId, bought) =>
        commit(toggleShoppingBought(db, itemId, bought)),
      deleteShoppingItem: (itemId) => commit(deleteShoppingItem(db, itemId)),
      addToSavings: (amount, note) => commit(addToSavings(db, amount, note)),
      resetData: () => commit(resetLocalDb()),
    };
  }, [commit, db, ready]);

  return (
    <LocalBudgetContext.Provider value={value}>
      {children}
    </LocalBudgetContext.Provider>
  );
}

export function useLocalBudget() {
  const ctx = useContext(LocalBudgetContext);
  if (!ctx) {
    throw new Error("useLocalBudget must be used within LocalBudgetProvider");
  }
  return ctx;
}
