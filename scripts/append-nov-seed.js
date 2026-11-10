const fs = require("fs");
const path = require("path");

const seedPath = path.join(__dirname, "..", "lib", "period-seed-data.ts");
const src = fs.readFileSync(seedPath, "utf8");

const txMatch = src.match(
  /export const PERIOD_SEED_TRANSACTIONS: PeriodSeedTx\[\] = (\[[\s\S]*?\]);\n\nexport const PERIOD_SPENT_BY_CATEGORY/
);
const catMatch = src.match(
  /export const PERIOD_SEED_CATEGORIES = (\[[\s\S]*?\]) as const;/
);
if (!txMatch || !catMatch) throw new Error("Cannot parse period-seed-data.ts");

const existing = JSON.parse(txMatch[1]);
const cats = JSON.parse(catMatch[1]);

const additions = [];
function add(date, type, accountId, categoryId, amount, description) {
  additions.push({ date, type, accountId, categoryId, amount, description });
}

// 26.10
add("2026-10-26", "EXPENSE", "acc_main", "cat_dining", 200, "Шавуха");

// 27.10
add("2026-10-27", "EXPENSE", "acc_main", "cat_coffee", 125, "Кава");
add("2026-10-27", "EXPENSE", "acc_main", "cat_coffee", 238, "Кава і ще щось");
add("2026-10-27", "EXPENSE", "acc_main", "cat_food", 153, "Продукти");
add(
  "2026-10-27",
  "TRANSFER",
  "acc_main",
  null,
  500,
  "Мені в о.р. [с.б. → о.р.]"
);
add(
  "2026-10-27",
  "EXPENSE",
  "acc_personal",
  "cat_health",
  203,
  "Аптека — крем від опіків"
);
add("2026-10-27", "EXPENSE", "acc_personal", "cat_snacks", 24, "Смаколики");

// 28.10
add("2026-10-28", "EXPENSE", "acc_main", "cat_health", 230, "Ісландський мох");
add("2026-10-28", "EXPENSE", "acc_main", "cat_coffee", 126, "Кава");
add(
  "2026-10-28",
  "EXPENSE",
  "acc_main",
  "cat_snacks",
  125,
  "Аврора — смаколики / солодощі"
);

// 29.10
add("2026-10-29", "EXPENSE", "acc_main", "cat_food", 205, "Мандарини");
add("2026-10-29", "EXPENSE", "acc_main", "cat_drinks", 67, "Вода");

// 30.10
add("2026-10-30", "TRANSFER", "acc_main", null, 200, "В о.р. [с.б. → о.р.]");
add(
  "2026-10-30",
  "INCOME",
  "acc_main",
  "cat_tutoring",
  333,
  "Дохід з викладання"
);
add(
  "2026-10-30",
  "INCOME",
  "acc_main",
  "cat_tutoring",
  210,
  "Дохід з викладання"
);
add(
  "2026-10-30",
  "EXPENSE",
  "acc_main",
  "cat_dining",
  333,
  "Їжа готова — пекарня"
);
add("2026-10-30", "INCOME", "acc_main", "cat_salary", 43557, "ЗП");
add("2026-10-30", "EXPENSE", "acc_main", "cat_dining", 1291, "Піца");
add("2026-10-30", "EXPENSE", "acc_main", "cat_food", 66, "Продукти");
add(
  "2026-10-30",
  "EXPENSE",
  "acc_personal",
  "cat_hygiene",
  79,
  "Аврора — антиперспірант"
);
add(
  "2026-10-30",
  "EXPENSE",
  "acc_personal",
  "cat_clothes",
  43,
  "Аврора — шкарпетки"
);

