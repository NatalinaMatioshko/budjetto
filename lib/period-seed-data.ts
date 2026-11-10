/** Auto-generated from Сімейний_бюджет_07-09_26-10_2026.xlsx + appendix 26.10–10.11.2026 */
/** Rule: unmarked account → с.б.; о.р. only when explicitly marked. */
export const PERIOD_SEED_REVISION = 20;

export const PERIOD_SEED_MARKER_TX_IDS = [
  "tx_in_2",
  "tx_ex_3",
  "tx_ex_4",
  "tx_ex_5",
  "tx_ex_6",
  "tx_ex_7",
  "tx_ex_8",
  "tx_ex_9",
] as const;

export type PeriodSeedTx = {
  id: string;
  amount: number;
  type: "INCOME" | "EXPENSE" | "TRANSFER";
  description: string;
  /** YYYY-MM-DD */
  date: string;
  accountId: string;
  categoryId: string | null;
};

export const PERIOD_SEED_CATEGORIES = [
  {
    "id": "cat_salary",
    "name": "ЗП",
    "type": "INCOME",
    "icon": "₴",
    "color": "#16a34a"
  },
  {
    "id": "cat_advance",
    "name": "Аванс",
    "type": "INCOME",
    "icon": "А",
    "color": "#15803d"
  },
  {
    "id": "cat_tutoring",
    "name": "Викладання",
    "type": "INCOME",
    "icon": "В",
    "color": "#22c55e"
  },
  {
    "id": "cat_contrib",
    "name": "Внесок у бюджет",
    "type": "INCOME",
    "icon": "€",
    "color": "#4ade80"
  },
  {
    "id": "cat_subs",
    "name": "Підписки",
    "type": "EXPENSE",
    "icon": "П",
    "color": "#6366f1"
  },
  {
    "id": "cat_care",
    "name": "Догляд",
    "type": "EXPENSE",
    "icon": "Д",
    "color": "#db2777"
  },
  {
    "id": "cat_cosmetics",
    "name": "Косметика / догляд",
    "type": "EXPENSE",
    "icon": "Кз",
    "color": "#e11d48"
  },
  {
    "id": "cat_cats",
    "name": "Тваринкам",
    "type": "EXPENSE",
    "icon": "🐱",
    "color": "#ca8a04"
  },
  {
    "id": "cat_food",
    "name": "Продукти",
    "type": "EXPENSE",
    "icon": "Пр",
    "color": "#84cc16"
  },
  {
    "id": "cat_comms",
    "name": "Зв’язок",
    "type": "EXPENSE",
    "icon": "📱",
    "color": "#0ea5e9"
  },
  {
    "id": "cat_transport",
    "name": "Транспорт",
    "type": "EXPENSE",
    "icon": "Т",
    "color": "#0284c7"
  },
  {
    "id": "cat_coffee",
    "name": "Кава",
    "type": "EXPENSE",
    "icon": "☕",
    "color": "#65a30d"
  },
  {
    "id": "cat_health",
    "name": "Здоров’я",
    "type": "EXPENSE",
    "icon": "+",
    "color": "#059669"
  },
  {
    "id": "cat_debts",
    "name": "Борги / кредити",
    "type": "EXPENSE",
    "icon": "Б",
    "color": "#dc2626"
  },
  {
    "id": "cat_dining",
    "name": "Готова їжа",
    "type": "EXPENSE",
    "icon": "Ї",
    "color": "#ea580c"
  },
  {
    "id": "cat_snacks",
    "name": "Солодощі / перекуси",
    "type": "EXPENSE",
    "icon": "С",
    "color": "#f97316"
  },
  {
    "id": "cat_drinks",
    "name": "Вода / напої",
    "type": "EXPENSE",
    "icon": "Вд",
    "color": "#38bdf8"
  },
  {
    "id": "cat_clothes",
    "name": "Одяг і взуття",
    "type": "EXPENSE",
    "icon": "О",
    "color": "#7c3aed"
  },
  {
    "id": "cat_leisure",
    "name": "Дозвілля",
    "type": "EXPENSE",
    "icon": "Дз",
    "color": "#c026d3"
  },
  {
    "id": "cat_books",
    "name": "Книги",
    "type": "EXPENSE",
    "icon": "Кн",
    "color": "#a855f7"
  },
  {
    "id": "cat_gifts",
    "name": "Подарунки",
    "type": "EXPENSE",
    "icon": "🎁",
    "color": "#e11d48"
  },
  {
    "id": "cat_home",
    "name": "Дім і побут",
    "type": "EXPENSE",
    "icon": "Пб",
    "color": "#78716c"
  },
  {
    "id": "cat_hygiene",
    "name": "Гігієна",
    "type": "EXPENSE",
    "icon": "Г",
    "color": "#14b8a6"
  },
  {
    "id": "cat_family",
    "name": "Допомога родині",
    "type": "EXPENSE",
    "icon": "Р",
    "color": "#f59e0b"
  },
  {
    "id": "cat_delivery",
    "name": "Доставка",
    "type": "EXPENSE",
    "icon": "📦",
    "color": "#64748b"
  },
  {
    "id": "cat_tech",
    "name": "Техніка / ремонт",
    "type": "EXPENSE",
    "icon": "🔧",
    "color": "#475569"
  },
  {
    "id": "cat_charity",
    "name": "Благодійність",
    "type": "EXPENSE",
    "icon": "❤",
    "color": "#f43f5e"
  },
  {
    "id": "cat_misc",
    "name": "Покупки без деталізації",
    "type": "EXPENSE",
    "icon": "?",
    "color": "#94a3b8"
  }
] as const;

export const PERIOD_EXPENSE_CATEGORY_IDS = [
  "cat_clothes",
  "cat_debts",
  "cat_care",
  "cat_cats",
  "cat_dining",
  "cat_food",
  "cat_subs",
  "cat_cosmetics",
  "cat_coffee",
  "cat_transport",
  "cat_tech",
  "cat_health",
  "cat_snacks",
  "cat_hygiene",
  "cat_comms",
  "cat_books",
  "cat_home",
  "cat_gifts",
  "cat_drinks",
  "cat_family",
  "cat_leisure",
  "cat_charity",
  "cat_misc",
  "cat_delivery"
] as const;

export const PERIOD_SEED_BALANCES = {
  "mainBal": 31705,
  "personalBal": 182,
  "deferredBal": -800,
  "net": 31087
} as const;

