import { PERIOD_EXPENSE_CATEGORY_IDS } from "@/lib/period-seed-data";

/** Порядок блоків витрат на головній і сторінці витрат */
export const EXPENSE_CATEGORY_IDS = PERIOD_EXPENSE_CATEGORY_IDS;

/** Short slugs for /transactions?category=… */
export const CATEGORY_SLUG_BY_ID: Record<string, string> = {
  cat_subs: "subscriptions",
  cat_care: "care",
  cat_cosmetics: "cosmetics",
  cat_cats: "cats",
  cat_food: "food",
  cat_comms: "comms",
  cat_topup: "topup",
  cat_transport: "transport",
  cat_unexpected: "unexpected",
  cat_dining: "dining",
  cat_snacks: "snacks",
  cat_drinks: "drinks",
  cat_coffee: "coffee",
  cat_health: "health",
  cat_debts: "debts",
  cat_clothes: "clothes",
  cat_leisure: "leisure",
  cat_books: "books",
  cat_gifts: "gifts",
  cat_home: "home",
  cat_hygiene: "hygiene",
  cat_family: "family",
  cat_delivery: "delivery",
  cat_tech: "tech",
  cat_charity: "charity",
  cat_misc: "misc",
  cat_salary: "salary",
  cat_advance: "advance",
  cat_tutoring: "tutoring",
  cat_contrib: "contrib",
};

export const CATEGORY_ID_BY_SLUG: Record<string, string> = Object.fromEntries(
  Object.entries(CATEGORY_SLUG_BY_ID).map(([id, slug]) => [slug, id])
);

export const INCOME_CATEGORY_ID = "cat_salary";
/** с.б. — сімейний бюджет (дефолт для всіх операцій без явної мітки о.р.) */
export const MAIN_ACCOUNT_ID = "acc_main";
export const SAVINGS_ACCOUNT_ID = "acc_savings";
/** о.р. — особистий рахунок (лише якщо явно позначено) */
export const PERSONAL_ACCOUNT_ID = "acc_personal";
export const DEFERRED_ACCOUNT_ID = "acc_deferred";

/**
 * Усі витрати/доходи без явної позначки о.р. йдуть на с.б.
 */
export function resolveAccountId(
  accountId?: string | null,
  markPersonal?: boolean
): string {
  if (markPersonal || accountId === PERSONAL_ACCOUNT_ID) {
    return PERSONAL_ACCOUNT_ID;
  }
  if (accountId === SAVINGS_ACCOUNT_ID) {
    return SAVINGS_ACCOUNT_ID;
  }
  if (accountId === DEFERRED_ACCOUNT_ID) {
    return DEFERRED_ACCOUNT_ID;
  }
  return MAIN_ACCOUNT_ID;
}

/** Order: с.б. → о.р. → відкладені → накопичення → інші */
export function sortAccountsForSelect<T extends { id: string }>(accounts: T[]): T[] {
  const rank = (id: string) => {
    if (id === MAIN_ACCOUNT_ID) return 0;
    if (id === PERSONAL_ACCOUNT_ID) return 1;
    if (id === DEFERRED_ACCOUNT_ID) return 2;
    if (id === SAVINGS_ACCOUNT_ID) return 3;
    return 4;
  };
  return [...accounts].sort((a, b) => rank(a.id) - rank(b.id));
}

export type ExpenseCategoryId = (typeof EXPENSE_CATEGORY_IDS)[number];

/** Canonical Ukrainian labels (fallback if local DB is stale) */
export const CATEGORY_LABELS: Record<string, string> = {
  cat_salary: "ЗП",
  cat_advance: "Аванс",
  cat_tutoring: "Викладання",
  cat_contrib: "Внесок у бюджет",
  cat_subs: "Підписки",
  cat_care: "Догляд",
  cat_cosmetics: "Косметика / догляд",
  cat_cats: "Тваринкам",
  cat_food: "Продукти",
  cat_comms: "Зв’язок",
  cat_topup: "Щомісячне поповнення рахунку",
  cat_transport: "Транспорт",
  cat_unexpected: "Непередбачені витрати",
  cat_dining: "Готова їжа",
  cat_snacks: "Солодощі / перекуси",
  cat_drinks: "Вода / напої",
  cat_coffee: "Кава",
  cat_health: "Здоров’я",
  cat_debts: "Борги / кредити",
  cat_clothes: "Одяг і взуття",
  cat_leisure: "Дозвілля",
  cat_books: "Книги",
  cat_gifts: "Подарунки",
  cat_home: "Дім і побут",
  cat_hygiene: "Гігієна",
  cat_family: "Допомога родині",
  cat_delivery: "Доставка",
  cat_tech: "Техніка / ремонт",
  cat_charity: "Благодійність",
  cat_misc: "Покупки без деталізації",
};

export function categoryDisplayName(id: string, fallback?: string | null) {
  if (CATEGORY_LABELS[id]) return CATEGORY_LABELS[id];
  if (fallback && !fallback.startsWith("cat_")) return fallback;
  return fallback ?? id;
}

export interface CategoryVisual {
  image: string;
  imageAlt: string;
  blurb: string;
  /** Default cover; use contain for tall photos so subjects are not cropped */
  objectFit?: "cover" | "contain";
  /** Tailwind object-position class, e.g. object-top */
  objectPosition?: string;
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
    image: "/images/categories/pets.jpg",
    imageAlt: "Улюбленці",
    blurb: "Корм і все необхідне для тваринок.",
    objectFit: "contain",
    objectPosition: "object-center",
    icon: "cats",
  },
  cat_food: {
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Продукти",
    blurb: "Продукти, їжа вдома та напої.",
    icon: "food",
  },
  cat_comms: {
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Смартфон",
    blurb: "Мобільний зв’язок та інтернет.",
    icon: "topup",
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
  cat_dining: {
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Їжа поза домом",
    blurb: "Кафе, шаурма, піца та інша їжа не вдома.",
    icon: "food",
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
    blurb: "Борги, кредити та розстрочки.",
    icon: "debts",
  },
  cat_clothes: {
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Одяг",
    blurb: "Одяг і взуття.",
    icon: "care",
  },
  cat_leisure: {
    image:
      "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Дозвілля",
    blurb: "Театр, книги та розваги.",
    icon: "unexpected",
  },
  cat_gifts: {
    image:
      "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Подарунки",
    blurb: "Подарунки близьким.",
    icon: "cosmetics",
  },
  cat_home: {
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Побут",
    blurb: "Побутові дрібниці та господарство.",
    icon: "unexpected",
  },
  cat_hygiene: {
    image:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Гігієна",
    blurb: "Особиста гігієна.",
    icon: "cosmetics",
  },
  cat_family: {
    image:
      "https://images.unsplash.com/photo-1511895422297-cad9379e0fe1?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Родина",
    blurb: "Допомога родині.",
    icon: "debts",
  },
  cat_delivery: {
    image:
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Доставка",
    blurb: "Доставка та пошта.",
    icon: "transport",
  },
  cat_tech: {
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Техніка",
    blurb: "Техніка та ремонт.",
    icon: "subs",
  },
};

export function expenseCategoryHref(categoryId: string) {
  const slug = CATEGORY_SLUG_BY_ID[categoryId] ?? categoryId;
  return `/transactions?type=expense&category=${slug}`;
}