// 31.10
add(
  "2026-10-31",
  "EXPENSE",
  "acc_main",
  "cat_debts",
  1750,
  "Щомісячне погашення платежу"
);
add("2026-10-31", "TRANSFER", "acc_main", null, 500, "В о.р. [с.б. → о.р.]");
add("2026-10-31", "EXPENSE", "acc_main", "cat_food", 24, "Аврора — насіння");
add(
  "2026-10-31",
  "EXPENSE",
  "acc_main",
  "cat_clothes",
  43,
  "Аврора — шкарпетки"
);
add(
  "2026-10-31",
  "EXPENSE",
  "acc_main",
  "cat_clothes",
  14,
  "Аврора — шкарпетки"
);
add(
  "2026-10-31",
  "EXPENSE",
  "acc_main",
  "cat_clothes",
  39,
  "Аврора — шкарпетки"
);
add(
  "2026-10-31",
  "EXPENSE",
  "acc_main",
  "cat_clothes",
  64,
  "Аврора — шкарпетки"
);
add(
  "2026-10-31",
  "EXPENSE",
  "acc_main",
  "cat_snacks",
  29,
  "Аврора — батончик"
);

// 01.11
add(
  "2026-11-01",
  "EXPENSE",
  "acc_main",
  "cat_comms",
  280,
  "Поповнення мобільного"
);
add(
  "2026-11-01",
  "EXPENSE",
  "acc_main",
  "cat_comms",
  280,
  "Поповнення мобільного"
);
add(
  "2026-11-01",
  "EXPENSE",
  "acc_main",
  "cat_comms",
  310,
  "Інтернет домашній"
);
add(
  "2026-11-01",
  "EXPENSE",
  "acc_personal",
  "cat_snacks",
  107,
  "Смаколики / солодощі"
);

// 02.11
add("2026-11-02", "EXPENSE", "acc_main", "cat_food", 360, "Фора — продукти");
add("2026-11-02", "EXPENSE", "acc_main", "cat_food", 74, "Молоко");
add("2026-11-02", "EXPENSE", "acc_main", "cat_food", 772, "Нутелла, горішки");

// 03.11
add(
  "2026-11-03",
  "INCOME",
  "acc_main",
  "cat_tutoring",
  383,
  "Дохід з викладання"
);
add("2026-11-03", "EXPENSE", "acc_main", "cat_dining", 383, "Мідії з подругою");
add("2026-11-03", "EXPENSE", "acc_main", "cat_subs", 92, "Підписка Apple");

// 04.11
add("2026-11-04", "EXPENSE", "acc_main", "cat_food", 441, "Фора — продукти");
add("2026-11-04", "EXPENSE", "acc_main", "cat_food", 27, "Фора — продукти");
add(
  "2026-11-04",
  "INCOME",
  "acc_main",
  "cat_tutoring",
  77,
  "Дохід з викладання"
);
add("2026-11-04", "EXPENSE", "acc_personal", "cat_charity", 6, "Благодійність");

// 05.11
add(
  "2026-11-05",
  "EXPENSE",
  "acc_main",
  "cat_charity",
  200,
  "Хатуль мадан — благодійність"
);
add("2026-11-05", "EXPENSE", "acc_main", "cat_clothes", 790, "SEPTEMBER");
add(
  "2026-11-05",
  "EXPENSE",
  "acc_main",
  "cat_cosmetics",
  2949,
  "Makeup — парфуми, паста, ополіскувач"
);
add(
  "2026-11-05",
  "INCOME",
  "acc_main",
  "cat_tutoring",
  300,
  "Дохід з викладання"
);
add(
  "2026-11-05",
  "EXPENSE",
  "acc_main",
  "cat_dining",
  428,
  "Сім. пекарня — булки"
);
add(
  "2026-11-05",
  "EXPENSE",
  "acc_personal",
  "cat_family",
  609,
  "Ліки для бабусі"
);
add("2026-11-05", "EXPENSE", "acc_main", "cat_drinks", 65, "Вода");

// 06.11
add("2026-11-06", "EXPENSE", "acc_main", "cat_food", 49, "Аврора — круасани");
add("2026-11-06", "EXPENSE", "acc_main", "cat_dining", 95, "Пекарня");
add("2026-11-06", "EXPENSE", "acc_personal", "cat_food", 265, "Мандарини");
add("2026-11-06", "EXPENSE", "acc_main", "cat_subs", 230, "Підписка Gemini");
add(
  "2026-11-06",
  "EXPENSE",
  "acc_main",
  "cat_home",
  1114,
  "Лійка для душу з AliExpress"
);

