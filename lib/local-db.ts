import type {
  Account,
  AccountType,
  Budget,
  Category,
  ShoppingItem,
  Transaction,
  TransactionType,
} from "@/types";
import {
  PERIOD_EXPENSE_CATEGORY_IDS,
  PERIOD_SEED_BALANCES,
  PERIOD_SEED_CATEGORIES,
  PERIOD_SEED_MARKER_TX_IDS,
  PERIOD_SEED_REVISION,
  PERIOD_SEED_TRANSACTIONS,
  PERIOD_SPENT_BY_CATEGORY,
} from "@/lib/period-seed-data";
import { resolveAccountId } from "@/lib/budget-structure";

export const LOCAL_DB_KEY = "budjetto:local-db:v20";
export const LOCAL_SESSION_KEY = "budjetto:local-session";
/** Bump when seed content changes — forces re-seed if storage is stale */
export const SEED_REVISION = PERIOD_SEED_REVISION;

/** Markers from Excel period seed (07.09–10.10.2026) */
const SEED_MARKER_TX_IDS = PERIOD_SEED_MARKER_TX_IDS;

export interface LocalDb {
  /** Matches SEED_REVISION when data came from current seed */
  seedRevision?: number;
  accounts: Account[];
  categories: Category[];
  transactions: Transaction[];
  budgets: Budget[];
  shoppingItems: ShoppingItem[];
}

const USER_ID = "local-user";
const CURRENCY = "UAH";

function now() {
  return new Date();
}

