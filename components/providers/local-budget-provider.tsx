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
  ShoppingItemWithRelations,
  TransactionType,
  TransactionWithRelations,
} from "@/types";
import { budgetProgressPercent } from "@/lib/utils";
import {
  addAccount,
  addBudget,
  addCategory,
  addShoppingItem,
  addTransaction,
  createSeedDb,
  deleteAccount,
  deleteBudget,
  deleteCategory,
  deleteShoppingItem,
  deleteTransaction,
  loadLocalDb,
  resetLocalDb,
  saveLocalDb,
  toggleShoppingBought,
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
  toggleShoppingBought: (id: string, bought: boolean) => void;
  deleteShoppingItem: (id: string) => void;
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

  const commit = useCallback((next: LocalDb) => {
    setDb(next);
    saveLocalDb(next);
  }, []);

  const value = useMemo<LocalBudgetContextValue>(() => {
    const accountMap = new Map(db.accounts.map((a) => [a.id, a]));
    const categoryMap = new Map(db.categories.map((c) => [c.id, c]));

    const transactionsWithRelations: TransactionWithRelations[] = [
      ...db.transactions,
    ]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
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
      .sort((a, b) => Number(a.bought) - Number(b.bought))
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
      totalBalance: db.accounts.reduce((sum, a) => sum + a.balance, 0),
      monthExpense,
      monthIncome,
      addAccount: (input) => commit(addAccount(db, input)),
      deleteAccount: (accountId) => commit(deleteAccount(db, accountId)),
      addCategory: (input) => commit(addCategory(db, input)),
      deleteCategory: (categoryId) => commit(deleteCategory(db, categoryId)),
      addTransaction: (input) => commit(addTransaction(db, input)),
      deleteTransaction: (transactionId) =>
        commit(deleteTransaction(db, transactionId)),
      addBudget: (input) => commit(addBudget(db, input)),
      deleteBudget: (budgetId) => commit(deleteBudget(db, budgetId)),
      addShoppingItem: (input) => commit(addShoppingItem(db, input)),
      toggleShoppingBought: (itemId, bought) =>
        commit(toggleShoppingBought(db, itemId, bought)),
      deleteShoppingItem: (itemId) => commit(deleteShoppingItem(db, itemId)),
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