// 07.11
add("2026-11-07", "EXPENSE", "acc_main", "cat_food", 442, "Новус");
add("2026-11-07", "EXPENSE", "acc_main", "cat_health", 45, "Аптека");
add(
  "2026-11-07",
  "EXPENSE",
  "acc_main",
  "cat_coffee",
  375,
  "Десерт у кав’ярні"
);
add(
  "2026-11-07",
  "EXPENSE",
  "acc_main",
  "cat_coffee",
  105,
  "Круасан у кав’ярні"
);
add("2026-11-07", "EXPENSE", "acc_main", "cat_subs", 944, "Підписка Cursor");
add(
  "2026-11-07",
  "INCOME",
  "acc_main",
  "cat_tutoring",
  475,
  "Дохід з викладання"
);
add(
  "2026-11-07",
  "EXPENSE",
  "acc_main",
  "cat_gifts",
  475,
  "Подарунок подрузі на ДН"
);

// 08.11
add("2026-11-08", "EXPENSE", "acc_main", "cat_clothes", 7708, "Кофти нам");
add(
  "2026-11-08",
  "INCOME",
  "acc_main",
  "cat_tutoring",
  104,
  "Дохід з викладання"
);
add(
  "2026-11-08",
  "INCOME",
  "acc_main",
  "cat_tutoring",
  99,
  "Дохід з викладання"
);
add(
  "2026-11-08",
  "INCOME",
  "acc_main",
  "cat_tutoring",
  155,
  "Дохід з викладання"
);
add(
  "2026-11-08",
  "EXPENSE",
  "acc_main",
  "cat_hygiene",
  421,
  "Аврора — нічник, прокладки, крем для рук, порошок кисневий"
);
add("2026-11-08", "EXPENSE", "acc_main", "cat_coffee", 99, "Кава");
add("2026-11-08", "EXPENSE", "acc_main", "cat_coffee", 155, "Кава, чай");

// 09.11
add(
  "2026-11-09",
  "EXPENSE",
  "acc_main",
  "cat_delivery",
  85,
  "Доставка для бабусі"
);
add("2026-11-09", "EXPENSE", "acc_main", "cat_coffee", 195, "Кава, чай");
add(
  "2026-11-09",
  "EXPENSE",
  "acc_main",
  "cat_snacks",
  871,
  "Рошен — солодощі"
);
add(
  "2026-11-09",
  "EXPENSE",
  "acc_main",
  "cat_home",
  75,
  "Сміття сортування (переробка)"
);

// 10.11
add("2026-11-10", "EXPENSE", "acc_main", "cat_home", 70, "Свічка в Sensei");
add(
  "2026-11-10",
  "EXPENSE",
  "acc_main",
  "cat_food",
  520,
  "Сільпо — продукти, салати"
);
add(
  "2026-11-10",
  "INCOME",
  "acc_main",
  "cat_tutoring",
  115,
  "Дохід з викладання"
);
add(
  "2026-11-10",
  "INCOME",
  "acc_main",
  "cat_tutoring",
  110,
  "Дохід з викладання"
);
add("2026-11-10", "EXPENSE", "acc_main", "cat_coffee", 225, "Кава");
add("2026-11-10", "EXPENSE", "acc_main", "cat_food", 117, "Мандарини");

let seq = 1000;
const newTxs = additions.map((a) => {
  seq += 1;
  const prefix =
    a.type === "INCOME" ? "tx_in" : a.type === "TRANSFER" ? "tx_xfer" : "tx_ex";
  return {
    id: `${prefix}_m_${seq}`,
    amount: a.amount,
    type: a.type,
    description: a.description,
    date: a.date,
    accountId: a.accountId,
    categoryId: a.categoryId,
  };
});

const all = [...existing, ...newTxs];

