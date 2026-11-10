const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

const excelPath =
  process.argv[2] ||
  "C:/Users/Tartaruga/Downloads/Сімейний_бюджет_07-09_26-10_2026.xlsx";

const wb = XLSX.readFile(excelPath, { cellDates: false, raw: true });
const sheetName =
  wb.SheetNames.find((n) => n.startsWith("Операц")) || wb.SheetNames[0];
const rows = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], {
  header: 1,
  defval: null,
  raw: true,
});

function ymd(n) {
  const d = XLSX.SSF.parse_date_code(n);
  return {
    y: d.y,
    m: d.m,
    day: d.d,
    iso: `${d.y}-${String(d.m).padStart(2, "0")}-${String(d.d).padStart(2, "0")}`,
  };
}

function slugify(name) {
  const map = {
    а: "a",
    б: "b",
    в: "v",
    г: "h",
    ґ: "g",
    д: "d",
    е: "e",
    є: "ye",
    ж: "zh",
    з: "z",
    и: "y",
    і: "i",
    ї: "yi",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "kh",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "shch",
    ь: "",
    ю: "yu",
    я: "ya",
    "’": "",
    "'": "",
    " ": "_",
    "/": "-",
  };
  let out = "";
  for (const ch of String(name).toLowerCase()) {
    out += map[ch] ?? (/[a-z0-9_-]/.test(ch) ? ch : "");
  }
  return out.replace(/_+/g, "_").replace(/-+/g, "-").replace(/^_|_$/g, "").slice(0, 40) || "misc";
}

