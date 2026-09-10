import type {
  Account,
  AccountType,
  Budget,
  Category,
  Transaction,
  TransactionType,
} from "@/types";

export const LOCAL_DB_KEY = "budjetto:local-db:v2";
export const LOCAL_SESSION_KEY = "budjetto:local-session";

export interface LocalDb {
  accounts: Account[];
  categories: Category[];
  transactions: Transaction[];
  budgets: Budget[];
}

const USER_ID = "local-user";
const CURRENCY = "UAH";

function now() {
  return new Date();
}

function id(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}_${Date.now().toString(36)}`;
}

function monthBounds(reference = new Date()) {
  const start = new Date(reference.getFullYear(), reference.getMonth(), 1);
  const end = new Date(
    reference.getFullYear(),
    reference.getMonth() + 1,
    0,
    23,
    59,
    59,
    999
  );
  return { start, end };
}

/**
 * Початкові дані бюджету (вересень).
 * Основний дохід: 33 800 грн.
 * Аванс ~9 000 грн (орієнтовно 22.09) свідомо НЕ включений у залишок.
 * Діапазони (фарба, кава) взяті по верхній межі для безпечного плану.
 */
export function createSeedDb(): LocalDb {
  // Фіксуємо вересень 2026 під поточний план
  const planMonth = new Date(2026, 8, 10);
  const createdAt = planMonth;
  const { start, end } = monthBounds(planMonth);
  const incomeDate = new Date(2026, 8, 1);

  const MAIN_INCOME = 33800;
  // Верхні межі діапазонів: фарба 200–300 → 300, кава 300–400 → 400
  const expenses: Array<{
    id: string;
    categoryId: string;
    description: string;
    amount: number;
    day: number;
  }> = [
    {
      id: "tx_mobile",
      categoryId: "cat_link",
      description: "Поповнення мобільного рахунку",
      amount: 200,
      day: 5,
    },
    {
      id: "tx_gemini",
      categoryId: "cat_subs",
      description: "Gemini",
      amount: 230,
      day: 6,
    },
    {
      id: "tx_manicure",
      categoryId: "cat_care",
      description: "Манікюр і педикюр",
      amount: 2000,
      day: 7,
    },
    {
      id: "tx_mom",
      categoryId: "cat_debts",
      description: "Віддати мамі",
      amount: 2000,
      day: 8,
    },
    {
      id: "tx_cursor_yt",
      categoryId: "cat_subs",
      description: "Cursor + YouTube",
      amount: 1300,
      day: 9,
    },
    {
      id: "tx_cats",
      categoryId: "cat_cats",
      description: "Корм",
      amount: 3812,
      day: 10,
    },
    {
      id: "tx_haircut",
      categoryId: "cat_care",
      description: "Стрижка",
      amount: 800,
      day: 11,
    },
    {
      id: "tx_credit_h",
      categoryId: "cat_credits",
      description: "Кредит чоловіка",
      amount: 490,
      day: 12,
    },
    {
      id: "tx_credit_me",
      categoryId: "cat_credits",
      description: "Мій кредит",
      amount: 328,
      day: 12,
    },
    {
      id: "tx_transport",
      categoryId: "cat_transport",
      description: "Чоловікові на проїзд до роботи",
      amount: 2400,
      day: 13,
    },
    {
      id: "tx_paint",
      categoryId: "cat_personal",
      description: "Фарба (план до 300 грн)",
      amount: 300,
      day: 14,
    },
    {
      id: "tx_hygiene",
      categoryId: "cat_hygiene",
      description: "Прокладки",
      amount: 115,
      day: 15,
    },
    {
      id: "tx_coffee",
      categoryId: "cat_groceries",
      description: "Пачка кави додому (план до 400 грн)",
      amount: 400,
      day: 16,
    },
  ];

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const remaining = MAIN_INCOME - totalExpenses;

  const accounts: Account[] = [
    {
      id: "acc_main",
      name: "Основний рахунок",
      type: "CHECKING",
      balance: remaining,
      currency: CURRENCY,
      userId: USER_ID,
      createdAt,
      updatedAt: createdAt,
    },
  ];

  const categories: Category[] = [
    {
      id: "cat_income",
      name: "Дохід",
      icon: "₴",
      color: "#16a34a",
      type: "INCOME",
      userId: USER_ID,
      createdAt,
      updatedAt: createdAt,
    },
    {
      id: "cat_link",
      name: "Зв’язок",
      icon: "З",
      color: "#0ea5e9",
      type: "EXPENSE",
      userId: USER_ID,
      createdAt,
      updatedAt: createdAt,
    },
    {
      id: "cat_subs",
      name: "Підписки",
      icon: "П",
      color: "#6366f1",
      type: "EXPENSE",
      userId: USER_ID,
      createdAt,
      updatedAt: createdAt,
    },
    {
      id: "cat_care",
      name: "Догляд",
      icon: "Д",
      color: "#db2777",
      type: "EXPENSE",
      userId: USER_ID,
      createdAt,
      updatedAt: createdAt,
    },
    {
      id: "cat_debts",
      name: "Борги",
      icon: "Б",
      color: "#dc2626",
      type: "EXPENSE",
      userId: USER_ID,
      createdAt,
      updatedAt: createdAt,
    },
    {
      id: "cat_cats",
      name: "Коти",
      icon: "К",
      color: "#ca8a04",
      type: "EXPENSE",
      userId: USER_ID,
      createdAt,
      updatedAt: createdAt,
    },
    {
      id: "cat_credits",
      name: "Кредити",
      icon: "Кр",
      color: "#b45309",
      type: "EXPENSE",
      userId: USER_ID,
      createdAt,
      updatedAt: createdAt,
    },
    {
      id: "cat_transport",
      name: "Транспорт",
      icon: "Т",
      color: "#0891b2",
      type: "EXPENSE",
      userId: USER_ID,
      createdAt,
      updatedAt: createdAt,
    },
    {
      id: "cat_personal",
      name: "Особисте",
      icon: "О",
      color: "#7c3aed",
      type: "EXPENSE",
      userId: USER_ID,
      createdAt,
      updatedAt: createdAt,
    },
    {
      id: "cat_hygiene",
      name: "Гігієна",
      icon: "Г",
      color: "#059669",
      type: "EXPENSE",
      userId: USER_ID,
      createdAt,
      updatedAt: createdAt,
    },
    {
      id: "cat_groceries",
      name: "Продукти / кава",
      icon: "Пр",
      color: "#65a30d",
      type: "EXPENSE",
      userId: USER_ID,
      createdAt,
      updatedAt: createdAt,
    },
  ];

  const transactions: Transaction[] = [
    {
      id: "tx_income_main",
      amount: MAIN_INCOME,
      type: "INCOME",
      description: "Основний дохід (аванс ~9 000 грн 22.09 не включено)",
      date: incomeDate,
      userId: USER_ID,
      accountId: "acc_main",
      categoryId: "cat_income",
      createdAt,
      updatedAt: createdAt,
    },
    ...expenses.map((e) => ({
      id: e.id,
      amount: e.amount,
      type: "EXPENSE" as const,
      description: e.description,
      date: new Date(2026, 8, e.day),
      userId: USER_ID,
      accountId: "acc_main",
      categoryId: e.categoryId,
      createdAt,
      updatedAt: createdAt,
    })),
  ];

  const budgetByCategory: Array<{
    id: string;
    name: string;
    categoryId: string;
    amount: number;
  }> = [
    { id: "bud_link", name: "Зв’язок", categoryId: "cat_link", amount: 200 },
    {
      id: "bud_subs",
      name: "Підписки",
      categoryId: "cat_subs",
      amount: 1530,
    },
    { id: "bud_care", name: "Догляд", categoryId: "cat_care", amount: 2800 },
    { id: "bud_debts", name: "Борги", categoryId: "cat_debts", amount: 2000 },
    { id: "bud_cats", name: "Коти", categoryId: "cat_cats", amount: 3812 },
    {
      id: "bud_credits",
      name: "Кредити",
      categoryId: "cat_credits",
      amount: 818,
    },
    {
      id: "bud_transport",
      name: "Транспорт",
      categoryId: "cat_transport",
      amount: 2400,
    },
    {
      id: "bud_personal",
      name: "Особисте",
      categoryId: "cat_personal",
      amount: 300,
    },
    {
      id: "bud_hygiene",
      name: "Гігієна",
      categoryId: "cat_hygiene",
      amount: 115,
    },
    {
      id: "bud_groceries",
      name: "Продукти / кава",
      categoryId: "cat_groceries",
      amount: 400,
    },
  ];

  const budgets: Budget[] = budgetByCategory.map((b) => ({
    id: b.id,
    name: b.name,
    amount: b.amount,
    spent: b.amount,
    startDate: start,
    endDate: end,
    userId: USER_ID,
    categoryId: b.categoryId,
    createdAt,
    updatedAt: createdAt,
  }));

  return { accounts, categories, transactions, budgets };
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
  const parsed = JSON.parse(raw) as LocalDb;
  return {
    accounts: parsed.accounts.map((a) =>
      reviveDates(a, ["createdAt", "updatedAt"])
    ),
    categories: parsed.categories.map((c) =>
      reviveDates(c, ["createdAt", "updatedAt"])
    ),
    transactions: parsed.transactions.map((t) =>
      reviveDates(t, ["date", "createdAt", "updatedAt"])
    ),
    budgets: parsed.budgets.map((b) =>
      reviveDates(b, ["startDate", "endDate", "createdAt", "updatedAt"])
    ),
  };
}

export function loadLocalDb(): LocalDb {
  if (typeof window === "undefined") return createSeedDb();
  try {
    const raw = window.localStorage.getItem(LOCAL_DB_KEY);
    if (!raw) {
      const seed = createSeedDb();
      window.localStorage.setItem(LOCAL_DB_KEY, serializeDb(seed));
      return seed;
    }
    return parseDb(raw);
  } catch {
    return createSeedDb();
  }
}

export function saveLocalDb(db: LocalDb) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LOCAL_DB_KEY, serializeDb(db));
}

export function resetLocalDb(): LocalDb {
  const seed = createSeedDb();
  saveLocalDb(seed);
  return seed;
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
  const tx: Transaction = {
    id: id("tx"),
    amount: input.amount,
    type: input.type,
    description: input.description ?? null,
    date: input.date ?? createdAt,
    userId: USER_ID,
    accountId: input.accountId,
    categoryId: input.categoryId ?? null,
    createdAt,
    updatedAt: createdAt,
  };

  const accounts = db.accounts.map((account) => {
    if (account.id !== input.accountId) return account;
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