let mainBal = 0;
let personalBal = 0;
let deferredBal = 0;
function credit(id, amt) {
  if (id === "acc_main") mainBal += amt;
  else if (id === "acc_personal") personalBal += amt;
  else if (id === "acc_deferred") deferredBal += amt;
}

for (const t of all) {
  if (t.type === "INCOME") credit(t.accountId, t.amount);
  else if (t.type === "EXPENSE") credit(t.accountId, -t.amount);
  else if (t.type === "TRANSFER") {
    credit(t.accountId, -t.amount);
    if (t.accountId === "acc_main") credit("acc_personal", t.amount);
    else if (t.accountId === "acc_personal") credit("acc_main", t.amount);
  }
}

const spentByCat = {};
for (const t of all) {
  if (t.type !== "EXPENSE" || !t.categoryId) continue;
  spentByCat[t.categoryId] = (spentByCat[t.categoryId] || 0) + t.amount;
}
const expenseCatOrder = Object.entries(spentByCat)
  .sort((a, b) => b[1] - a[1])
  .map(([id]) => id);

const incomeSum = all
  .filter((t) => t.type === "INCOME")
  .reduce((s, t) => s + t.amount, 0);
const expenseSum = all
  .filter((t) => t.type === "EXPENSE")
  .reduce((s, t) => s + t.amount, 0);
const transferSum = all
  .filter((t) => t.type === "TRANSFER")
  .reduce((s, t) => s + t.amount, 0);

console.log(
  JSON.stringify(
    {
      added: newTxs.length,
      totalTx: all.length,
      incomeSum,
      expenseSum,
      transferSum,
      balances: {
        mainBal,
        personalBal,
        deferredBal,
        net: mainBal + personalBal + deferredBal,
      },
      counts: {
        income: all.filter((t) => t.type === "INCOME").length,
        expense: all.filter((t) => t.type === "EXPENSE").length,
        transfer: all.filter((t) => t.type === "TRANSFER").length,
      },
    },
    null,
    2
  )
);

const lines = [];
lines.push(
  "/** Auto-generated from Сімейний_бюджет_07-09_26-10_2026.xlsx + appendix 26.10–10.11.2026 */"
);
lines.push(
  "/** Rule: unmarked account → с.б.; о.р. only when explicitly marked. */"
);
lines.push("export const PERIOD_SEED_REVISION = 20;");
lines.push("");
lines.push("export const PERIOD_SEED_MARKER_TX_IDS = [");
for (const id of all.slice(0, 8).map((t) => t.id)) lines.push(`  "${id}",`);
lines.push("] as const;");
lines.push("");
lines.push("export type PeriodSeedTx = {");
lines.push("  id: string;");
lines.push("  amount: number;");
lines.push('  type: "INCOME" | "EXPENSE" | "TRANSFER";');
lines.push("  description: string;");
lines.push("  /** YYYY-MM-DD */");
lines.push("  date: string;");
lines.push("  accountId: string;");
lines.push("  categoryId: string | null;");
lines.push("};");
lines.push("");
lines.push(
  `export const PERIOD_SEED_CATEGORIES = ${JSON.stringify(cats, null, 2)} as const;`
);
lines.push("");
lines.push(
  `export const PERIOD_EXPENSE_CATEGORY_IDS = ${JSON.stringify(expenseCatOrder, null, 2)} as const;`
);
lines.push("");
lines.push(
  `export const PERIOD_SEED_BALANCES = ${JSON.stringify(
    {
      mainBal,
      personalBal,
      deferredBal,
      net: mainBal + personalBal + deferredBal,
    },
    null,
    2
  )} as const;`
);
lines.push("");
lines.push(
  `export const PERIOD_SEED_TRANSACTIONS: PeriodSeedTx[] = ${JSON.stringify(all, null, 2)};`
);
lines.push("");
lines.push(
  `export const PERIOD_SPENT_BY_CATEGORY = ${JSON.stringify(spentByCat, null, 2)} as const;`
);

fs.writeFileSync(seedPath, lines.join("\n") + "\n");
console.log("wrote", seedPath);