const CAT_ALIASES = {
  Зарплата: {
    id: "cat_salary",
    name: "ЗП",
    type: "INCOME",
    icon: "₴",
    color: "#16a34a",
  },
  Аванс: {
    id: "cat_advance",
    name: "Аванс",
    type: "INCOME",
    icon: "А",
    color: "#15803d",
  },
  Викладання: {
    id: "cat_tutoring",
    name: "Викладання",
    type: "INCOME",
    icon: "В",
    color: "#22c55e",
  },
  "Внесок у бюджет": {
    id: "cat_contrib",
    name: "Внесок у бюджет",
    type: "INCOME",
    icon: "€",
    color: "#4ade80",
  },
  Підписки: {
    id: "cat_subs",
    name: "Підписки",
    type: "EXPENSE",
    icon: "П",
    color: "#6366f1",
  },
  Догляд: {
    id: "cat_care",
    name: "Догляд",
    type: "EXPENSE",
    icon: "Д",
    color: "#db2777",
  },
  "Косметика / догляд": {
    id: "cat_cosmetics",
    name: "Косметика / догляд",
    type: "EXPENSE",
    icon: "Кз",
    color: "#e11d48",
  },
  Тварини: {
    id: "cat_cats",
    name: "Тваринкам",
    type: "EXPENSE",
    icon: "🐱",
    color: "#ca8a04",
  },
  "Тварини / ветеринарія": {
    id: "cat_cats",
    name: "Тваринкам",
    type: "EXPENSE",
    icon: "🐱",
    color: "#ca8a04",
  },
  "Тварини / солодощі": {
    id: "cat_cats",
    name: "Тваринкам",
    type: "EXPENSE",
    icon: "🐱",
    color: "#ca8a04",
  },
  Продукти: {
    id: "cat_food",
    name: "Продукти",
    type: "EXPENSE",
    icon: "Пр",
    color: "#84cc16",
  },
  "Продукти / напої": {
    id: "cat_food",
    name: "Продукти",
    type: "EXPENSE",
    icon: "Пр",
    color: "#84cc16",
  },
  "Продукти / десерти": {
    id: "cat_food",
    name: "Продукти",
    type: "EXPENSE",
    icon: "Пр",
    color: "#84cc16",
  },
  "Їжа / продукти": {
    id: "cat_food",
    name: "Продукти",
    type: "EXPENSE",
    icon: "Пр",
    color: "#84cc16",
  },
  "Зв’язок": {
    id: "cat_comms",
    name: "Зв’язок",
    type: "EXPENSE",
    icon: "📱",
    color: "#0ea5e9",
  },
  "Зв’язок та інтернет": {
    id: "cat_comms",
    name: "Зв’язок",
    type: "EXPENSE",
    icon: "📱",
    color: "#0ea5e9",
  },
  Транспорт: {
    id: "cat_transport",
    name: "Транспорт",
    type: "EXPENSE",
    icon: "Т",
    color: "#0284c7",
  },
  Таксі: {
    id: "cat_transport",
    name: "Транспорт",
    type: "EXPENSE",
    icon: "Т",
    color: "#0284c7",
  },
  "Кава / кафе": {
    id: "cat_coffee",
    name: "Кава",
    type: "EXPENSE",
    icon: "☕",
    color: "#65a30d",
  },
  "Здоров’я": {
    id: "cat_health",
    name: "Здоров’я",
    type: "EXPENSE",
    icon: "+",
    color: "#059669",
  },
  Борги: {
    id: "cat_debts",
    name: "Борги / кредити",
    type: "EXPENSE",
    icon: "Б",
    color: "#dc2626",
  },
  "Кредити / розстрочки": {
    id: "cat_debts",
    name: "Борги / кредити",
    type: "EXPENSE",
    icon: "Б",
    color: "#dc2626",
  },
  "Готова їжа": {
    id: "cat_dining",
    name: "Готова їжа",
    type: "EXPENSE",
    icon: "Ї",
    color: "#ea580c",
  },
  Їжа: {
    id: "cat_dining",
    name: "Готова їжа",
    type: "EXPENSE",
    icon: "Ї",
    color: "#ea580c",
  },
  "Їжа / напої": {
    id: "cat_dining",
    name: "Готова їжа",
    type: "EXPENSE",
    icon: "Ї",
    color: "#ea580c",
  },
  "Їжа / перекуси": {
    id: "cat_dining",
    name: "Готова їжа",
    type: "EXPENSE",
    icon: "Ї",
    color: "#ea580c",
  },
  "Солодощі / перекуси": {
    id: "cat_snacks",
    name: "Солодощі / перекуси",
    type: "EXPENSE",
    icon: "С",
    color: "#f97316",
  },
  "Вода / напої": {
    id: "cat_drinks",
    name: "Вода / напої",
    type: "EXPENSE",
    icon: "Вд",
    color: "#38bdf8",
  },
  "Одяг і взуття": {
    id: "cat_clothes",
    name: "Одяг і взуття",
    type: "EXPENSE",
    icon: "О",
    color: "#7c3aed",
  },
  Дозвілля: {
    id: "cat_leisure",
    name: "Дозвілля",
    type: "EXPENSE",
    icon: "Дз",
    color: "#c026d3",
  },
  Книги: {
    id: "cat_books",
    name: "Книги",
    type: "EXPENSE",
    icon: "Кн",
    color: "#a855f7",
  },
  Подарунки: {
    id: "cat_gifts",
    name: "Подарунки",
    type: "EXPENSE",
    icon: "🎁",
    color: "#e11d48",
  },
  "Дім і побут": {
    id: "cat_home",
    name: "Дім і побут",
    type: "EXPENSE",
    icon: "Пб",
    color: "#78716c",
  },
  "Переробка сміття": {
    id: "cat_home",
    name: "Дім і побут",
    type: "EXPENSE",
    icon: "Пб",
    color: "#78716c",
  },
  Пакування: {
    id: "cat_home",
    name: "Дім і побут",
    type: "EXPENSE",
    icon: "Пб",
    color: "#78716c",
  },
  Гігієна: {
    id: "cat_hygiene",
    name: "Гігієна",
    type: "EXPENSE",
    icon: "Г",
    color: "#14b8a6",
  },
  "Гігієна / догляд": {
    id: "cat_hygiene",
    name: "Гігієна",
    type: "EXPENSE",
    icon: "Г",
    color: "#14b8a6",
  },
  "Гігієна / одяг": {
    id: "cat_hygiene",
    name: "Гігієна",
    type: "EXPENSE",
    icon: "Г",
    color: "#14b8a6",
  },
  "Допомога родині": {
    id: "cat_family",
    name: "Допомога родині",
    type: "EXPENSE",
    icon: "Р",
    color: "#f59e0b",
  },
  Доставка: {
    id: "cat_delivery",
    name: "Доставка",
    type: "EXPENSE",
    icon: "📦",
    color: "#64748b",
  },
  "Техніка / ремонт": {
    id: "cat_tech",
    name: "Техніка / ремонт",
    type: "EXPENSE",
    icon: "🔧",
    color: "#475569",
  },
  Благодійність: {
    id: "cat_charity",
    name: "Благодійність",
    type: "EXPENSE",
    icon: "❤",
    color: "#f43f5e",
  },
  "Покупки без деталізації": {
    id: "cat_misc",
    name: "Покупки без деталізації",
    type: "EXPENSE",
    icon: "?",
    color: "#94a3b8",
  },
  "Внутрішній переказ": null,
};

