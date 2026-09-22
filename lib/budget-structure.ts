/** Порядок блоків витрат на головній і сторінці витрат */
export const EXPENSE_CATEGORY_IDS = [
  "cat_subs",
  "cat_care",
  "cat_cosmetics",
  "cat_cats",
  "cat_food",
  "cat_topup",
  "cat_transport",
  "cat_unexpected",
  "cat_coffee",
  "cat_health",
  "cat_debts",
] as const;

/** Short slugs for /transactions?category=… */
export const CATEGORY_SLUG_BY_ID: Record<string, string> = {
  cat_subs: "subscriptions",
  cat_care: "care",
  cat_cosmetics: "cosmetics",
  cat_cats: "cats",
  cat_food: "food",
  cat_topup: "topup",
  cat_transport: "transport",
  cat_unexpected: "unexpected",
  cat_coffee: "coffee",
  cat_health: "health",
  cat_debts: "debts",
  cat_salary: "salary",
};

export const CATEGORY_ID_BY_SLUG: Record<string, string> = Object.fromEntries(
  Object.entries(CATEGORY_SLUG_BY_ID).map(([id, slug]) => [slug, id])
);

export const INCOME_CATEGORY_ID = "cat_salary";
export const MAIN_ACCOUNT_ID = "acc_main";
export const SAVINGS_ACCOUNT_ID = "acc_savings";

export type ExpenseCategoryId = (typeof EXPENSE_CATEGORY_IDS)[number];

/** Canonical Ukrainian labels (fallback if local DB is stale) */
export const CATEGORY_LABELS: Record<string, string> = {
  cat_salary: "ЗП",
  cat_subs: "Підписки",
  cat_care: "Догляд",
  cat_cosmetics: "Косметичні засоби",
  cat_cats: "Котам",
  cat_food: "Продукти / їжа",
  cat_topup: "Щомісячне поповнення рахунку",
  cat_transport: "Транспорт",
  cat_unexpected: "Непередбачені витрати",
  cat_coffee: "Кава",
  cat_health: "Лікування / вітаміни",
  cat_debts: "Борги / кредити",
};

export function categoryDisplayName(id: string, fallback?: string | null) {
  if (fallback && !fallback.startsWith("cat_")) return fallback;
  return CATEGORY_LABELS[id] ?? fallback ?? id;
}

export interface CategoryVisual {
  image: string;
  imageAlt: string;
  blurb: string;
  icon:
    | "subs"
    | "care"
    | "cosmetics"
    | "cats"
    | "food"
    | "topup"
    | "transport"
    | "unexpected"
    | "coffee"
    | "health"
    | "debts";
}

/** Cover photos + short copy for media category cards */
export const CATEGORY_VISUALS: Record<string, CategoryVisual> = {
  cat_subs: {
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Ноутбук і підписки",
    blurb: "Цифрові сервіси, які списуються щомісяця.",
    icon: "subs",
  },
  cat_care: {
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Салон краси",
    blurb: "Манікюр, педикюр, стрижка — усе з салону.",
    icon: "care",
  },
  cat_cosmetics: {
    image:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Косметика",
    blurb: "Макіяж, фарба, догляд і гігієна.",
    icon: "cosmetics",
  },
  cat_cats: {
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Кіт",
    blurb: "Корм і все необхідне для котиків.",
    icon: "cats",
  },
  cat_food: {
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Продукти",
    blurb: "Продукти, їжа вдома та на роботі.",
    icon: "food",
  },
  cat_topup: {
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Смартфон",
    blurb: "Щомісячне поповнення мобільного рахунку.",
    icon: "topup",
  },
  cat_transport: {
    image:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Транспорт",
    blurb: "Таксі, проїзд і транспортні витрати.",
    icon: "transport",
  },
  cat_unexpected: {
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Гаманець",
    blurb: "Резерв на несподівані витрати місяця.",
    icon: "unexpected",
  },
  cat_coffee: {
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Кава",
    blurb: "Кава додому та кав’ярні.",
    icon: "coffee",
  },
  cat_health: {
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Вітаміни",
    blurb: "Лікування, вітаміни та аптека.",
    icon: "health",
  },
  cat_debts: {
    image:
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Гроші",
    blurb: "Борги, кредити та обов’язкові платежі.",
    icon: "debts",
  },
};

export function expenseCategoryHref(categoryId: string) {
  const slug = CATEGORY_SLUG_BY_ID[categoryId] ?? categoryId;
  return `/transactions?type=expense&category=${slug}`;
}