export const PERIOD_SEED_TRANSACTIONS: PeriodSeedTx[] = [
  {
    "id": "tx_in_2",
    "amount": 33800,
    "type": "INCOME",
    "description": "Зарплата чоловіка",
    "date": "2026-09-07",
    "accountId": "acc_main",
    "categoryId": "cat_salary"
  },
  {
    "id": "tx_ex_3",
    "amount": 200,
    "type": "EXPENSE",
    "description": "Поповнення мобільного",
    "date": "2026-09-07",
    "accountId": "acc_main",
    "categoryId": "cat_comms"
  },
  {
    "id": "tx_ex_4",
    "amount": 230,
    "type": "EXPENSE",
    "description": "Gemini",
    "date": "2026-09-07",
    "accountId": "acc_main",
    "categoryId": "cat_subs"
  },
  {
    "id": "tx_ex_5",
    "amount": 2000,
    "type": "EXPENSE",
    "description": "Повернення боргу мамі",
    "date": "2026-09-07",
    "accountId": "acc_main",
    "categoryId": "cat_debts"
  },
  {
    "id": "tx_ex_6",
    "amount": 775,
    "type": "EXPENSE",
    "description": "Квіти мамі на день народження",
    "date": "2026-09-08",
    "accountId": "acc_main",
    "categoryId": "cat_gifts"
  },
  {
    "id": "tx_ex_7",
    "amount": 2000,
    "type": "EXPENSE",
    "description": "Манікюр і педикюр",
    "date": "2026-09-09",
    "accountId": "acc_main",
    "categoryId": "cat_care"
  },
  {
    "id": "tx_ex_8",
    "amount": 3952,
    "type": "EXPENSE",
    "description": "Дві пари взуття чоловікові",
    "date": "2026-09-09",
    "accountId": "acc_main",
    "categoryId": "cat_clothes"
  },
  {
    "id": "tx_ex_9",
    "amount": 1300,
    "type": "EXPENSE",
    "description": "Cursor + YouTube (Окремо збережено платіж Cursor 938 грн 18.09; перевірити, чи немає дублювання)",
    "date": "2026-09-10",
    "accountId": "acc_main",
    "categoryId": "cat_subs"
  },
  {
    "id": "tx_ex_10",
    "amount": 3812,
    "type": "EXPENSE",
    "description": "Корм котам",
    "date": "2026-09-10",
    "accountId": "acc_main",
    "categoryId": "cat_cats"
  },
  {
    "id": "tx_ex_11",
    "amount": 150,
    "type": "EXPENSE",
    "description": "Фільтр-кава",
    "date": "2026-09-11",
    "accountId": "acc_main",
    "categoryId": "cat_coffee"
  },
  {
    "id": "tx_ex_12",
    "amount": 800,
    "type": "EXPENSE",
    "description": "Стрижка",
    "date": "2026-09-12",
    "accountId": "acc_main",
    "categoryId": "cat_care"
  },
  {
    "id": "tx_ex_13",
    "amount": 490,
    "type": "EXPENSE",
    "description": "Закриття кредиту чоловіка",
    "date": "2026-09-12",
    "accountId": "acc_main",
    "categoryId": "cat_debts"
  },
  {
    "id": "tx_ex_14",
    "amount": 328,
    "type": "EXPENSE",
    "description": "Закриття твого кредиту",
    "date": "2026-09-12",
    "accountId": "acc_main",
    "categoryId": "cat_debts"
  },
  {
    "id": "tx_in_15",
    "amount": 770,
    "type": "INCOME",
    "description": "Внесок із викладання",
    "date": "2026-09-13",
    "accountId": "acc_main",
    "categoryId": "cat_tutoring"
  },
  {
    "id": "tx_ex_16",
    "amount": 770,
    "type": "EXPENSE",
    "description": "Квиток у театр",
    "date": "2026-09-13",
    "accountId": "acc_main",
    "categoryId": "cat_leisure"
  },
  {
    "id": "tx_in_17",
    "amount": 76,
    "type": "INCOME",
    "description": "Внесок у сімейний бюджет",
    "date": "2026-09-14",
    "accountId": "acc_main",
    "categoryId": "cat_contrib"
  },
  {
    "id": "tx_ex_18",
    "amount": 500,
    "type": "EXPENSE",
    "description": "Сані на день народження",
    "date": "2026-09-14",
    "accountId": "acc_main",
    "categoryId": "cat_gifts"
  },
  {
    "id": "tx_ex_19",
    "amount": 76,
    "type": "EXPENSE",
    "description": "Переробка сміття",
    "date": "2026-09-14",
    "accountId": "acc_main",
    "categoryId": "cat_home"
  },
  {
    "id": "tx_ex_20",
    "amount": 120,
    "type": "EXPENSE",
    "description": "Фільтр-кава в So-mac",
    "date": "2026-09-14",
    "accountId": "acc_main",
    "categoryId": "cat_coffee"
  },
  {
    "id": "tx_in_21",
    "amount": 36,
    "type": "INCOME",
    "description": "Внесок у сімейний бюджет",
    "date": "2026-09-15",
    "accountId": "acc_main",
    "categoryId": "cat_contrib"
  },
  {
    "id": "tx_ex_22",
    "amount": 115,
    "type": "EXPENSE",
    "description": "Прокладки",
    "date": "2026-09-15",
    "accountId": "acc_main",
    "categoryId": "cat_hygiene"
  },
  {
    "id": "tx_in_23",
    "amount": 200,
    "type": "INCOME",
    "description": "Внесок із викладання",
    "date": "2026-09-16",
    "accountId": "acc_main",
    "categoryId": "cat_tutoring"
  },
  {
    "id": "tx_ex_24",
    "amount": 160,
    "type": "EXPENSE",
    "description": "Шампунь",
    "date": "2026-09-16",
    "accountId": "acc_main",
    "categoryId": "cat_hygiene"
  },
  {
    "id": "tx_ex_25",
    "amount": 26,
    "type": "EXPENSE",
    "description": "Вода",
    "date": "2026-09-16",
    "accountId": "acc_main",
    "categoryId": "cat_drinks"
  },
  {
    "id": "tx_ex_26",
    "amount": 495,
    "type": "EXPENSE",
    "description": "Цукерки, круасани, розчинна кава",
    "date": "2026-09-16",
    "accountId": "acc_main",
    "categoryId": "cat_food"
  },
  {
    "id": "tx_ex_27",
    "amount": 28,
    "type": "EXPENSE",
    "description": "Рукавиці для саду",
    "date": "2026-09-16",
    "accountId": "acc_main",
    "categoryId": "cat_home"
  },
  {
    "id": "tx_in_28",
    "amount": 100,
    "type": "INCOME",
    "description": "Дохід із викладання",
    "date": "2026-09-17",
    "accountId": "acc_main",
    "categoryId": "cat_tutoring"
  },
  {
    "id": "tx_ex_29",
    "amount": 520,
    "type": "EXPENSE",
    "description": "Netflix",
    "date": "2026-09-17",
    "accountId": "acc_main",
    "categoryId": "cat_subs"
  },
  {
    "id": "tx_ex_30",
    "amount": 110,
    "type": "EXPENSE",
    "description": "Дріпи, 2 × 55",
    "date": "2026-09-17",
    "accountId": "acc_main",
    "categoryId": "cat_coffee"
  },
  {
    "id": "tx_ex_31",
    "amount": 73,
    "type": "EXPENSE",
    "description": "Прокладки",
    "date": "2026-09-17",
    "accountId": "acc_main",
    "categoryId": "cat_hygiene"
  },
  {
    "id": "tx_ex_32",
    "amount": 29,
    "type": "EXPENSE",
    "description": "Батон",
    "date": "2026-09-17",
    "accountId": "acc_main",
    "categoryId": "cat_food"
  },
  {
    "id": "tx_ex_33",
    "amount": 30,
    "type": "EXPENSE",
    "description": "Вода",
    "date": "2026-09-17",
    "accountId": "acc_main",
    "categoryId": "cat_drinks"
  },
  {
    "id": "tx_ex_34",
    "amount": 35,
    "type": "EXPENSE",
    "description": "Вода",
    "date": "2026-09-17",
    "accountId": "acc_main",
    "categoryId": "cat_drinks"
  },
  {
    "id": "tx_ex_35",
    "amount": 182,
    "type": "EXPENSE",
    "description": "Бадьорий — вафлі, печиво",
    "date": "2026-09-17",
    "accountId": "acc_main",
    "categoryId": "cat_snacks"
  },
  {
    "id": "tx_ex_36",
    "amount": 444,
    "type": "EXPENSE",
    "description": "Інтернет",
    "date": "2026-09-17",
    "accountId": "acc_main",
    "categoryId": "cat_comms"
  },
  {
    "id": "tx_in_37",
    "amount": 105,
    "type": "INCOME",
    "description": "Дохід із викладання",
    "date": "2026-09-18",
    "accountId": "acc_main",
    "categoryId": "cat_tutoring"
  },
  {
    "id": "tx_in_38",
    "amount": 938,
    "type": "INCOME",
    "description": "Дохід із викладання",
    "date": "2026-09-18",
    "accountId": "acc_main",
    "categoryId": "cat_tutoring"
  },
  {
    "id": "tx_ex_39",
    "amount": 2790,
    "type": "EXPENSE",
    "description": "Makeup — уточнена сума",
    "date": "2026-09-18",
    "accountId": "acc_main",
    "categoryId": "cat_cosmetics"
  },
  {
    "id": "tx_ex_40",
    "amount": 193,
    "type": "EXPENSE",
    "description": "Холодець",
    "date": "2026-09-18",
    "accountId": "acc_main",
    "categoryId": "cat_food"
  },
  {
    "id": "tx_ex_41",
    "amount": 125,
    "type": "EXPENSE",
    "description": "Коло — продукти",
    "date": "2026-09-18",
    "accountId": "acc_main",
    "categoryId": "cat_food"
  },
  {
    "id": "tx_ex_42",
    "amount": 470,
    "type": "EXPENSE",
    "description": "Uklon",
    "date": "2026-09-18",
    "accountId": "acc_main",
    "categoryId": "cat_transport"
  },
  {
    "id": "tx_ex_43",
    "amount": 4190,
    "type": "EXPENSE",
    "description": "Вітаміни",
    "date": "2026-09-18",
    "accountId": "acc_main",
    "categoryId": "cat_health"
  },
  {
    "id": "tx_ex_44",
    "amount": 100,
    "type": "EXPENSE",
    "description": "Татові — порошок, корм, кава",
    "date": "2026-09-18",
    "accountId": "acc_main",
    "categoryId": "cat_family"
  },
  {
    "id": "tx_ex_45",
    "amount": 938,
    "type": "EXPENSE",
    "description": "Cursor",
    "date": "2026-09-18",
    "accountId": "acc_main",
    "categoryId": "cat_subs"
  },
  {
    "id": "tx_in_46",
    "amount": 200,
    "type": "INCOME",
    "description": "Дохід із викладання",
    "date": "2026-09-19",
    "accountId": "acc_main",
    "categoryId": "cat_tutoring"
  },
  {
    "id": "tx_ex_47",
    "amount": 151,
    "type": "EXPENSE",
    "description": "АТБ",
    "date": "2026-09-19",
    "accountId": "acc_main",
    "categoryId": "cat_food"
  },
  {
    "id": "tx_ex_48",
    "amount": 350,
    "type": "EXPENSE",
    "description": "Шавуха",
    "date": "2026-09-19",
    "accountId": "acc_main",
    "categoryId": "cat_dining"
  },
  {
    "id": "tx_ex_49",
    "amount": 511,
    "type": "EXPENSE",
    "description": "Uklon",
    "date": "2026-09-19",
    "accountId": "acc_main",
    "categoryId": "cat_transport"
  },
  {
    "id": "tx_ex_50",
    "amount": 105,
    "type": "EXPENSE",
    "description": "Татові — кава й покупки",
    "date": "2026-09-19",
    "accountId": "acc_main",
    "categoryId": "cat_family"
  },
  {
    "id": "tx_ex_51",
    "amount": 140,
    "type": "EXPENSE",
    "description": "Кава Апостроф",
    "date": "2026-09-19",
    "accountId": "acc_main",
    "categoryId": "cat_coffee"
  },
  {
    "id": "tx_ex_52",
    "amount": 200,
    "type": "EXPENSE",
    "description": "Кава Апостроф",
    "date": "2026-09-19",
    "accountId": "acc_main",
    "categoryId": "cat_coffee"
  },
  {
    "id": "tx_ex_53",
    "amount": 150,
    "type": "EXPENSE",
    "description": "Кава (І)",
    "date": "2026-09-19",
    "accountId": "acc_main",
    "categoryId": "cat_coffee"
  },
  {
    "id": "tx_ex_54",
    "amount": 85,
    "type": "EXPENSE",
    "description": "Кава та десерт Insight",
    "date": "2026-09-19",
    "accountId": "acc_main",
    "categoryId": "cat_coffee"
  },
  {
    "id": "tx_ex_55",
    "amount": 185,
    "type": "EXPENSE",
    "description": "Кава та десерт Insight",
    "date": "2026-09-19",
    "accountId": "acc_main",
    "categoryId": "cat_coffee"
  },
  {
    "id": "tx_ex_56",
    "amount": 200,
    "type": "EXPENSE",
    "description": "Шаурма",
    "date": "2026-09-19",
    "accountId": "acc_main",
    "categoryId": "cat_dining"
  },
  {
    "id": "tx_in_57",
    "amount": 124,
    "type": "INCOME",
    "description": "Дохід із викладання",
    "date": "2026-09-20",
    "accountId": "acc_main",
    "categoryId": "cat_tutoring"
  },
  {
    "id": "tx_ex_58",
    "amount": 330,
    "type": "EXPENSE",
    "description": "Сільпо",
    "date": "2026-09-20",
    "accountId": "acc_main",
    "categoryId": "cat_food"
  },
  {
    "id": "tx_ex_59",
    "amount": 450,
    "type": "EXPENSE",
    "description": "Roshen",
    "date": "2026-09-20",
    "accountId": "acc_main",
    "categoryId": "cat_snacks"
  },
  {
    "id": "tx_ex_60",
    "amount": 1250,
    "type": "EXPENSE",
    "description": "Проїзний Київ Цифровий",
    "date": "2026-09-20",
    "accountId": "acc_main",
    "categoryId": "cat_transport"
  },
  {
    "id": "tx_ex_61",
    "amount": 100,
    "type": "EXPENSE",
    "description": "Епіцентр",
    "date": "2026-09-20",
    "accountId": "acc_main",
    "categoryId": "cat_misc"
  },
  {
    "id": "tx_ex_62",
    "amount": 10,
    "type": "EXPENSE",
    "description": "Аврора — маркери",
    "date": "2026-09-20",
    "accountId": "acc_main",
    "categoryId": "cat_home"
  },
  {
    "id": "tx_ex_63",
    "amount": 1691,
    "type": "EXPENSE",
    "description": "Книгарня",
    "date": "2026-09-20",
    "accountId": "acc_main",
    "categoryId": "cat_books"
  },
  {
    "id": "tx_ex_64",
    "amount": 80,
    "type": "EXPENSE",
    "description": "Зоомагазин — ахатинка",
    "date": "2026-09-20",
    "accountId": "acc_main",
    "categoryId": "cat_cats"
  },
  {
    "id": "tx_in_65",
    "amount": 139,
    "type": "INCOME",
    "description": "Дохід із викладання",
    "date": "2026-09-21",
    "accountId": "acc_main",
    "categoryId": "cat_tutoring"
  },
  {
    "id": "tx_ex_66",
    "amount": 40,
    "type": "EXPENSE",
    "description": "Продукти",
    "date": "2026-09-21",
    "accountId": "acc_main",
    "categoryId": "cat_food"
  },
  {
    "id": "tx_ex_67",
    "amount": 36,
    "type": "EXPENSE",
    "description": "Гурман — вода / їжа",
    "date": "2026-09-21",
    "accountId": "acc_main",
    "categoryId": "cat_food"
  },
  {
    "id": "tx_ex_68",
    "amount": 261,
    "type": "EXPENSE",
    "description": "Аврора — світильник",
    "date": "2026-09-21",
    "accountId": "acc_main",
    "categoryId": "cat_home"
  },
  {
    "id": "tx_ex_69",
    "amount": 9,
    "type": "EXPENSE",
    "description": "Аврора — вода",
    "date": "2026-09-21",
    "accountId": "acc_main",
    "categoryId": "cat_drinks"
  },
  {
    "id": "tx_ex_70",
    "amount": 639,
    "type": "EXPENSE",
    "description": "Піца",
    "date": "2026-09-21",
    "accountId": "acc_main",
    "categoryId": "cat_dining"
  },
  {
    "id": "tx_ex_71",
    "amount": 450,
    "type": "EXPENSE",
    "description": "Apple Cloud",
    "date": "2026-09-21",
    "accountId": "acc_main",
    "categoryId": "cat_subs"
  },
  {
    "id": "tx_in_72",
    "amount": 14400,
    "type": "INCOME",
    "description": "Аванс чоловіка",
    "date": "2026-09-22",
    "accountId": "acc_main",
    "categoryId": "cat_advance"
  },
  {
    "id": "tx_in_73",
    "amount": 150,
    "type": "INCOME",
    "description": "Дохід із викладання",
    "date": "2026-09-22",
    "accountId": "acc_main",
    "categoryId": "cat_tutoring"
  },
  {
    "id": "tx_ex_74",
    "amount": 61,
    "type": "EXPENSE",
    "description": "Фора — вода й кава",
    "date": "2026-09-22",
    "accountId": "acc_main",
    "categoryId": "cat_food"
  },
  {
    "id": "tx_ex_75",
    "amount": 100,
    "type": "EXPENSE",
    "description": "Buckcoffee",
    "date": "2026-09-22",
    "accountId": "acc_main",
    "categoryId": "cat_coffee"
  },
  {
    "id": "tx_ex_76",
    "amount": 325,
    "type": "EXPENSE",
    "description": "Шаурма",
    "date": "2026-09-22",
    "accountId": "acc_main",
    "categoryId": "cat_dining"
  },
  {
    "id": "tx_ex_77",
    "amount": 50,
    "type": "EXPENSE",
    "description": "Проїзд",
    "date": "2026-09-22",
    "accountId": "acc_main",
    "categoryId": "cat_transport"
  },
  {
    "id": "tx_ex_78",
    "amount": 1750,
    "type": "EXPENSE",
    "description": "Щомісячний платіж",
    "date": "2026-09-22",
    "accountId": "acc_main",
    "categoryId": "cat_debts"
  },
  {
    "id": "tx_ex_79",
    "amount": 500,
    "type": "EXPENSE",
    "description": "Щомісячний платіж",
    "date": "2026-09-22",
    "accountId": "acc_main",
    "categoryId": "cat_debts"
  },
  {
    "id": "tx_ex_80",
    "amount": 38,
    "type": "EXPENSE",
    "description": "Вода, Dr Pepper",
    "date": "2026-09-22",
    "accountId": "acc_main",
    "categoryId": "cat_drinks"
  },
  {
    "id": "tx_ex_81",
    "amount": 434,
    "type": "EXPENSE",
    "description": "Roshen",
    "date": "2026-09-23",
    "accountId": "acc_main",
    "categoryId": "cat_snacks"
  },
  {
    "id": "tx_ex_82",
    "amount": 88,
    "type": "EXPENSE",
    "description": "Вода, 2 бутлі",
    "date": "2026-09-23",
    "accountId": "acc_main",
    "categoryId": "cat_drinks"
  },
  {
    "id": "tx_in_83",
    "amount": 105,
    "type": "INCOME",
    "description": "Дохід із викладання",
    "date": "2026-09-24",
    "accountId": "acc_main",
    "categoryId": "cat_tutoring"
  },
  {
    "id": "tx_ex_84",
    "amount": 105,
    "type": "EXPENSE",
    "description": "Кава",
    "date": "2026-09-24",
    "accountId": "acc_main",
    "categoryId": "cat_coffee"
  },
  {
    "id": "tx_ex_85",
    "amount": 650,
    "type": "EXPENSE",
    "description": "Манікюр — виправлена сума",
    "date": "2026-09-25",
    "accountId": "acc_main",
    "categoryId": "cat_care"
  },
  {
    "id": "tx_xfer_86",
    "amount": 100,
    "type": "TRANSFER",
    "description": "Різниця після уточнення вартості манікюру [с.б. → о.р.]",
    "date": "2026-09-25",
    "accountId": "acc_main",
    "categoryId": null
  },
  {
    "id": "tx_ex_87",
    "amount": 1942,
    "type": "EXPENSE",
    "description": "Покриття кредиту (Дата повідомлення; точну дату платежу не вказано)",
    "date": "2026-09-26",
    "accountId": "acc_main",
    "categoryId": "cat_debts"
  },
  {
    "id": "tx_ex_88",
    "amount": 703,
    "type": "EXPENSE",
    "description": "Pet House (Дата повідомлення; точну дату платежу не вказано)",
    "date": "2026-09-26",
    "accountId": "acc_main",
    "categoryId": "cat_cats"
  },
  {
    "id": "tx_ex_89",
    "amount": 260,
    "type": "EXPENSE",
    "description": "Дві фільтр-кави",
    "date": "2026-09-26",
    "accountId": "acc_main",
    "categoryId": "cat_coffee"
  },
  {
    "id": "tx_ex_90",
    "amount": 110,
    "type": "EXPENSE",
    "description": "Макарон",
    "date": "2026-09-26",
    "accountId": "acc_main",
    "categoryId": "cat_coffee"
  },
  {
    "id": "tx_ex_91",
    "amount": 265,
    "type": "EXPENSE",
    "description": "Дві кави",
    "date": "2026-09-27",
    "accountId": "acc_main",
    "categoryId": "cat_coffee"
  },
  {
    "id": "tx_ex_92",
    "amount": 390,
    "type": "EXPENSE",
    "description": "Чебуреки, хліб, пиріжки",
    "date": "2026-09-27",
    "accountId": "acc_main",
    "categoryId": "cat_food"
  },
  {
    "id": "tx_ex_93",
    "amount": 89,
    "type": "EXPENSE",
    "description": "Пепсі, Живчик",
    "date": "2026-09-27",
    "accountId": "acc_main",
    "categoryId": "cat_drinks"
  },
  {
    "id": "tx_ex_94",
    "amount": 297,
    "type": "EXPENSE",
    "description": "Чипси, Живчик",
    "date": "2026-09-27",
    "accountId": "acc_main",
    "categoryId": "cat_food"
  },
  {
    "id": "tx_ex_95",
    "amount": 640,
    "type": "EXPENSE",
    "description": "Фарба для волосся, шкарпетки, 2 антиперспіранти",
    "date": "2026-09-27",
    "accountId": "acc_main",
    "categoryId": "cat_hygiene"
  },
  {
    "id": "tx_ex_96",
    "amount": 2576,
    "type": "EXPENSE",
    "description": "Спортивний костюм і нижня білизна",
    "date": "2026-09-27",
    "accountId": "acc_main",
    "categoryId": "cat_clothes"
  },
  {
    "id": "tx_ex_97",
    "amount": 240,
    "type": "EXPENSE",
    "description": "Кава",
    "date": "2026-09-27",
    "accountId": "acc_personal",
    "categoryId": "cat_coffee"
  },
  {
    "id": "tx_ex_98",
    "amount": 23,
    "type": "EXPENSE",
    "description": "Вода",
    "date": "2026-09-28",
    "accountId": "acc_main",
    "categoryId": "cat_drinks"
  },
  {
    "id": "tx_ex_99",
    "amount": 30,
    "type": "EXPENSE",
    "description": "Бутль води для набору",
    "date": "2026-09-28",
    "accountId": "acc_main",
    "categoryId": "cat_drinks"
  },
  {
    "id": "tx_ex_100",
    "amount": 60,
    "type": "EXPENSE",
    "description": "Сортування сміття",
    "date": "2026-09-29",
    "accountId": "acc_personal",
    "categoryId": "cat_home"
  },
  {
    "id": "tx_ex_101",
    "amount": 103,
    "type": "EXPENSE",
    "description": "Нова пошта — доставка спорткостюма",
    "date": "2026-09-30",
    "accountId": "acc_personal",
    "categoryId": "cat_delivery"
  },
  {
    "id": "tx_ex_102",
    "amount": 334,
    "type": "EXPENSE",
    "description": "АТБ: вода, печиво, халва, молоко, йогурт",
    "date": "2026-09-30",
    "accountId": "acc_personal",
    "categoryId": "cat_food"
  },
  {
    "id": "tx_ex_103",
    "amount": 310,
    "type": "EXPENSE",
    "description": "Інтернет",
    "date": "2026-09-30",
    "accountId": "acc_main",
    "categoryId": "cat_comms"
  },
  {
    "id": "tx_ex_104",
    "amount": 82,
    "type": "EXPENSE",
    "description": "Булочки й 1 ківі",
    "date": "2026-10-01",
    "accountId": "acc_personal",
    "categoryId": "cat_food"
  },
  {
    "id": "tx_in_105",
    "amount": 400,
    "type": "INCOME",
    "description": "Урок англійської",
    "date": "2026-10-02",
    "accountId": "acc_personal",
    "categoryId": "cat_tutoring"
  },
  {
    "id": "tx_ex_106",
    "amount": 98,
    "type": "EXPENSE",
    "description": "Йогурт і тирамісу",
    "date": "2026-10-02",
    "accountId": "acc_personal",
    "categoryId": "cat_food"
  },
  {
    "id": "tx_ex_107",
    "amount": 109,
    "type": "EXPENSE",
    "description": "Круасан (Без позначки о.р. — с.б.; виправлено попередній запис асистента)",
    "date": "2026-10-02",
    "accountId": "acc_main",
    "categoryId": "cat_dining"
  },
  {
    "id": "tx_ex_108",
    "amount": 132,
    "type": "EXPENSE",
    "description": "Фільтр-кава (Без позначки о.р. — с.б.; виправлено попередній запис асистента)",
    "date": "2026-10-02",
    "accountId": "acc_main",
    "categoryId": "cat_coffee"
  },
  {
    "id": "tx_ex_109",
    "amount": 50,
    "type": "EXPENSE",
    "description": "Проїзд",
    "date": "2026-10-02",
    "accountId": "acc_personal",
    "categoryId": "cat_transport"
  },
  {
    "id": "tx_ex_110",
    "amount": 130,
    "type": "EXPENSE",
    "description": "Кола",
    "date": "2026-10-02",
    "accountId": "acc_main",
    "categoryId": "cat_drinks"
  },
  {
    "id": "tx_xfer_111",
    "amount": 400,
    "type": "TRANSFER",
    "description": "Внесок на піцу [о.р. → с.б.]",
    "date": "2026-10-02",
    "accountId": "acc_personal",
    "categoryId": null
  },
  {
    "id": "tx_ex_112",
    "amount": 769,
    "type": "EXPENSE",
    "description": "Піца (400 грн переказу з о.р. + 369 грн із с.б.; одна витрата)",
    "date": "2026-10-02",
    "accountId": "acc_main",
    "categoryId": "cat_dining"
  },
  {
    "id": "tx_ex_113",
    "amount": 50,
    "type": "EXPENSE",
    "description": "Маршрутка",
    "date": "2026-10-03",
    "accountId": "acc_main",
    "categoryId": "cat_transport"
  },
  {
    "id": "tx_ex_114",
    "amount": 201,
    "type": "EXPENSE",
    "description": "Продукти для бабусі",
    "date": "2026-10-03",
    "accountId": "acc_personal",
    "categoryId": "cat_family"
  },
  {
    "id": "tx_ex_115",
    "amount": 60,
    "type": "EXPENSE",
    "description": "Квитки Укрзалізниці (Повернуто пропущений у попередньому обліку запис)",
    "date": "2026-10-03",
    "accountId": "acc_main",
    "categoryId": "cat_transport"
  },
  {
    "id": "tx_ex_116",
    "amount": 80,
    "type": "EXPENSE",
    "description": "Проїзд",
    "date": "2026-10-03",
    "accountId": "acc_personal",
    "categoryId": "cat_transport"
  },
  {
    "id": "tx_ex_117",
    "amount": 80,
    "type": "EXPENSE",
    "description": "Проїзд",
    "date": "2026-10-04",
    "accountId": "acc_personal",
    "categoryId": "cat_transport"
  },
  {
    "id": "tx_xfer_118",
    "amount": 60,
    "type": "TRANSFER",
    "description": "На спільну каву [о.р. → с.б.]",
    "date": "2026-10-04",
    "accountId": "acc_personal",
    "categoryId": null
  },
  {
    "id": "tx_ex_119",
    "amount": 100,
    "type": "EXPENSE",
    "description": "Дві кави",
    "date": "2026-10-04",
    "accountId": "acc_main",
    "categoryId": "cat_coffee"
  },
  {
    "id": "tx_ex_120",
    "amount": 60,
    "type": "EXPENSE",
    "description": "Квитки Укрзалізниці",
    "date": "2026-10-04",
    "accountId": "acc_personal",
    "categoryId": "cat_transport"
  },
  {
    "id": "tx_ex_121",
    "amount": 800,
    "type": "EXPENSE",
    "description": "Стрижка (Оплачено з відкладених коштів, не з поточного с.б.)",
    "date": "2026-10-04",
    "accountId": "acc_deferred",
    "categoryId": "cat_care"
  },
  {
    "id": "tx_ex_122",
    "amount": 34,
    "type": "EXPENSE",
    "description": "Частина покупки води",
    "date": "2026-10-04",
    "accountId": "acc_personal",
    "categoryId": "cat_drinks"
  },
  {
    "id": "tx_ex_123",
    "amount": 8,
    "type": "EXPENSE",
    "description": "Решта покупки води (Загалом 38 + 4 = 42 грн, із них 34 грн з о.р.)",
    "date": "2026-10-04",
    "accountId": "acc_main",
    "categoryId": "cat_drinks"
  },
  {
    "id": "tx_in_124",
    "amount": 400,
    "type": "INCOME",
    "description": "Урок англійської",
    "date": "2026-10-04",
    "accountId": "acc_personal",
    "categoryId": "cat_tutoring"
  },
  {
    "id": "tx_ex_125",
    "amount": 130,
    "type": "EXPENSE",
    "description": "Кава",
    "date": "2026-10-04",
    "accountId": "acc_main",
    "categoryId": "cat_coffee"
  },
  {
    "id": "tx_ex_126",
    "amount": 94,
    "type": "EXPENSE",
    "description": "Вода, кола",
    "date": "2026-10-04",
    "accountId": "acc_personal",
    "categoryId": "cat_drinks"
  },
  {
    "id": "tx_in_127",
    "amount": 400,
    "type": "INCOME",
    "description": "Урок англійської (У повідомленні 05.09; віднесено до 05.10 за послідовністю подій, дата потребує підтвердження)",
    "date": "2026-10-05",
    "accountId": "acc_personal",
    "categoryId": "cat_tutoring"
  },
  {
    "id": "tx_xfer_128",
    "amount": 94,
    "type": "TRANSFER",
    "description": "На воду й колу (У повідомленні 05.09; місяць потребує підтвердження) [о.р. → с.б.]",
    "date": "2026-10-05",
    "accountId": "acc_personal",
    "categoryId": null
  },
  {
    "id": "tx_ex_129",
    "amount": 94,
    "type": "EXPENSE",
    "description": "Вода й кола (У повідомленні 05.09; місяць потребує підтвердження)",
    "date": "2026-10-05",
    "accountId": "acc_main",
    "categoryId": "cat_drinks"
  },
  {
    "id": "tx_xfer_130",
    "amount": 90,
    "type": "TRANSFER",
    "description": "На каву (У повідомленні 06.09; місяць потребує підтвердження) [о.р. → с.б.]",
    "date": "2026-10-06",
    "accountId": "acc_personal",
    "categoryId": null
  },
  {
    "id": "tx_ex_131",
    "amount": 90,
    "type": "EXPENSE",
    "description": "Кава (У повідомленні 06.09; місяць потребує підтвердження)",
    "date": "2026-10-06",
    "accountId": "acc_main",
    "categoryId": "cat_coffee"
  },
  {
    "id": "tx_in_132",
    "amount": 30600,
    "type": "INCOME",
    "description": "Зарплата чоловіка, ввечері",
    "date": "2026-10-06",
    "accountId": "acc_main",
    "categoryId": "cat_salary"
  },
  {
    "id": "tx_ex_133",
    "amount": 56,
    "type": "EXPENSE",
    "description": "Гігієнічна помада",
    "date": "2026-10-06",
    "accountId": "acc_personal",
    "categoryId": "cat_hygiene"
  },
  {
    "id": "tx_ex_134",
    "amount": 280,
    "type": "EXPENSE",
    "description": "Поповнення твого мобільного",
    "date": "2026-10-06",
    "accountId": "acc_main",
    "categoryId": "cat_comms"
  },
  {
    "id": "tx_ex_135",
    "amount": 280,
    "type": "EXPENSE",
    "description": "Поповнення мобільного чоловіка",
    "date": "2026-10-06",
    "accountId": "acc_main",
    "categoryId": "cat_comms"
  },
  {
    "id": "tx_ex_136",
    "amount": 120,
    "type": "EXPENSE",
    "description": "Кава",
    "date": "2026-10-06",
    "accountId": "acc_main",
    "categoryId": "cat_coffee"
  },
  {
    "id": "tx_ex_137",
    "amount": 1750,
    "type": "EXPENSE",
    "description": "Щомісячний платіж",
    "date": "2026-10-06",
    "accountId": "acc_main",
    "categoryId": "cat_debts"
  },
  {
    "id": "tx_ex_138",
    "amount": 1250,
    "type": "EXPENSE",
    "description": "Проїзний на 50 поїздок",
    "date": "2026-10-06",
    "accountId": "acc_main",
    "categoryId": "cat_transport"
  },
  {
    "id": "tx_ex_139",
    "amount": 230,
    "type": "EXPENSE",
    "description": "Gemini",
    "date": "2026-10-06",
    "accountId": "acc_main",
    "categoryId": "cat_subs"
  },
  {
    "id": "tx_xfer_140",
    "amount": 34,
    "type": "TRANSFER",
    "description": "На мінеральну воду (У повідомленні 07.09; місяць потребує підтвердження) [о.р. → с.б.]",
    "date": "2026-10-07",
    "accountId": "acc_personal",
    "categoryId": null
  },
  {
    "id": "tx_ex_141",
    "amount": 34,
    "type": "EXPENSE",
    "description": "Мінеральна вода (У повідомленні 07.09; місяць потребує підтвердження)",
    "date": "2026-10-07",
    "accountId": "acc_main",
    "categoryId": "cat_drinks"
  },
  {
    "id": "tx_ex_142",
    "amount": 270,
    "type": "EXPENSE",
    "description": "Шавуха на роботі",
    "date": "2026-10-07",
    "accountId": "acc_main",
    "categoryId": "cat_dining"
  },
  {
    "id": "tx_ex_143",
    "amount": 88,
    "type": "EXPENSE",
    "description": "Чай у БіаМайГест",
    "date": "2026-10-07",
    "accountId": "acc_main",
    "categoryId": "cat_coffee"
  },
  {
    "id": "tx_ex_144",
    "amount": 65,
    "type": "EXPENSE",
    "description": "Бутль води додому",
    "date": "2026-10-07",
    "accountId": "acc_main",
    "categoryId": "cat_drinks"
  },
  {
    "id": "tx_ex_145",
    "amount": 34,
    "type": "EXPENSE",
    "description": "Пляшка води",
    "date": "2026-10-07",
    "accountId": "acc_main",
    "categoryId": "cat_drinks"
  },
  {
    "id": "tx_ex_146",
    "amount": 5400,
    "type": "EXPENSE",
    "description": "Манікюр, педикюр, глибокий догляд, стрижка (Із виділених 6300 грн залишилось 900 грн; виділення не дублюється як витрата)",
    "date": "2026-10-08",
    "accountId": "acc_main",
    "categoryId": "cat_care"
  },
  {
    "id": "tx_ex_147",
    "amount": 99,
    "type": "EXPENSE",
    "description": "Фільтр у Бі",
    "date": "2026-10-08",
    "accountId": "acc_main",
    "categoryId": "cat_coffee"
  },
  {
    "id": "tx_ex_148",
    "amount": 75,
    "type": "EXPENSE",
    "description": "Еспресо у Бі",
    "date": "2026-10-08",
    "accountId": "acc_main",
    "categoryId": "cat_coffee"
  },
  {
    "id": "tx_in_149",
    "amount": 400,
    "type": "INCOME",
    "description": "Урок англійської",
    "date": "2026-10-09",
    "accountId": "acc_personal",
    "categoryId": "cat_tutoring"
  },
  {
    "id": "tx_ex_150",
    "amount": 250,
    "type": "EXPENSE",
    "description": "Шавуха на роботі",
    "date": "2026-10-09",
    "accountId": "acc_main",
    "categoryId": "cat_dining"
  },
  {
    "id": "tx_ex_151",
    "amount": 5000,
    "type": "EXPENSE",
    "description": "Ремонт ноутбука після пролитої кави",
    "date": "2026-10-09",
    "accountId": "acc_main",
    "categoryId": "cat_tech"
  },
  {
    "id": "tx_ex_152",
    "amount": 617,
    "type": "EXPENSE",
    "description": "Два батона — салат, булочки",
    "date": "2026-10-10",
    "accountId": "acc_main",
    "categoryId": "cat_dining"
  },
  {
    "id": "tx_ex_153",
    "amount": 141,
    "type": "EXPENSE",
    "description": "Аврора — мисочка для тварин, цукерки",
    "date": "2026-10-10",
    "accountId": "acc_main",
    "categoryId": "cat_cats"
  },
  {
    "id": "tx_ex_154",
    "amount": 383,
    "type": "EXPENSE",
    "description": "YouTube (Із 900 грн залишку після салону; залишилось 517 грн)",
    "date": "2026-10-10",
    "accountId": "acc_main",
    "categoryId": "cat_subs"
  },
  {
    "id": "tx_ex_155",
    "amount": 130,
    "type": "EXPENSE",
    "description": "Чай у Бі",
    "date": "2026-10-11",
    "accountId": "acc_main",
    "categoryId": "cat_coffee"
  },
  {
    "id": "tx_ex_156",
    "amount": 4000,
    "type": "EXPENSE",
    "description": "Дві пари джинсів",
    "date": "2026-10-11",
    "accountId": "acc_main",
    "categoryId": "cat_clothes"
  },
  {
    "id": "tx_ex_157",
    "amount": 6,
    "type": "EXPENSE",
    "description": "Пакет",
    "date": "2026-10-11",
    "accountId": "acc_main",
    "categoryId": "cat_home"
  },
  {
    "id": "tx_ex_158",
    "amount": 120,
    "type": "EXPENSE",
    "description": "Кава",
    "date": "2026-10-12",
    "accountId": "acc_main",
    "categoryId": "cat_coffee"
  },
  {
    "id": "tx_ex_159",
    "amount": 99,
    "type": "EXPENSE",
    "description": "Їжа",
    "date": "2026-10-12",
    "accountId": "acc_main",
    "categoryId": "cat_dining"
  },
  {
    "id": "tx_ex_160",
    "amount": 115,
    "type": "EXPENSE",
    "description": "Їжа",
    "date": "2026-10-13",
    "accountId": "acc_main",
    "categoryId": "cat_dining"
  },
  {
    "id": "tx_in_161",
    "amount": 82,
    "type": "INCOME",
    "description": "Урок англійської",
    "date": "2026-10-13",
    "accountId": "acc_main",
    "categoryId": "cat_tutoring"
  },
  {
    "id": "tx_ex_162",
    "amount": 82,
    "type": "EXPENSE",
    "description": "Аптека",
    "date": "2026-10-13",
    "accountId": "acc_main",
    "categoryId": "cat_health"
  },
  {
    "id": "tx_ex_163",
    "amount": 61,
    "type": "EXPENSE",
    "description": "Вода",
    "date": "2026-10-14",
    "accountId": "acc_main",
    "categoryId": "cat_drinks"
  },
  {
    "id": "tx_in_164",
    "amount": 82,
    "type": "INCOME",
    "description": "Урок англійської",
    "date": "2026-10-15",
    "accountId": "acc_main",
    "categoryId": "cat_tutoring"
  },
  {
    "id": "tx_ex_165",
    "amount": 82,
    "type": "EXPENSE",
    "description": "Єва",
    "date": "2026-10-15",
    "accountId": "acc_main",
    "categoryId": "cat_misc"
  },
  {
    "id": "tx_ex_166",
    "amount": 135,
    "type": "EXPENSE",
    "description": "Їжа: 85 + 50",
    "date": "2026-10-15",
    "accountId": "acc_main",
    "categoryId": "cat_dining"
  },
  {
    "id": "tx_ex_167",
    "amount": 132,
    "type": "EXPENSE",
    "description": "Смаколики: 39 + 49 + 44",
    "date": "2026-10-15",
    "accountId": "acc_main",
    "categoryId": "cat_snacks"
  },
  {
    "id": "tx_xfer_168",
    "amount": 132,
    "type": "TRANSFER",
    "description": "Внесок з особистого рахунку [о.р. → с.б.]",
    "date": "2026-10-15",
    "accountId": "acc_personal",
    "categoryId": null
  },
  {
    "id": "tx_ex_169",
    "amount": 50,
    "type": "EXPENSE",
    "description": "Їжа",
    "date": "2026-10-16",
    "accountId": "acc_main",
    "categoryId": "cat_dining"
  },
  {
    "id": "tx_ex_170",
    "amount": 109,
    "type": "EXPENSE",
    "description": "Аврора",
    "date": "2026-10-17",
    "accountId": "acc_main",
    "categoryId": "cat_misc"
  },
  {
    "id": "tx_xfer_171",
    "amount": 500,
    "type": "TRANSFER",
    "description": "На твій особистий рахунок [с.б. → о.р.]",
    "date": "2026-10-17",
    "accountId": "acc_main",
    "categoryId": null
  },
  {
    "id": "tx_ex_172",
    "amount": 203,
    "type": "EXPENSE",
    "description": "Roshen",
    "date": "2026-10-17",
    "accountId": "acc_main",
    "categoryId": "cat_snacks"
  },
  {
    "id": "tx_ex_173",
    "amount": 330,
    "type": "EXPENSE",
    "description": "Сільпо",
    "date": "2026-10-17",
    "accountId": "acc_main",
    "categoryId": "cat_food"
  },
  {
    "id": "tx_ex_174",
    "amount": 919,
    "type": "EXPENSE",
    "description": "Фора",
    "date": "2026-10-17",
    "accountId": "acc_main",
    "categoryId": "cat_food"
  },
  {
    "id": "tx_ex_175",
    "amount": 95,
    "type": "EXPENSE",
    "description": "Кава",
    "date": "2026-10-18",
    "accountId": "acc_main",
    "categoryId": "cat_coffee"
  },
  {
    "id": "tx_ex_176",
    "amount": 299,
    "type": "EXPENSE",
    "description": "Світ ТВ — випадкове списання",
    "date": "2026-10-18",
    "accountId": "acc_main",
    "categoryId": "cat_subs"
  },
  {
    "id": "tx_in_177",
    "amount": 300,
    "type": "INCOME",
    "description": "Дохід із викладання",
    "date": "2026-10-18",
    "accountId": "acc_main",
    "categoryId": "cat_tutoring"
  },
  {
    "id": "tx_in_178",
    "amount": 198,
    "type": "INCOME",
    "description": "Дохід із викладання",
    "date": "2026-10-19",
    "accountId": "acc_main",
    "categoryId": "cat_tutoring"
  },
  {
    "id": "tx_in_179",
    "amount": 151,
    "type": "INCOME",
    "description": "Дохід із викладання",
    "date": "2026-10-19",
    "accountId": "acc_main",
    "categoryId": "cat_tutoring"
  },
  {
    "id": "tx_in_180",
    "amount": 110,
    "type": "INCOME",
    "description": "Дохід із викладання",
    "date": "2026-10-19",
    "accountId": "acc_main",
    "categoryId": "cat_tutoring"
  },
  {
    "id": "tx_ex_181",
    "amount": 151,
    "type": "EXPENSE",
    "description": "Прокладки, кондиціонер для волосся",
    "date": "2026-10-19",
    "accountId": "acc_main",
    "categoryId": "cat_hygiene"
  },
  {
    "id": "tx_ex_182",
    "amount": 110,
    "type": "EXPENSE",
    "description": "Аптека",
    "date": "2026-10-19",
    "accountId": "acc_main",
    "categoryId": "cat_health"
  },
  {
    "id": "tx_ex_183",
    "amount": 192,
    "type": "EXPENSE",
    "description": "Донат",
    "date": "2026-10-19",
    "accountId": "acc_main",
    "categoryId": "cat_charity"
  },
  {
    "id": "tx_ex_184",
    "amount": 200,
    "type": "EXPENSE",
    "description": "Донат",
    "date": "2026-10-19",
    "accountId": "acc_main",
    "categoryId": "cat_charity"
  },
  {
    "id": "tx_ex_185",
    "amount": 198,
    "type": "EXPENSE",
    "description": "Сендвіч",
    "date": "2026-10-19",
    "accountId": "acc_main",
    "categoryId": "cat_dining"
  },
  {
    "id": "tx_ex_186",
    "amount": 45,
    "type": "EXPENSE",
    "description": "Apple",
    "date": "2026-10-19",
    "accountId": "acc_main",
    "categoryId": "cat_subs"
  },
  {
    "id": "tx_xfer_187",
    "amount": 500,
    "type": "TRANSFER",
    "description": "На твій особистий рахунок [с.б. → о.р.]",
    "date": "2026-10-19",
    "accountId": "acc_main",
    "categoryId": null
  },
  {
    "id": "tx_ex_188",
    "amount": 150,
    "type": "EXPENSE",
    "description": "Кава",
    "date": "2026-10-20",
    "accountId": "acc_main",
    "categoryId": "cat_coffee"
  },
  {
    "id": "tx_ex_189",
    "amount": 250,
    "type": "EXPENSE",
    "description": "Щорічна вакцинація кота",
    "date": "2026-10-20",
    "accountId": "acc_main",
    "categoryId": "cat_cats"
  },
  {
    "id": "tx_in_190",
    "amount": 452,
    "type": "INCOME",
    "description": "Дохід із викладання",
    "date": "2026-10-21",
    "accountId": "acc_main",
    "categoryId": "cat_tutoring"
  },
  {
    "id": "tx_ex_191",
    "amount": 452,
    "type": "EXPENSE",
    "description": "iCloud",
    "date": "2026-10-21",
    "accountId": "acc_main",
    "categoryId": "cat_subs"
  },
  {
    "id": "tx_ex_192",
    "amount": 590,
    "type": "EXPENSE",
    "description": "Книга",
    "date": "2026-10-21",
    "accountId": "acc_main",
    "categoryId": "cat_books"
  },
  {
    "id": "tx_ex_193",
    "amount": 175,
    "type": "EXPENSE",
    "description": "Сортування сміття",
    "date": "2026-10-21",
    "accountId": "acc_main",
    "categoryId": "cat_home"
  },
  {
    "id": "tx_in_194",
    "amount": 240,
    "type": "INCOME",
    "description": "Дохід із викладання",
    "date": "2026-10-22",
    "accountId": "acc_main",
    "categoryId": "cat_tutoring"
  },
  {
    "id": "tx_in_195",
    "amount": 14400,
    "type": "INCOME",
    "description": "Аванс чоловіка",
    "date": "2026-10-22",
    "accountId": "acc_main",
    "categoryId": "cat_advance"
  },
  {
    "id": "tx_ex_196",
    "amount": 238,
    "type": "EXPENSE",
    "description": "Локшина, 2 × 119",
    "date": "2026-10-22",
    "accountId": "acc_main",
    "categoryId": "cat_dining"
  },
  {
    "id": "tx_ex_197",
    "amount": 205,
    "type": "EXPENSE",
    "description": "Кава",
    "date": "2026-10-22",
    "accountId": "acc_main",
    "categoryId": "cat_coffee"
  },
  {
    "id": "tx_in_198",
    "amount": 69,
    "type": "INCOME",
    "description": "Дохід із викладання",
    "date": "2026-10-23",
    "accountId": "acc_main",
    "categoryId": "cat_tutoring"
  },
  {
    "id": "tx_ex_199",
    "amount": 69,
    "type": "EXPENSE",
    "description": "Смаколики: 24 + 16 + 29",
    "date": "2026-10-23",
    "accountId": "acc_main",
    "categoryId": "cat_snacks"
  },
  {
    "id": "tx_ex_200",
    "amount": 30,
    "type": "EXPENSE",
    "description": "Аврора",
    "date": "2026-10-23",
    "accountId": "acc_main",
    "categoryId": "cat_misc"
  },
  {
    "id": "tx_ex_201",
    "amount": 300,
    "type": "EXPENSE",
    "description": "Шаурма на роботі",
    "date": "2026-10-23",
    "accountId": "acc_main",
    "categoryId": "cat_dining"
  },
  {
    "id": "tx_ex_202",
    "amount": 1250,
    "type": "EXPENSE",
    "description": "Проїзний",
    "date": "2026-10-23",
    "accountId": "acc_main",
    "categoryId": "cat_transport"
  },
  {
    "id": "tx_ex_203",
    "amount": 800,
    "type": "EXPENSE",
    "description": "Стрижка",
    "date": "2026-10-24",
    "accountId": "acc_main",
    "categoryId": "cat_care"
  },
  {
    "id": "tx_ex_204",
    "amount": 135,
    "type": "EXPENSE",
    "description": "Їжа й безалкогольне пиво",
    "date": "2026-10-24",
    "accountId": "acc_main",
    "categoryId": "cat_dining"
  },
  {
    "id": "tx_ex_205",
    "amount": 832,
    "type": "EXPENSE",
    "description": "Зубна паста й нічний крем",
    "date": "2026-10-25",
    "accountId": "acc_main",
    "categoryId": "cat_hygiene"
  },
  {
    "id": "tx_ex_206",
    "amount": 104,
    "type": "EXPENSE",
    "description": "Аврора",
    "date": "2026-10-25",
    "accountId": "acc_main",
    "categoryId": "cat_misc"
  },
  {
    "id": "tx_ex_207",
    "amount": 4128,
    "type": "EXPENSE",
    "description": "Корм і наповнювач для котів",
    "date": "2026-10-25",
    "accountId": "acc_main",
    "categoryId": "cat_cats"
  },
  {
    "id": "tx_ex_208",
    "amount": 238,
    "type": "EXPENSE",
    "description": "Локшина, 2 порції",
    "date": "2026-10-25",
    "accountId": "acc_main",
    "categoryId": "cat_dining"
  },
  {
    "id": "tx_in_209",
    "amount": 118,
    "type": "INCOME",
    "description": "Дохід із викладання",
    "date": "2026-10-26",
    "accountId": "acc_main",
    "categoryId": "cat_tutoring"
  },
  {
    "id": "tx_ex_210",
    "amount": 118,
    "type": "EXPENSE",
    "description": "Круасан і кола",
    "date": "2026-10-26",
    "accountId": "acc_main",
    "categoryId": "cat_dining"
  },
  {
    "id": "tx_ex_m_1001",
    "amount": 200,
    "type": "EXPENSE",
    "description": "Шавуха",
    "date": "2026-10-26",
    "accountId": "acc_main",
    "categoryId": "cat_dining"
  },
  {
    "id": "tx_ex_m_1002",
    "amount": 125,
    "type": "EXPENSE",
    "description": "Кава",
    "date": "2026-10-27",
    "accountId": "acc_main",
    "categoryId": "cat_coffee"
  },
  {
    "id": "tx_ex_m_1003",
    "amount": 238,
    "type": "EXPENSE",
    "description": "Кава і ще щось",
    "date": "2026-10-27",
    "accountId": "acc_main",
    "categoryId": "cat_coffee"
  },
  {
    "id": "tx_ex_m_1004",
    "amount": 153,
    "type": "EXPENSE",
    "description": "Продукти",
    "date": "2026-10-27",
    "accountId": "acc_main",
    "categoryId": "cat_food"
  },
  {
    "id": "tx_xfer_m_1005",
    "amount": 500,
    "type": "TRANSFER",
    "description": "Мені в о.р. [с.б. → о.р.]",
    "date": "2026-10-27",
    "accountId": "acc_main",
    "categoryId": null
  },
  {
    "id": "tx_ex_m_1006",
    "amount": 203,
    "type": "EXPENSE",
    "description": "Аптека — крем від опіків",
    "date": "2026-10-27",
    "accountId": "acc_personal",
    "categoryId": "cat_health"
  },
  {
    "id": "tx_ex_m_1007",
    "amount": 24,
    "type": "EXPENSE",
    "description": "Смаколики",
    "date": "2026-10-27",
    "accountId": "acc_personal",
    "categoryId": "cat_snacks"
  },
  {
    "id": "tx_ex_m_1008",
    "amount": 230,
    "type": "EXPENSE",
    "description": "Ісландський мох",
    "date": "2026-10-28",
    "accountId": "acc_main",
    "categoryId": "cat_health"
  },
  {
    "id": "tx_ex_m_1009",
    "amount": 126,
    "type": "EXPENSE",
    "description": "Кава",
    "date": "2026-10-28",
    "accountId": "acc_main",
    "categoryId": "cat_coffee"
  },
  {
    "id": "tx_ex_m_1010",
    "amount": 125,
    "type": "EXPENSE",
    "description": "Аврора — смаколики / солодощі",
    "date": "2026-10-28",
    "accountId": "acc_main",
    "categoryId": "cat_snacks"
  },
  {
    "id": "tx_ex_m_1011",
    "amount": 205,
    "type": "EXPENSE",
    "description": "Мандарини",
    "date": "2026-10-29",
    "accountId": "acc_main",
    "categoryId": "cat_food"
  },
  {
    "id": "tx_ex_m_1012",
    "amount": 67,
    "type": "EXPENSE",
    "description": "Вода",
    "date": "2026-10-29",
    "accountId": "acc_main",
    "categoryId": "cat_drinks"
  },
  {
    "id": "tx_xfer_m_1013",
    "amount": 200,
    "type": "TRANSFER",
    "description": "В о.р. [с.б. → о.р.]",
    "date": "2026-10-30",
    "accountId": "acc_main",
    "categoryId": null
  },
  {
    "id": "tx_in_m_1014",
    "amount": 333,
    "type": "INCOME",
    "description": "Дохід з викладання",
    "date": "2026-10-30",
    "accountId": "acc_main",
    "categoryId": "cat_tutoring"
  },
  {
    "id": "tx_in_m_1015",
    "amount": 210,
    "type": "INCOME",
    "description": "Дохід з викладання",
    "date": "2026-10-30",
    "accountId": "acc_main",
    "categoryId": "cat_tutoring"
  },
  {
    "id": "tx_ex_m_1016",
    "amount": 333,
    "type": "EXPENSE",
    "description": "Їжа готова — пекарня",
    "date": "2026-10-30",
    "accountId": "acc_main",
    "categoryId": "cat_dining"
  },
  {
    "id": "tx_in_m_1017",
    "amount": 43557,
    "type": "INCOME",
    "description": "ЗП",
    "date": "2026-10-30",
    "accountId": "acc_main",
    "categoryId": "cat_salary"
  },
  {
    "id": "tx_ex_m_1018",
    "amount": 1291,
    "type": "EXPENSE",
    "description": "Піца",
    "date": "2026-10-30",
    "accountId": "acc_main",
    "categoryId": "cat_dining"
  },
  {
    "id": "tx_ex_m_1019",
    "amount": 66,
    "type": "EXPENSE",
    "description": "Продукти",
    "date": "2026-10-30",
    "accountId": "acc_main",
    "categoryId": "cat_food"
  },
  {
    "id": "tx_ex_m_1020",
    "amount": 79,
    "type": "EXPENSE",
    "description": "Аврора — антиперспірант",
    "date": "2026-10-30",
    "accountId": "acc_personal",
    "categoryId": "cat_hygiene"
  },
  {
    "id": "tx_ex_m_1021",
    "amount": 43,
    "type": "EXPENSE",
    "description": "Аврора — шкарпетки",
    "date": "2026-10-30",
    "accountId": "acc_personal",
    "categoryId": "cat_clothes"
  },
  {
    "id": "tx_ex_m_1022",
    "amount": 1750,
    "type": "EXPENSE",
    "description": "Щомісячне погашення платежу",
    "date": "2026-10-31",
    "accountId": "acc_main",
    "categoryId": "cat_debts"
  },
  {
    "id": "tx_xfer_m_1023",
    "amount": 500,
    "type": "TRANSFER",
    "description": "В о.р. [с.б. → о.р.]",
    "date": "2026-10-31",
    "accountId": "acc_main",
    "categoryId": null
  },
  {
    "id": "tx_ex_m_1024",
    "amount": 24,
    "type": "EXPENSE",
    "description": "Аврора — насіння",
    "date": "2026-10-31",
    "accountId": "acc_main",
    "categoryId": "cat_food"
  },
  {
    "id": "tx_ex_m_1025",
    "amount": 43,
    "type": "EXPENSE",
    "description": "Аврора — шкарпетки",
    "date": "2026-10-31",
    "accountId": "acc_main",
    "categoryId": "cat_clothes"
  },
  {
    "id": "tx_ex_m_1026",
    "amount": 14,
    "type": "EXPENSE",
    "description": "Аврора — шкарпетки",
    "date": "2026-10-31",
    "accountId": "acc_main",
    "categoryId": "cat_clothes"
  },
  {
    "id": "tx_ex_m_1027",
    "amount": 39,
    "type": "EXPENSE",
    "description": "Аврора — шкарпетки",
    "date": "2026-10-31",
    "accountId": "acc_main",
    "categoryId": "cat_clothes"
  },
  {
    "id": "tx_ex_m_1028",
    "amount": 64,
    "type": "EXPENSE",
    "description": "Аврора — шкарпетки",
    "date": "2026-10-31",
    "accountId": "acc_main",
    "categoryId": "cat_clothes"
  },
  {
    "id": "tx_ex_m_1029",
    "amount": 29,
    "type": "EXPENSE",
    "description": "Аврора — батончик",
    "date": "2026-10-31",
    "accountId": "acc_main",
    "categoryId": "cat_snacks"
  },
  {
    "id": "tx_ex_m_1030",
    "amount": 280,
    "type": "EXPENSE",
    "description": "Поповнення мобільного",
    "date": "2026-11-01",
    "accountId": "acc_main",
    "categoryId": "cat_comms"
  },
  {
    "id": "tx_ex_m_1031",
    "amount": 280,
    "type": "EXPENSE",
    "description": "Поповнення мобільного",
    "date": "2026-11-01",
    "accountId": "acc_main",
    "categoryId": "cat_comms"
  },
  {
    "id": "tx_ex_m_1032",
    "amount": 310,
    "type": "EXPENSE",
    "description": "Інтернет домашній",
    "date": "2026-11-01",
    "accountId": "acc_main",
    "categoryId": "cat_comms"
  },
  {
    "id": "tx_ex_m_1033",
    "amount": 107,
    "type": "EXPENSE",
    "description": "Смаколики / солодощі",
    "date": "2026-11-01",
    "accountId": "acc_personal",
    "categoryId": "cat_snacks"
  },
  {
    "id": "tx_ex_m_1034",
    "amount": 360,
    "type": "EXPENSE",
    "description": "Фора — продукти",
    "date": "2026-11-02",
    "accountId": "acc_main",
    "categoryId": "cat_food"
  },
  {
    "id": "tx_ex_m_1035",
    "amount": 74,
    "type": "EXPENSE",
    "description": "Молоко",
    "date": "2026-11-02",
    "accountId": "acc_main",
    "categoryId": "cat_food"
  },
  {
    "id": "tx_ex_m_1036",
    "amount": 772,
    "type": "EXPENSE",
    "description": "Нутелла, горішки",
    "date": "2026-11-02",
    "accountId": "acc_main",
    "categoryId": "cat_food"
  },
  {
    "id": "tx_in_m_1037",
    "amount": 383,
    "type": "INCOME",
    "description": "Дохід з викладання",
    "date": "2026-11-03",
    "accountId": "acc_main",
    "categoryId": "cat_tutoring"
  },
  {
    "id": "tx_ex_m_1038",
    "amount": 383,
    "type": "EXPENSE",
    "description": "Мідії з подругою",
    "date": "2026-11-03",
    "accountId": "acc_main",
    "categoryId": "cat_dining"
  },
  {
    "id": "tx_ex_m_1039",
    "amount": 92,
    "type": "EXPENSE",
    "description": "Підписка Apple",
    "date": "2026-11-03",
    "accountId": "acc_main",
    "categoryId": "cat_subs"
  },
  {
    "id": "tx_ex_m_1040",
    "amount": 441,
    "type": "EXPENSE",
    "description": "Фора — продукти",
    "date": "2026-11-04",
    "accountId": "acc_main",
    "categoryId": "cat_food"
  },
  {
    "id": "tx_ex_m_1041",
    "amount": 27,
    "type": "EXPENSE",
    "description": "Фора — продукти",
    "date": "2026-11-04",
    "accountId": "acc_main",
    "categoryId": "cat_food"
  },
  {
    "id": "tx_in_m_1042",
    "amount": 77,
    "type": "INCOME",
    "description": "Дохід з викладання",
    "date": "2026-11-04",
    "accountId": "acc_main",
    "categoryId": "cat_tutoring"
  },
  {
    "id": "tx_ex_m_1043",
    "amount": 6,
    "type": "EXPENSE",
    "description": "Благодійність",
    "date": "2026-11-04",
    "accountId": "acc_personal",
    "categoryId": "cat_charity"
  },
  {
    "id": "tx_ex_m_1044",
    "amount": 200,
    "type": "EXPENSE",
    "description": "Хатуль мадан — благодійність",
    "date": "2026-11-05",
    "accountId": "acc_main",
    "categoryId": "cat_charity"
  },
  {
    "id": "tx_ex_m_1045",
    "amount": 790,
    "type": "EXPENSE",
    "description": "SEPTEMBER",
    "date": "2026-11-05",
    "accountId": "acc_main",
    "categoryId": "cat_clothes"
  },
  {
    "id": "tx_ex_m_1046",
    "amount": 2949,
    "type": "EXPENSE",
    "description": "Makeup — парфуми, паста, ополіскувач",
    "date": "2026-11-05",
    "accountId": "acc_main",
    "categoryId": "cat_cosmetics"
  },
  {
    "id": "tx_in_m_1047",
    "amount": 300,
    "type": "INCOME",
    "description": "Дохід з викладання",
    "date": "2026-11-05",
    "accountId": "acc_main",
    "categoryId": "cat_tutoring"
  },
  {
    "id": "tx_ex_m_1048",
    "amount": 428,
    "type": "EXPENSE",
    "description": "Сім. пекарня — булки",
    "date": "2026-11-05",
    "accountId": "acc_main",
    "categoryId": "cat_dining"
  },
  {
    "id": "tx_ex_m_1049",
    "amount": 609,
    "type": "EXPENSE",
    "description": "Ліки для бабусі",
    "date": "2026-11-05",
    "accountId": "acc_personal",
    "categoryId": "cat_family"
  },
  {
    "id": "tx_ex_m_1050",
    "amount": 65,
    "type": "EXPENSE",
    "description": "Вода",
    "date": "2026-11-05",
    "accountId": "acc_main",
    "categoryId": "cat_drinks"
  },
  {
    "id": "tx_ex_m_1051",
    "amount": 49,
    "type": "EXPENSE",
    "description": "Аврора — круасани",
    "date": "2026-11-06",
    "accountId": "acc_main",
    "categoryId": "cat_food"
  },
  {
    "id": "tx_ex_m_1052",
    "amount": 95,
    "type": "EXPENSE",
    "description": "Пекарня",
    "date": "2026-11-06",
    "accountId": "acc_main",
    "categoryId": "cat_dining"
  },
  {
    "id": "tx_ex_m_1053",
    "amount": 265,
    "type": "EXPENSE",
    "description": "Мандарини",
    "date": "2026-11-06",
    "accountId": "acc_personal",
    "categoryId": "cat_food"
  },
  {
    "id": "tx_ex_m_1054",
    "amount": 230,
    "type": "EXPENSE",
    "description": "Підписка Gemini",
    "date": "2026-11-06",
    "accountId": "acc_main",
    "categoryId": "cat_subs"
  },
  {
    "id": "tx_ex_m_1055",
    "amount": 1114,
    "type": "EXPENSE",
    "description": "Лійка для душу з AliExpress",
    "date": "2026-11-06",
    "accountId": "acc_main",
    "categoryId": "cat_home"
  },
  {
    "id": "tx_ex_m_1056",
    "amount": 442,
    "type": "EXPENSE",
    "description": "Новус",
    "date": "2026-11-07",
    "accountId": "acc_main",
    "categoryId": "cat_food"
  },
  {
    "id": "tx_ex_m_1057",
    "amount": 45,
    "type": "EXPENSE",
    "description": "Аптека",
    "date": "2026-11-07",
    "accountId": "acc_main",
    "categoryId": "cat_health"
  },
  {
    "id": "tx_ex_m_1058",
    "amount": 375,
    "type": "EXPENSE",
    "description": "Десерт у кав’ярні",
    "date": "2026-11-07",
    "accountId": "acc_main",
    "categoryId": "cat_coffee"
  },
  {
    "id": "tx_ex_m_1059",
    "amount": 105,
    "type": "EXPENSE",
    "description": "Круасан у кав’ярні",
    "date": "2026-11-07",
    "accountId": "acc_main",
    "categoryId": "cat_coffee"
  },
  {
    "id": "tx_ex_m_1060",
    "amount": 944,
    "type": "EXPENSE",
    "description": "Підписка Cursor",
    "date": "2026-11-07",
    "accountId": "acc_main",
    "categoryId": "cat_subs"
  },
  {
    "id": "tx_in_m_1061",
    "amount": 475,
    "type": "INCOME",
    "description": "Дохід з викладання",
    "date": "2026-11-07",
    "accountId": "acc_main",
    "categoryId": "cat_tutoring"
  },
  {
    "id": "tx_ex_m_1062",
    "amount": 475,
    "type": "EXPENSE",
    "description": "Подарунок подрузі на ДН",
    "date": "2026-11-07",
    "accountId": "acc_main",
    "categoryId": "cat_gifts"
  },
  {
    "id": "tx_ex_m_1063",
    "amount": 7708,
    "type": "EXPENSE",
    "description": "Кофти нам",
    "date": "2026-11-08",
    "accountId": "acc_main",
    "categoryId": "cat_clothes"
  },
  {
    "id": "tx_in_m_1064",
    "amount": 104,
    "type": "INCOME",
    "description": "Дохід з викладання",
    "date": "2026-11-08",
    "accountId": "acc_main",
    "categoryId": "cat_tutoring"
  },
  {
    "id": "tx_in_m_1065",
    "amount": 99,
    "type": "INCOME",
    "description": "Дохід з викладання",
    "date": "2026-11-08",
    "accountId": "acc_main",
    "categoryId": "cat_tutoring"
  },
  {
    "id": "tx_in_m_1066",
    "amount": 155,
    "type": "INCOME",
    "description": "Дохід з викладання",
    "date": "2026-11-08",
    "accountId": "acc_main",
    "categoryId": "cat_tutoring"
  },
  {
    "id": "tx_ex_m_1067",
    "amount": 421,
    "type": "EXPENSE",
    "description": "Аврора — нічник, прокладки, крем для рук, порошок кисневий",
    "date": "2026-11-08",
    "accountId": "acc_main",
    "categoryId": "cat_hygiene"
  },
  {
    "id": "tx_ex_m_1068",
    "amount": 99,
    "type": "EXPENSE",
    "description": "Кава",
    "date": "2026-11-08",
    "accountId": "acc_main",
    "categoryId": "cat_coffee"
  },
  {
    "id": "tx_ex_m_1069",
    "amount": 155,
    "type": "EXPENSE",
    "description": "Кава, чай",
    "date": "2026-11-08",
    "accountId": "acc_main",
    "categoryId": "cat_coffee"
  },
  {
    "id": "tx_ex_m_1070",
    "amount": 85,
    "type": "EXPENSE",
    "description": "Доставка для бабусі",
    "date": "2026-11-09",
    "accountId": "acc_main",
    "categoryId": "cat_delivery"
  },
  {
    "id": "tx_ex_m_1071",
    "amount": 195,
    "type": "EXPENSE",
    "description": "Кава, чай",
    "date": "2026-11-09",
    "accountId": "acc_main",
    "categoryId": "cat_coffee"
  },
  {
    "id": "tx_ex_m_1072",
    "amount": 871,
    "type": "EXPENSE",
    "description": "Рошен — солодощі",
    "date": "2026-11-09",
    "accountId": "acc_main",
    "categoryId": "cat_snacks"
  },
  {
    "id": "tx_ex_m_1073",
    "amount": 75,
    "type": "EXPENSE",
    "description": "Сміття сортування (переробка)",
    "date": "2026-11-09",
    "accountId": "acc_main",
    "categoryId": "cat_home"
  },
  {
    "id": "tx_ex_m_1074",
    "amount": 70,
    "type": "EXPENSE",
    "description": "Свічка в Sensei",
    "date": "2026-11-10",
    "accountId": "acc_main",
    "categoryId": "cat_home"
  },
  {
    "id": "tx_ex_m_1075",
    "amount": 520,
    "type": "EXPENSE",
    "description": "Сільпо — продукти, салати",
    "date": "2026-11-10",
    "accountId": "acc_main",
    "categoryId": "cat_food"
  },
  {
    "id": "tx_in_m_1076",
    "amount": 115,
    "type": "INCOME",
    "description": "Дохід з викладання",
    "date": "2026-11-10",
    "accountId": "acc_main",
    "categoryId": "cat_tutoring"
  },
  {
    "id": "tx_in_m_1077",
    "amount": 110,
    "type": "INCOME",
    "description": "Дохід з викладання",
    "date": "2026-11-10",
    "accountId": "acc_main",
    "categoryId": "cat_tutoring"
  },
  {
    "id": "tx_ex_m_1078",
    "amount": 225,
    "type": "EXPENSE",
    "description": "Кава",
    "date": "2026-11-10",
    "accountId": "acc_main",
    "categoryId": "cat_coffee"
  },
  {
    "id": "tx_ex_m_1079",
    "amount": 117,
    "type": "EXPENSE",
    "description": "Мандарини",
    "date": "2026-11-10",
    "accountId": "acc_main",
    "categoryId": "cat_food"
  }
];

export const PERIOD_SPENT_BY_CATEGORY = {
  "cat_comms": 2384,
  "cat_subs": 6113,
  "cat_debts": 10510,
  "cat_gifts": 1750,
  "cat_care": 10450,
  "cat_clothes": 19229,
  "cat_cats": 9114,
  "cat_coffee": 5397,
  "cat_leisure": 770,
  "cat_home": 1875,
  "cat_hygiene": 2527,
  "cat_drinks": 1054,
  "cat_food": 7425,
  "cat_snacks": 2626,
  "cat_cosmetics": 5739,
  "cat_transport": 5161,
  "cat_health": 4860,
  "cat_family": 1015,
  "cat_dining": 7885,
  "cat_misc": 425,
  "cat_books": 2281,
  "cat_delivery": 188,
  "cat_tech": 5000,
  "cat_charity": 598
} as const;