function normKey(s) {
  return String(s).replace(/[’']/g, "'");
}

function mapCat(name) {
  if (!name) return null;
  if (CAT_ALIASES[name] !== undefined) return CAT_ALIASES[name];
  for (const [k, v] of Object.entries(CAT_ALIASES)) {
    if (normKey(k) === normKey(name)) return v;
  }
  return {
    id: "cat_" + slugify(name),
    name,
    type: "EXPENSE",
    icon: name.slice(0, 1).toUpperCase(),
    color: "#64748b",
  };
}

/** Rule: unmarked → с.б.; о.р. only when explicit. */
function resolveAccount(raw) {
  const a = String(raw || "").trim();
  if (a === "о.р.") return { kind: "account", id: "acc_personal" };
  if (a === "с.б.") return { kind: "account", id: "acc_main" };
  if (a === "Відкладені кошти") return { kind: "account", id: "acc_deferred" };
  if (a === "о.р. → с.б.")
    return { kind: "transfer", from: "acc_personal", to: "acc_main" };
  if (a === "с.б. → о.р.")
    return { kind: "transfer", from: "acc_main", to: "acc_personal" };
  return { kind: "account", id: "acc_main" };
}

const header = rows[0].map((h) => String(h || "").trim());
// New file: Дата | Тип | Рахунок | Категорія | Опис | Сума | Примітка
const idx = {
  date: header.indexOf("Дата"),
  type: header.indexOf("Тип"),
  account: header.indexOf("Рахунок"),
  category: header.indexOf("Категорія"),
  desc: header.indexOf("Опис"),
  amount: header.findIndex((h) => h.startsWith("Сума")),
  note: header.indexOf("Примітка"),
};

const ops = [];
for (let i = 1; i < rows.length; i++) {
  const r = rows[i];
  if (!r || r.every((c) => c == null || c === "")) continue;
  ops.push({
    excelRow: i + 1,
    date: ymd(r[idx.date]),
    type: String(r[idx.type] || "").trim(),
    account: String(r[idx.account] || "").trim(),
    cat: String(r[idx.category] || "").trim(),
    desc: String(r[idx.desc] || "").trim(),
    amount: Number(r[idx.amount]),
    note: r[idx.note] ? String(r[idx.note]).trim() : null,
  });
}

const categoriesById = new Map();
for (const def of Object.values(CAT_ALIASES)) {
  if (def) categoriesById.set(def.id, def);
}

let mainBal = 0;
let personalBal = 0;
let deferredBal = 0;
const transactions = [];

function credit(accountId, amount) {
  if (accountId === "acc_main") mainBal += amount;
  else if (accountId === "acc_personal") personalBal += amount;
  else if (accountId === "acc_deferred") deferredBal += amount;
}

function debit(accountId, amount) {
  credit(accountId, -amount);
}

for (const op of ops) {
  const desc = op.note ? `${op.desc} (${op.note})` : op.desc;
  const resolved = resolveAccount(op.account);

  if (op.type === "Переказ" || resolved.kind === "transfer") {
    if (resolved.kind !== "transfer") {
      throw new Error(`Transfer without route at row ${op.excelRow}`);
    }
    debit(resolved.from, op.amount);
    credit(resolved.to, op.amount);
    transactions.push({
      id: `tx_xfer_${op.excelRow}`,
      amount: op.amount,
      type: "TRANSFER",
      description: `${desc} [${op.account}]`,
      date: op.date.iso,
      accountId: resolved.from,
      categoryId: null,
    });
    continue;
  }

  if (op.type === "Дохід") {
    let cat = mapCat(op.cat);
    if (!cat) {
      cat = {
        id: "cat_" + slugify(op.cat || "income"),
        name: op.cat || "Дохід",
        type: "INCOME",
        icon: "₴",
        color: "#16a34a",
      };
    }
    cat = { ...cat, type: "INCOME" };
    categoriesById.set(cat.id, cat);
    credit(resolved.id, op.amount);
    transactions.push({
      id: `tx_in_${op.excelRow}`,
      amount: op.amount,
      type: "INCOME",
      description: desc,
      date: op.date.iso,
      accountId: resolved.id,
      categoryId: cat.id,
    });
    continue;
  }

  if (op.type === "Витрата") {
    const cat = mapCat(op.cat);
    if (!cat) throw new Error(`No category for expense row ${op.excelRow}`);
    categoriesById.set(cat.id, { ...cat, type: "EXPENSE" });
    debit(resolved.id, op.amount);
    transactions.push({
      id: `tx_ex_${op.excelRow}`,
      amount: op.amount,
      type: "EXPENSE",
      description: desc,
      date: op.date.iso,
      accountId: resolved.id,
      categoryId: cat.id,
    });
    continue;
  }

  throw new Error(`Unknown type ${op.type} at row ${op.excelRow}`);
}

const spentByCat = {};
for (const t of transactions) {
  if (t.type !== "EXPENSE" || !t.categoryId) continue;
  spentByCat[t.categoryId] = (spentByCat[t.categoryId] || 0) + t.amount;
}

const expenseCatOrder = Object.entries(spentByCat)
  .sort((a, b) => b[1] - a[1])
  .map(([id]) => id);

const out = {
  balances: {
    mainBal,
    personalBal,
    deferredBal,
    net: mainBal + personalBal + deferredBal,
  },
  categories: [...categoriesById.values()],
  expenseCatOrder,
  spentByCat,
  transactions,
  counts: {
    income: transactions.filter((t) => t.type === "INCOME").length,
    expense: transactions.filter((t) => t.type === "EXPENSE").length,
    transfer: transactions.filter((t) => t.type === "TRANSFER").length,
  },
};

const incomeSum = transactions
  .filter((t) => t.type === "INCOME")
  .reduce((s, t) => s + t.amount, 0);
const expenseSum = transactions
  .filter((t) => t.type === "EXPENSE")
  .reduce((s, t) => s + t.amount, 0);
const transferSum = transactions
  .filter((t) => t.type === "TRANSFER")
  .reduce((s, t) => s + t.amount, 0);

console.log(
  JSON.stringify(
    {
      sheet: sheetName,
      ops: ops.length,
      balances: out.balances,
      counts: out.counts,
      sums: { incomeSum, expenseSum, transferSum },
      expected: { inc: 99545, exp: 86052, tr: 1910 },
    },
    null,
    2
  )
);

const lines = [];
lines.push(
  "/** Auto-generated from Сімейний_бюджет_07-09_26-10_2026.xlsx */"
);
lines.push(
  "/** Rule: unmarked account → с.б.; о.р. only when explicitly marked. */"
);
lines.push("export const PERIOD_SEED_REVISION = 19;");
lines.push("");
lines.push("export const PERIOD_SEED_MARKER_TX_IDS = [");
for (const id of out.transactions.slice(0, 8).map((t) => t.id)) {
  lines.push(`  "${id}",`);
}
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
  `export const PERIOD_SEED_CATEGORIES = ${JSON.stringify(out.categories, null, 2)} as const;`
);
lines.push("");
lines.push(
  `export const PERIOD_EXPENSE_CATEGORY_IDS = ${JSON.stringify(out.expenseCatOrder, null, 2)} as const;`
);
lines.push("");
lines.push(
  `export const PERIOD_SEED_BALANCES = ${JSON.stringify(out.balances, null, 2)} as const;`
);
lines.push("");
lines.push(
  `export const PERIOD_SEED_TRANSACTIONS: PeriodSeedTx[] = ${JSON.stringify(out.transactions, null, 2)};`
);
lines.push("");
lines.push(
  `export const PERIOD_SPENT_BY_CATEGORY = ${JSON.stringify(out.spentByCat, null, 2)} as const;`
);

const outPath = path.join(__dirname, "..", "lib", "period-seed-data.ts");
fs.writeFileSync(outPath, lines.join("\n") + "\n");
console.log("wrote", outPath);