function id(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}_${Date.now().toString(36)}`;
}

/**
 * Початкові дані з Excel «Сімейний_бюджет_07-09_26-10_2026.xlsx».
 * Період 07.09.2026–10.11.2026.
 * Правило: без мітки о.р. → с.б.; перекази — TRANSFER.
 */
export function createSeedDb(): LocalDb {
  const createdAt = new Date(2026, 8, 7);
  const start = new Date(2026, 8, 7);
  const end = new Date(2026, 10, 10, 23, 59, 59, 999);

  const accounts: Account[] = [
    {
      id: "acc_main",
      name: "Сімейний бюджет (с.б.)",
      type: "CHECKING",
      balance: PERIOD_SEED_BALANCES.mainBal,
      currency: CURRENCY,
      userId: USER_ID,
      createdAt,
      updatedAt: createdAt,
    },
    {
      id: "acc_personal",
      name: "Особистий рахунок (о.р.)",
      type: "CHECKING",
      balance: PERIOD_SEED_BALANCES.personalBal,
      currency: CURRENCY,
      userId: USER_ID,
      createdAt,
      updatedAt: createdAt,
    },
    {
      id: "acc_deferred",
      name: "Відкладені кошти",
      type: "CASH",
      balance: PERIOD_SEED_BALANCES.deferredBal,
      currency: CURRENCY,
      userId: USER_ID,
      createdAt,
      updatedAt: createdAt,
    },
    {
      id: "acc_savings",
      name: "Накопичення",
      type: "SAVINGS",
      balance: 0,
      currency: CURRENCY,
      userId: USER_ID,
      createdAt,
      updatedAt: createdAt,
    },
  ];

  const categories: Category[] = PERIOD_SEED_CATEGORIES.map((c) => ({
    id: c.id,
    name: c.name,
    icon: c.icon,
    color: c.color,
    type: c.type as TransactionType,
    userId: USER_ID,
    createdAt,
    updatedAt: createdAt,
  }));

  const transactions: Transaction[] = PERIOD_SEED_TRANSACTIONS.map((t, index) => {
    const [y, m, d] = t.date.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    return {
      id: t.id,
      amount: t.amount,
      type: t.type,
      description: t.description,
      date,
      userId: USER_ID,
      accountId: t.accountId,
      categoryId: t.categoryId,
      createdAt: new Date(y, m - 1, d, 12, 0, index % 60),
      updatedAt: createdAt,
    };
  });

  const budgets: Budget[] = PERIOD_EXPENSE_CATEGORY_IDS.filter(
    (catId) => (PERIOD_SPENT_BY_CATEGORY as Record<string, number>)[catId]
  ).map((catId) => {
    const spent = (PERIOD_SPENT_BY_CATEGORY as Record<string, number>)[catId] ?? 0;
    const cat = categories.find((c) => c.id === catId);
    return {
      id: `bud_${catId.replace(/^cat_/, "")}`,
      name: cat?.name ?? catId,
      amount: spent,
      spent,
      startDate: start,
      endDate: end,
      categoryId: catId,
      userId: USER_ID,
      createdAt,
      updatedAt: createdAt,
    };
  });

  return {
    seedRevision: SEED_REVISION,
    accounts,
    categories,
    transactions,
    budgets,
    shoppingItems: [],
  };
}


function reviveDates<T>(item: T, keys: (keyof T)[]): T {
  const next = { ...item } as T;
  for (const key of keys) {
    const value = next[key];
    if (typeof value === "string") {
      (next as Record<string, unknown>)[key as string] = new Date(value);
    }
  }
  return next;
}

export function serializeDb(db: LocalDb): string {
  return JSON.stringify(db);
}

export function parseDb(raw: string): LocalDb {
  const parsed = JSON.parse(raw) as Partial<LocalDb>;
  return {
    seedRevision: parsed.seedRevision,
    accounts: (parsed.accounts ?? []).map((a) =>
      reviveDates(a, ["createdAt", "updatedAt"])
    ),
    categories: (parsed.categories ?? []).map((c) =>
      reviveDates(c, ["createdAt", "updatedAt"])
    ),
    transactions: (parsed.transactions ?? []).map((t) =>
      reviveDates(t, ["date", "createdAt", "updatedAt"])
    ),
    budgets: (parsed.budgets ?? []).map((b) =>
      reviveDates(b, ["startDate", "endDate", "createdAt", "updatedAt"])
    ),
    shoppingItems: (parsed.shoppingItems ?? []).map((s) =>
      reviveDates(s, ["boughtAt", "createdAt", "updatedAt"])
    ),
  };
}

/** Ensure с.б. + о.р. (+ накопичення) exist without wiping user data. */
export function ensureCoreAccounts(db: LocalDb): LocalDb {
  const createdAt = now();
  let accounts = [...db.accounts];
  let changed = false;

  const main = accounts.find((a) => a.id === "acc_main");
  if (!main) {
    accounts.unshift({
      id: "acc_main",
      name: "Сімейний бюджет (с.б.)",
      type: "CHECKING",
      balance: 0,
      currency: CURRENCY,
      userId: USER_ID,
      createdAt,
      updatedAt: createdAt,
    });
    changed = true;
  } else if (
    main.name === "Основний рахунок" ||
    main.name === "Main" ||
    !main.name.includes("с.б.")
  ) {
    accounts = accounts.map((a) =>
      a.id === "acc_main"
        ? { ...a, name: "Сімейний бюджет (с.б.)", updatedAt: createdAt }
        : a
    );
    changed = true;
  }

  if (!accounts.some((a) => a.id === "acc_personal")) {
    const mainIdx = accounts.findIndex((a) => a.id === "acc_main");
    const personal = {
      id: "acc_personal",
      name: "Особистий рахунок (о.р.)",
      type: "CHECKING" as const,
      balance: 0,
      currency: CURRENCY,
      userId: USER_ID,
      createdAt,
      updatedAt: createdAt,
    };
    accounts.splice(mainIdx + 1, 0, personal);
    changed = true;
  }

  if (!accounts.some((a) => a.id === "acc_deferred")) {
    const personalIdx = accounts.findIndex((a) => a.id === "acc_personal");
    const insertAt = personalIdx >= 0 ? personalIdx + 1 : accounts.length;
    accounts.splice(insertAt, 0, {
      id: "acc_deferred",
      name: "Відкладені кошти",
      type: "CASH",
      balance: 0,
      currency: CURRENCY,
      userId: USER_ID,
      createdAt,
      updatedAt: createdAt,
    });
    changed = true;
  }

  if (!accounts.some((a) => a.id === "acc_savings")) {
    accounts.push({
      id: "acc_savings",
      name: "Накопичення",
      type: "SAVINGS",
      balance: 0,
      currency: CURRENCY,
      userId: USER_ID,
      createdAt,
      updatedAt: createdAt,
    });
    changed = true;
  }

  return changed ? { ...db, accounts } : db;
}

export function loadLocalDb(): LocalDb {
  if (typeof window === "undefined") return createSeedDb();
  try {
    const raw = window.localStorage.getItem(LOCAL_DB_KEY);
    if (!raw) {
      return persistSeed();
    }
    const db = parseDb(raw);
    const revisionOk = db.seedRevision === SEED_REVISION;
    const markersOk = SEED_MARKER_TX_IDS.every((id) =>
      db.transactions.some((t) => t.id === id)
    );
    if (!revisionOk || !markersOk) {
      return persistSeed();
    }
    const withAccounts = ensureCoreAccounts(db);
    if (withAccounts !== db) {
      saveLocalDb(withAccounts);
    }
    return withAccounts;
  } catch {
    return persistSeed();
  }
}

function persistSeed(): LocalDb {
  const seed = createSeedDb();
  if (typeof window !== "undefined") {
    // Drop older seed keys so stale HMR data cannot linger
    for (let v = 1; v <= SEED_REVISION; v++) {
      window.localStorage.removeItem(`budjetto:local-db:v${v}`);
    }
    window.localStorage.setItem(LOCAL_DB_KEY, serializeDb(seed));
  }
  return seed;
}

export function saveLocalDb(db: LocalDb) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LOCAL_DB_KEY, serializeDb(db));
}

export function resetLocalDb(): LocalDb {
  return persistSeed();
}

export function setLocalSession(active: boolean) {
  if (typeof window === "undefined") return;
  if (active) {
    window.localStorage.setItem(LOCAL_SESSION_KEY, "1");
  } else {
    window.localStorage.removeItem(LOCAL_SESSION_KEY);
  }
}

export function hasLocalSession(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(LOCAL_SESSION_KEY) === "1";
}

function applyTransactionToBalance(
  balance: number,
  type: TransactionType,
  amount: number,
  direction: 1 | -1
) {
  if (type === "INCOME") return balance + amount * direction;
  if (type === "EXPENSE") return balance - amount * direction;
  return balance;
}

function recalculateBudgetSpent(db: LocalDb): LocalDb {
  const budgets = db.budgets.map((budget) => {
    const spent = db.transactions
      .filter((tx) => {
        if (tx.type !== "EXPENSE") return false;
        if (budget.categoryId && tx.categoryId !== budget.categoryId) {
          return false;
        }
        const d = new Date(tx.date).getTime();
        return (
          d >= new Date(budget.startDate).getTime() &&
          d <= new Date(budget.endDate).getTime()
        );
      })
      .reduce((sum, tx) => sum + tx.amount, 0);

    return { ...budget, spent, updatedAt: now() };
  });

  return { ...db, budgets };
}

export function addAccount(
  db: LocalDb,
  input: {
    name: string;
    type: AccountType;
    balance: number;
    currency?: string;
  }
): LocalDb {
  const createdAt = now();
  const account: Account = {
    id: id("acc"),
    name: input.name,
    type: input.type,
    balance: input.balance,
    currency: input.currency ?? "UAH",
    userId: USER_ID,
    createdAt,
    updatedAt: createdAt,
  };
  return { ...db, accounts: [...db.accounts, account] };
}

export function deleteAccount(db: LocalDb, accountId: string): LocalDb {
  return {
    ...db,
    accounts: db.accounts.filter((a) => a.id !== accountId),
    transactions: db.transactions.filter((t) => t.accountId !== accountId),
  };
}

export function addCategory(
  db: LocalDb,
  input: {
    name: string;
    type: TransactionType;
    color?: string | null;
    icon?: string | null;
  }
): LocalDb {
  const createdAt = now();
  const category: Category = {
    id: id("cat"),
    name: input.name,
    type: input.type,
    color: input.color ?? "#6366f1",
    icon: input.icon ?? input.name.slice(0, 1).toUpperCase(),
    userId: USER_ID,
    createdAt,
    updatedAt: createdAt,
  };
  return { ...db, categories: [...db.categories, category] };
}

export function deleteCategory(db: LocalDb, categoryId: string): LocalDb {
  const next: LocalDb = {
    ...db,
    categories: db.categories.filter((c) => c.id !== categoryId),
    transactions: db.transactions.map((t) =>
      t.categoryId === categoryId ? { ...t, categoryId: null } : t
    ),
    budgets: db.budgets.map((b) =>
      b.categoryId === categoryId ? { ...b, categoryId: null } : b
    ),
  };
  return recalculateBudgetSpent(next);
}

export function addTransaction(
  db: LocalDb,
  input: {
    amount: number;
    type: TransactionType;
    description?: string | null;
    date?: Date;
    accountId: string;
    categoryId?: string | null;
  }
): LocalDb {
  const createdAt = now();
  const accountId = resolveAccountId(input.accountId);
  const tx: Transaction = {
    id: id("tx"),
    amount: input.amount,
    type: input.type,
    description: input.description ?? null,
    date: input.date ?? createdAt,
    userId: USER_ID,
    accountId,
    categoryId: input.categoryId ?? null,
    createdAt,
    updatedAt: createdAt,
  };

  const accounts = db.accounts.map((account) => {
    if (account.id !== accountId) return account;
    return {
      ...account,
      balance: applyTransactionToBalance(
        account.balance,
        input.type,
        input.amount,
        1
      ),
      updatedAt: createdAt,
    };
  });

  return recalculateBudgetSpent({
    ...db,
    accounts,
    transactions: [tx, ...db.transactions],
  });
}

export function deleteTransaction(db: LocalDb, transactionId: string): LocalDb {
  const tx = db.transactions.find((t) => t.id === transactionId);
  if (!tx) return db;

  const accounts = db.accounts.map((account) => {
    if (account.id !== tx.accountId) return account;
    return {
      ...account,
      balance: applyTransactionToBalance(
        account.balance,
        tx.type,
        tx.amount,
        -1
      ),
      updatedAt: now(),
    };
  });

  return recalculateBudgetSpent({
    ...db,
    accounts,
    transactions: db.transactions.filter((t) => t.id !== transactionId),
  });
}

export function updateTransaction(
  db: LocalDb,
  transactionId: string,
  input: {
    amount: number;
    type: TransactionType;
    description?: string | null;
    date?: Date;
    accountId: string;
    categoryId?: string | null;
  }
): LocalDb {
  const existing = db.transactions.find((t) => t.id === transactionId);
  if (!existing) return db;

  const updatedAt = now();
  let accounts = db.accounts.map((account) => {
    if (account.id !== existing.accountId) return account;
    return {
      ...account,
      balance: applyTransactionToBalance(
        account.balance,
        existing.type,
        existing.amount,
        -1
      ),
      updatedAt,
    };
  });

  accounts = accounts.map((account) => {
    if (account.id !== input.accountId) return account;
    return {
      ...account,
      balance: applyTransactionToBalance(
        account.balance,
        input.type,
        input.amount,
        1
      ),
      updatedAt,
    };
  });

  const transactions = db.transactions.map((t) =>
    t.id === transactionId
      ? {
          ...t,
          amount: input.amount,
          type: input.type,
          description: input.description ?? null,
          date: input.date ?? t.date,
          accountId: input.accountId,
          categoryId: input.categoryId ?? null,
          updatedAt,
        }
      : t
  );

  return recalculateBudgetSpent({
    ...db,
    accounts,
    transactions,
  });
}

export function addBudget(
  db: LocalDb,
  input: {
    name: string;
    amount: number;
    startDate: Date;
    endDate: Date;
    categoryId?: string | null;
  }
): LocalDb {
  const createdAt = now();
  const budget: Budget = {
    id: id("bud"),
    name: input.name,
    amount: input.amount,
    spent: 0,
    startDate: input.startDate,
    endDate: input.endDate,
    userId: USER_ID,
    categoryId: input.categoryId ?? null,
    createdAt,
    updatedAt: createdAt,
  };

  return recalculateBudgetSpent({
    ...db,
    budgets: [...db.budgets, budget],
  });
}

export function deleteBudget(db: LocalDb, budgetId: string): LocalDb {
  return {
    ...db,
    budgets: db.budgets.filter((b) => b.id !== budgetId),
  };
}

export function addShoppingItem(
  db: LocalDb,
  input: {
    title: string;
    amount?: number | null;
    categoryId?: string | null;
    notes?: string | null;
    transactionId?: string | null;
  }
): LocalDb {
  const createdAt = now();
  const item: ShoppingItem = {
    id: id("shop"),
    title: input.title.trim(),
    amount: input.amount ?? null,
    categoryId: input.categoryId ?? null,
    notes: input.notes ?? null,
    bought: false,
    boughtAt: null,
    transactionId: input.transactionId ?? null,
    userId: USER_ID,
    createdAt,
    updatedAt: createdAt,
  };
  return { ...db, shoppingItems: [item, ...db.shoppingItems] };
}

export function updateShoppingItem(
  db: LocalDb,
  itemId: string,
  input: {
    title: string;
    amount?: number | null;
    categoryId?: string | null;
    notes?: string | null;
  }
): LocalDb {
  const updatedAt = now();
  return {
    ...db,
    shoppingItems: db.shoppingItems.map((item) =>
      item.id === itemId
        ? {
            ...item,
            title: input.title.trim(),
            amount: input.amount ?? null,
            categoryId: input.categoryId ?? null,
            notes: input.notes ?? null,
            updatedAt,
          }
        : item
    ),
  };
}

export function toggleShoppingBought(
  db: LocalDb,
  itemId: string,
  bought: boolean
): LocalDb {
  const updatedAt = now();
  return {
    ...db,
    shoppingItems: db.shoppingItems.map((item) =>
      item.id === itemId
        ? {
            ...item,
            bought,
            boughtAt: bought ? updatedAt : null,
            updatedAt,
          }
        : item
    ),
  };
}

export function deleteShoppingItem(db: LocalDb, itemId: string): LocalDb {
  return {
    ...db,
    shoppingItems: db.shoppingItems.filter((item) => item.id !== itemId),
  };
}

/**
 * Відкласти гроші з основного рахунку на накопичення.
 */
export function addToSavings(db: LocalDb, amount: number, note?: string): LocalDb {
  if (amount <= 0) return db;

  const main = db.accounts.find((a) => a.id === "acc_main");
  const savings = db.accounts.find((a) => a.id === "acc_savings");
  if (!main || !savings || main.balance < amount) return db;

  const createdAt = now();
  const tx: Transaction = {
    id: id("tx"),
    amount,
    type: "TRANSFER",
    description: note?.trim() || "Відкладено на накопичення",
    date: createdAt,
    userId: USER_ID,
    accountId: "acc_main",
    categoryId: null,
    createdAt,
    updatedAt: createdAt,
  };

  const accounts = db.accounts.map((account) => {
    if (account.id === "acc_main") {
      return {
        ...account,
        balance: account.balance - amount,
        updatedAt: createdAt,
      };
    }
    if (account.id === "acc_savings") {
      return {
        ...account,
        balance: account.balance + amount,
        updatedAt: createdAt,
      };
    }
    return account;
  });

  return {
    ...db,
    accounts,
    transactions: [tx, ...db.transactions],
  };
}
