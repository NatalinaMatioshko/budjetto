import type {
  Account,
  AccountType,
  Budget,
  Category,
  ShoppingItem,
  Transaction,
  TransactionType,
} from "@/types";

export const LOCAL_DB_KEY = "budjetto:local-db:v17";
export const LOCAL_SESSION_KEY = "budjetto:local-session";
/** Bump when seed content changes — forces re-seed if storage is stale */
export const SEED_REVISION = 17;

/** If any of these are missing from storage, re-seed (guards polluted hot-reload saves) */
const SEED_MARKER_TX_IDS = [
  "tx_income_advance",
  "tx_income_tutoring_150",
  "tx_fora_61",
  "tx_buckcoffee",
  "tx_shawarma_22",
  "tx_transport_50",
  "tx_installment_1750",
  "tx_installment_500",
  "tx_dr_pepper",
] as const;

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
 * Початкові дані (вересень).
 * Дохід (ЗП): 33 800 грн. Аванс ~9 000 грн не включено.
 * Категорії витрат за структурою бюджету + рахунок накопичення.
 */
export function createSeedDb(): LocalDb {
  const planMonth = new Date(2026, 8, 10);
  const createdAt = planMonth;
  const { start, end } = monthBounds(planMonth);
  const incomeDate = new Date(2026, 8, 1);

  const MAIN_INCOME = 33800;
  const SAVINGS_START = 0;

  const expenses: Array<{
    id: string;
    categoryId: string;
    description: string;
    amount: number;
    day: number;
  }> = [
    // Підписки
    {
      id: "tx_gemini",
      categoryId: "cat_subs",
      description: "Gemini",
      amount: 230,
      day: 6,
    },
    {
      id: "tx_cursor_yt",
      categoryId: "cat_subs",
      description: "Cursor + YouTube",
      amount: 1300,
      day: 9,
    },
    {
      id: "tx_netflix",
      categoryId: "cat_subs",
      description: "Netflix",
      amount: 520,
      day: 17,
    },
    // Догляд
    {
      id: "tx_manicure",
      categoryId: "cat_care",
      description: "Манікюр і педикюр",
      amount: 2000,
      day: 7,
    },
    {
      id: "tx_haircut",
      categoryId: "cat_care",
      description: "Стрижка",
      amount: 800,
      day: 11,
    },
    // Косметика
    {
      id: "tx_pads",
      categoryId: "cat_cosmetics",
      description: "Прокладки",
      amount: 115,
      day: 15,
    },
    {
      id: "tx_makeup",
      categoryId: "cat_cosmetics",
      description: "Makeup",
      amount: 3116,
      day: 18,
    },
    {
      id: "tx_shampoo",
      categoryId: "cat_cosmetics",
      description: "Шампунь",
      amount: 160,
      day: 14,
    },
    // Коти
    {
      id: "tx_cats",
      categoryId: "cat_cats",
      description: "Корм",
      amount: 3812,
      day: 10,
    },
    // Продукти / їжа
    {
      id: "tx_holodets",
      categoryId: "cat_food",
      description: "Холодець",
      amount: 193,
      day: 18,
    },
    {
      id: "tx_kolo",
      categoryId: "cat_food",
      description: "Коло — продукти",
      amount: 125,
      day: 18,
    },
    {
      id: "tx_atb",
      categoryId: "cat_food",
      description: "АТБ — продукти",
      amount: 151,
      day: 19,
    },
    {
      id: "tx_shava",
      categoryId: "cat_food",
      description: "Шавуха (їжа на роботі)",
      amount: 350,
      day: 19,
    },
    {
      id: "tx_silpo",
      categoryId: "cat_food",
      description: "Сільпо — продукти",
      amount: 330,
      day: 20,
    },
    {
      id: "tx_roshen",
      categoryId: "cat_food",
      description: "Рошен — продукти",
      amount: 450,
      day: 20,
    },
    {
      id: "tx_products",
      categoryId: "cat_food",
      description: "Продукти",
      amount: 40,
      day: 21,
    },
    {
      id: "tx_gurman",
      categoryId: "cat_food",
      description: "Гурман — вода / їжа",
      amount: 36,
      day: 21,
    },
    {
      id: "tx_water",
      categoryId: "cat_food",
      description: "Вода",
      amount: 26,
      day: 13,
    },
    {
      id: "tx_sweets_coffee",
      categoryId: "cat_food",
      description: "Цукерки, круасани, пакетики розчинної кави",
      amount: 495,
      day: 14,
    },
    // Поповнення
    {
      id: "tx_topup",
      categoryId: "cat_topup",
      description: "Поповнення мобільного рахунку",
      amount: 200,
      day: 5,
    },
    // Транспорт
    {
      id: "tx_uklon_1",
      categoryId: "cat_transport",
      description: "Uklon — таксі",
      amount: 470,
      day: 18,
    },
    {
      id: "tx_uklon_2",
      categoryId: "cat_transport",
      description: "Uklon — таксі",
      amount: 511,
      day: 19,
    },
    {
      id: "tx_kyiv_digital",
      categoryId: "cat_transport",
      description: "Київ Цифровий — проїзний",
      amount: 1250,
      day: 20,
    },
    // Непередбачені
    {
      id: "tx_aurora",
      categoryId: "cat_unexpected",
      description: "Аврора — світильник",
      amount: 261,
      day: 21,
    },
    {
      id: "tx_sanya_bd",
      categoryId: "cat_unexpected",
      description: "Скинулись Сані на ДН (на роботі)",
      amount: 500,
      day: 22,
    },
    {
      id: "tx_flowers_mom",
      categoryId: "cat_unexpected",
      description: "Квіти мамі на ДН",
      amount: 775,
      day: 12,
    },
    {
      id: "tx_garbage",
      categoryId: "cat_unexpected",
      description: "Оплата за переробку сміття",
      amount: 76,
      day: 13,
    },
    {
      id: "tx_shoes",
      categoryId: "cat_unexpected",
      description: "Взуття чоловікові (2 пари)",
      amount: 3952,
      day: 14,
    },
    {
      id: "tx_theater",
      categoryId: "cat_unexpected",
      description: "Квиток у театр",
      amount: 770,
      day: 15,
    },
    {
      id: "tx_garden_gloves",
      categoryId: "cat_unexpected",
      description: "Рукавиці для роботи в саду",
      amount: 28,
      day: 11,
    },
    // Кава
    {
      id: "tx_coffee_cafe_1",
      categoryId: "cat_coffee",
      description: "Фільтр-кава в кав'ярні",
      amount: 120,
      day: 13,
    },
    {
      id: "tx_coffee_cafe_2",
      categoryId: "cat_coffee",
      description: "Фільтр-кава в кав'ярні",
      amount: 150,
      day: 14,
    },
    // Здоров’я
    {
      id: "tx_vitamins",
      categoryId: "cat_health",
      description: "Вітаміни",
      amount: 4190,
      day: 18,
    },
    // Борги
    {
      id: "tx_mom",
      categoryId: "cat_debts",
      description: "Віддати мамі",
      amount: 2000,
      day: 8,
    },
    {
      id: "tx_credit_h",
      categoryId: "cat_debts",
      description: "Кредит чоловіка",
      amount: 490,
      day: 12,
    },
    {
      id: "tx_credit_me",
      categoryId: "cat_debts",
      description: "Мій кредит",
      amount: 328,
      day: 12,
    },
    // —— 17.09 ——
    {
      id: "tx_drips",
      categoryId: "cat_coffee",
      description: "Дріпи (2 шт × 55)",
      amount: 110,
      day: 17,
    },
    {
      id: "tx_pads_hygiene",
      categoryId: "cat_cosmetics",
      description: "Прокладки гігієнічні",
      amount: 73,
      day: 17,
    },
    {
      id: "tx_baton",
      categoryId: "cat_food",
      description: "Батон",
      amount: 29,
      day: 17,
    },
    {
      id: "tx_water_30",
      categoryId: "cat_food",
      description: "Вода",
      amount: 30,
      day: 17,
    },
    {
      id: "tx_water_35",
      categoryId: "cat_food",
      description: "Вода",
      amount: 35,
      day: 17,
    },
    {
      id: "tx_badyoryi",
      categoryId: "cat_food",
      description: "Бадьорий — вафлі, печиво",
      amount: 182,
      day: 17,
    },
    {
      id: "tx_internet",
      categoryId: "cat_unexpected",
      description: "Інтернет",
      amount: 444,
      day: 17,
    },
    // —— 18.09 ——
    {
      id: "tx_dad_18",
      categoryId: "cat_unexpected",
      description: "Татові — порошок, корм для котів, кава",
      amount: 100,
      day: 18,
    },
    // —— 19.09 ——
    {
      id: "tx_dad_19",
      categoryId: "cat_unexpected",
      description: "Татові — кава і магаз",
      amount: 105,
      day: 19,
    },
    {
      id: "tx_apostrophe_140",
      categoryId: "cat_coffee",
      description: "Кава Апостроф",
      amount: 140,
      day: 19,
    },
    {
      id: "tx_apostrophe_200",
      categoryId: "cat_coffee",
      description: "Кава Апостроф",
      amount: 200,
      day: 19,
    },
    {
      id: "tx_coffee_i_150",
      categoryId: "cat_coffee",
      description: "Кава (І)",
      amount: 150,
      day: 19,
    },
    {
      id: "tx_insight_85",
      categoryId: "cat_coffee",
      description: "Кава та десерт Insight",
      amount: 85,
      day: 19,
    },
    {
      id: "tx_insight_185",
      categoryId: "cat_coffee",
      description: "Кава та десерт Insight",
      amount: 185,
      day: 19,
    },
    {
      id: "tx_shawarma",
      categoryId: "cat_food",
      description: "Шаурма",
      amount: 200,
      day: 19,
    },
    // —— 20.09 ——
    {
      id: "tx_epicentr",
      categoryId: "cat_unexpected",
      description: "Епіцентр",
      amount: 100,
      day: 20,
    },
    {
      id: "tx_aurora_markers",
      categoryId: "cat_unexpected",
      description: "Аврора — маркери",
      amount: 10,
      day: 20,
    },
    {
      id: "tx_bookstore",
      categoryId: "cat_unexpected",
      description: "Книгарня",
      amount: 1691,
      day: 20,
    },
    {
      id: "tx_zoo_ahat",
      categoryId: "cat_unexpected",
      description: "Зоо — ахатинка",
      amount: 80,
      day: 20,
    },
    // —— 21.09 ——
    {
      id: "tx_aurora_water",
      categoryId: "cat_food",
      description: "Аврора — вода",
      amount: 9,
      day: 21,
    },
    {
      id: "tx_pizza",
      categoryId: "cat_food",
      description: "Піца",
      amount: 639,
      day: 21,
    },
    {
      id: "tx_apple_cloud",
      categoryId: "cat_subs",
      description: "Підписка Apple Cloud",
      amount: 450,
      day: 21,
    },
    // —— 22.09 ——
    {
      id: "tx_fora_61",
      categoryId: "cat_food",
      description: "Фора — вода і кава",
      amount: 61,
      day: 22,
    },
    {
      id: "tx_buckcoffee",
      categoryId: "cat_coffee",
      description: "Кава Buckcoffee",
      amount: 100,
      day: 22,
    },
    {
      id: "tx_shawarma_22",
      categoryId: "cat_food",
      description: "Шаурма",
      amount: 325,
      day: 22,
    },
    {
      id: "tx_transport_50",
      categoryId: "cat_transport",
      description: "Проїзд",
      amount: 50,
      day: 22,
    },
    {
      id: "tx_installment_1750",
      categoryId: "cat_debts",
      description: "Щомісячний платіж розстрочки",
      amount: 1750,
      day: 22,
    },
    {
      id: "tx_installment_500",
      categoryId: "cat_debts",
      description: "Щомісячний платіж розстрочки",
      amount: 500,
      day: 22,
    },
    {
      id: "tx_dr_pepper",
      categoryId: "cat_food",
      description: "Вода Doctor Pepper",
      amount: 38,
      day: 22,
    },
  ];

  const extraIncomes: Array<{
    id: string;
    description: string;
    amount: number;
    day: number;
  }> = [
    {
      id: "tx_income_tutoring_200",
      description: "Викладання — внесок у сімейний бюджет",
      amount: 200,
      day: 22,
    },
    {
      id: "tx_income_contrib_76",
      description: "Внесок у сімейний бюджет",
      amount: 76,
      day: 14,
    },
    {
      id: "tx_income_contrib_36",
      description: "Внесок у сімейний бюджет",
      amount: 36,
      day: 15,
    },
    {
      id: "tx_income_tutoring_770",
      description: "Викладання — внесок у сімейний бюджет",
      amount: 770,
      day: 13,
    },
    {
      id: "tx_income_tutoring_100",
      description: "Дохід з викладання",
      amount: 100,
      day: 17,
    },
    {
      id: "tx_income_tutoring_105",
      description: "Дохід з викладання",
      amount: 105,
      day: 18,
    },
    {
      id: "tx_income_tutoring_200b",
      description: "Дохід з викладання",
      amount: 200,
      day: 19,
    },
    {
      id: "tx_income_tutoring_124",
      description: "Дохід з викладання",
      amount: 124,
      day: 20,
    },
    {
      id: "tx_income_advance",
      description: "Аванс",
      amount: 14400,
      day: 22,
    },
    {
      id: "tx_income_tutoring_150",
      description: "Дохід з викладання англ",
      amount: 150,
      day: 22,
    },
  ];

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalExtraIncome = extraIncomes.reduce((sum, i) => sum + i.amount, 0);
  const remaining =
    MAIN_INCOME + totalExtraIncome - totalExpenses - SAVINGS_START;

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
    {
      id: "acc_savings",
      name: "Накопичення",
      type: "SAVINGS",
      balance: SAVINGS_START,
      currency: CURRENCY,
      userId: USER_ID,
      createdAt,
      updatedAt: createdAt,
    },
  ];

  const categories: Category[] = [
    {
      id: "cat_salary",
      name: "ЗП",
      icon: "₴",
      color: "#16a34a",
      type: "INCOME",
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
      id: "cat_cosmetics",
      name: "Косметичні засоби",
      icon: "Кз",
      color: "#e11d48",
      type: "EXPENSE",
      userId: USER_ID,
      createdAt,
      updatedAt: createdAt,
    },
    {
      id: "cat_cats",
      name: "Котам",
      icon: "🐱",
      color: "#ca8a04",
      type: "EXPENSE",
      userId: USER_ID,
      createdAt,
      updatedAt: createdAt,
    },
    {
      id: "cat_food",
      name: "Продукти / їжа",
      icon: "Пр",
      color: "#84cc16",
      type: "EXPENSE",
      userId: USER_ID,
      createdAt,
      updatedAt: createdAt,
    },
    {
      id: "cat_topup",
      name: "Щомісячне поповнення рахунку",
      icon: "📱",
      color: "#0ea5e9",
      type: "EXPENSE",
      userId: USER_ID,
      createdAt,
      updatedAt: createdAt,
    },
    {
      id: "cat_transport",
      name: "Транспорт",
      icon: "Т",
      color: "#0284c7",
      type: "EXPENSE",
      userId: USER_ID,
      createdAt,
      updatedAt: createdAt,
    },
    {
      id: "cat_unexpected",
      name: "Непередбачені витрати",
      icon: "!",
      color: "#f97316",
      type: "EXPENSE",
      userId: USER_ID,
      createdAt,
      updatedAt: createdAt,
    },
    {
      id: "cat_coffee",
      name: "Кава",
      icon: "☕",
      color: "#65a30d",
      type: "EXPENSE",
      userId: USER_ID,
      createdAt,
      updatedAt: createdAt,
    },
    {
      id: "cat_health",
      name: "Лікування / вітаміни",
      icon: "+",
      color: "#059669",
      type: "EXPENSE",
      userId: USER_ID,
      createdAt,
      updatedAt: createdAt,
    },
    {
      id: "cat_debts",
      name: "Борги / кредити",
      icon: "Б",
      color: "#dc2626",
      type: "EXPENSE",
      userId: USER_ID,
      createdAt,
      updatedAt: createdAt,
    },
  ];

  const transactions: Transaction[] = [
    {
      id: "tx_income_salary",
      amount: MAIN_INCOME,
      type: "INCOME",
      description: "ЗП (основна частина)",
      date: incomeDate,
      userId: USER_ID,
      accountId: "acc_main",
      categoryId: "cat_salary",
      createdAt,
      updatedAt: createdAt,
    },
    ...extraIncomes.map((i, index) => ({
      id: i.id,
      amount: i.amount,
      type: "INCOME" as const,
      description: i.description,
      date: new Date(2026, 8, i.day),
      userId: USER_ID,
      accountId: "acc_main",
      categoryId: "cat_salary",
      createdAt: new Date(2026, 8, i.day, 18, 0, index),
      updatedAt: createdAt,
    })),
    ...expenses.map((e, index) => ({
      id: e.id,
      amount: e.amount,
      type: "EXPENSE" as const,
      description: e.description,
      date: new Date(2026, 8, e.day),
      userId: USER_ID,
      accountId: "acc_main",
      categoryId: e.categoryId,
      // Later in seed = added later → shows higher within the same day
      createdAt: new Date(2026, 8, e.day, 12, 0, index),
      updatedAt: createdAt,
    })),
  ];

  const budgets: Budget[] = [
    { id: "bud_subs", name: "Підписки", categoryId: "cat_subs", amount: 2500 },
    {
      id: "bud_care",
      name: "Догляд",
      categoryId: "cat_care",
      amount: 2800,
    },
    {
      id: "bud_cosmetics",
      name: "Косметичні засоби",
      categoryId: "cat_cosmetics",
      amount: 3464,
    },
    { id: "bud_cats", name: "Котам", categoryId: "cat_cats", amount: 3812 },
    {
      id: "bud_food",
      name: "Продукти / їжа",
      categoryId: "cat_food",
      amount: 3744,
    },
    {
      id: "bud_topup",
      name: "Поповнення рахунку",
      categoryId: "cat_topup",
      amount: 200,
    },
    {
      id: "bud_transport",
      name: "Транспорт",
      categoryId: "cat_transport",
      amount: 2281,
    },
    {
      id: "bud_unexpected",
      name: "Непередбачені",
      categoryId: "cat_unexpected",
      amount: 8892,
    },
    { id: "bud_coffee", name: "Кава", categoryId: "cat_coffee", amount: 1240 },
    {
      id: "bud_health",
      name: "Лікування / вітаміни",
      categoryId: "cat_health",
      amount: 4190,
    },
    {
      id: "bud_debts",
      name: "Борги / кредити",
      categoryId: "cat_debts",
      amount: 5068,
    },
  ].map((b) => ({
    ...b,
    spent: expenses
      .filter((e) => e.categoryId === b.categoryId)
      .reduce((s, e) => s + e.amount, 0),
    startDate: start,
    endDate: end,
    userId: USER_ID,
    createdAt,
    updatedAt: createdAt,
  }));

  const shoppingSeed: Array<{
    id: string;
    title: string;
    amount: number;
    categoryId: string;
    transactionId?: string | null;
    notes?: string;
  }> = [
    {
      id: "shop_paint",
      title: "Фарба (план до 300 грн)",
      amount: 300,
      categoryId: "cat_cosmetics",
      notes: "План — ще не куплено",
    },
    {
      id: "shop_transport",
      title: "Чоловікові на проїзд до роботи",
      amount: 2400,
      categoryId: "cat_transport",
      notes: "План — ще не витрачено",
    },
    {
      id: "shop_coffee",
      title: "Пачка кави додому (план до 400 грн)",
      amount: 400,
      categoryId: "cat_coffee",
      notes: "План — ще не куплено",
    },
  ];

  const shoppingItems: ShoppingItem[] = shoppingSeed.map((item) => ({
    id: item.id,
    title: item.title,
    amount: item.amount,
    categoryId: item.categoryId,
    notes: item.notes ?? null,
    bought: false,
    boughtAt: null,
    transactionId: item.transactionId ?? null,
    userId: USER_ID,
    createdAt,
    updatedAt: createdAt,
  }));

  return {
    seedRevision: SEED_REVISION,
    accounts,
    categories,
    transactions,
    budgets,
    shoppingItems,
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
    return db;
  } catch {
    return persistSeed();
  }
}

function persistSeed(): LocalDb {
  const seed = createSeedDb();
  if (typeof window !== "undefined") {
    // Drop older seed keys so stale HMR data cannot linger
    for (let v = 1; v < SEED_REVISION; v++) {
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
