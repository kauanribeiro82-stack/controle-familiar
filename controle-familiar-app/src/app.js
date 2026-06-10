import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBBQ18MTog7DYgoKRhIPo7_QxeiggM4Gc",
  authDomain: "controle-familiar-18cfd.firebaseapp.com",
  projectId: "controle-familiar-18cfd",
  storageBucket: "controle-familiar-18cfd.firebasestorage.app",
  messagingSenderId: "38920513702",
  appId: "1:38920513702:web:887a2163bc4fbdd3552c67",
  measurementId: "G-RF5P9QBWVE",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const FAMILY_ID = "lara-ayres-ribeiro";

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

let seedEntries = [
  {
    id: "seed-1",
    owner: "Kauan",
    type: "expense",
    description: "Futebol",
    category: "Lazer",
    amount: 10,
    date: "2026-06-02",
    dueDate: "2026-06-02",
    status: "Pago",
    recurrence: "Mensal",
    installmentsLeft: 0,
    paidBy: "Kauan",
  },
  {
    id: "seed-2",
    owner: "Casal",
    type: "expense",
    description: "Carro",
    category: "Transporte",
    amount: 400,
    date: "2026-06-05",
    dueDate: "2026-06-10",
    status: "Pendente",
    recurrence: "Mensal",
    installmentsLeft: 0,
    paidBy: "Kauan",
  },
  {
    id: "seed-3",
    owner: "Casal",
    type: "expense",
    description: "Custo da Jade",
    category: "Jade",
    amount: 900,
    date: "2026-06-08",
    dueDate: "2026-06-15",
    status: "Pendente",
    recurrence: "Mensal",
    installmentsLeft: 0,
    paidBy: "Nao informado",
  },
  {
    id: "seed-7",
    owner: "Casal",
    type: "expense",
    description: "Emprestimo",
    category: "Outros",
    amount: 250,
    date: "2026-06-01",
    dueDate: "2026-06-01",
    status: "Pendente",
    recurrence: "Mensal",
    installmentsLeft: 0,
    paidBy: "Kauan",
  },
  {
    id: "seed-8",
    owner: "Casal",
    type: "expense",
    description: "Camisas venda",
    category: "Outros",
    amount: 149.89,
    date: "2026-06-14",
    dueDate: "2026-06-14",
    status: "Pendente",
    recurrence: "Mensal",
    installmentsLeft: 0,
    paidBy: "Kauan",
  },
  {
    id: "seed-9",
    owner: "Kauan",
    type: "expense",
    description: "Curso",
    category: "Educacao",
    amount: 150,
    date: "2026-06-01",
    dueDate: "2026-06-01",
    status: "Pendente",
    recurrence: "Mensal",
    installmentsLeft: 0,
    paidBy: "Kauan",
  },
  {
    id: "seed-10",
    owner: "Casal",
    type: "expense",
    description: "Agua",
    category: "Moradia",
    amount: 105,
    date: "2026-06-10",
    dueDate: "2026-06-10",
    status: "Pendente",
    recurrence: "Mensal",
    installmentsLeft: 0,
    paidBy: "Kauan",
  },
  {
    id: "seed-11",
    owner: "Casal",
    type: "expense",
    description: "Telefone celular",
    category: "Moradia",
    amount: 90,
    date: "2026-06-10",
    dueDate: "2026-06-10",
    status: "Pendente",
    recurrence: "Mensal",
    installmentsLeft: 0,
    paidBy: "Kauan",
  },
  {
    id: "seed-12",
    owner: "Casal",
    type: "expense",
    description: "Combustivel",
    category: "Transporte",
    amount: 300,
    date: "2026-06-10",
    dueDate: "2026-06-10",
    status: "Pendente",
    recurrence: "Mensal",
    installmentsLeft: 0,
    paidBy: "Kauan",
  },
  {
    id: "seed-13",
    owner: "Casal",
    type: "expense",
    description: "Farmacia",
    category: "Saude",
    amount: 420,
    date: "2026-06-15",
    dueDate: "2026-06-15",
    status: "Pendente",
    recurrence: "Mensal",
    installmentsLeft: 0,
    paidBy: "Nao informado",
  },
  {
    id: "seed-14",
    owner: "Raissa",
    type: "expense",
    description: "Kindle Raissa",
    category: "Outros",
    amount: 62.9,
    date: "2026-06-14",
    dueDate: "2026-06-14",
    status: "Pendente",
    recurrence: "Mensal",
    installmentsLeft: 0,
    paidBy: "Kauan",
  },
  {
    id: "seed-4",
    owner: "Raissa",
    type: "income",
    description: "Pensao",
    category: "Receitas",
    amount: 950,
    date: "2026-06-05",
    dueDate: "2026-06-05",
    status: "Pago",
    recurrence: "Mensal",
    installmentsLeft: 0,
    paidBy: "Nao informado",
  },
  {
    id: "seed-5",
    owner: "Kauan",
    type: "income",
    description: "Salario",
    category: "Receitas",
    amount: 2000,
    date: "2026-06-01",
    dueDate: "2026-06-01",
    status: "Pago",
    recurrence: "Mensal",
    installmentsLeft: 0,
    paidBy: "Nao informado",
  },
  {
    id: "seed-6",
    owner: "Casal",
    type: "investment",
    description: "Fundos",
    category: "Investimentos",
    amount: 250,
    date: "2026-06-12",
    dueDate: "2026-06-12",
    status: "Pendente",
    recurrence: "Mensal",
    installmentsLeft: 0,
    paidBy: "Kauan",
  },
];

const legacySeedIds = new Set(seedEntries.map((entry) => entry.id));
seedEntries = buildSpreadsheetSeedEntries();

let entries = JSON.parse(localStorage.getItem("controle-familiar.entries") || "null") || seedEntries;
entries = entries.map((entry) => ({ ...entry, id: entry.id || crypto.randomUUID() }));
let currentUser = null;
let cloudReady = false;
if (!localStorage.getItem("controle-familiar.migration-planilha-2026-v1")) {
  const manualEntries = entries.filter((entry) => !legacySeedIds.has(entry.id) && !entry.id.startsWith("planilha-2026-"));
  entries = [...manualEntries, ...seedEntries];
  localStorage.setItem("controle-familiar.migration-planilha-2026-v1", "done");
  localStorage.setItem("controle-familiar.entries", JSON.stringify(entries));
}
if (!localStorage.getItem("controle-familiar.migration-planilha-2026-v2")) {
  const manualEntries = entries.filter((entry) => !legacySeedIds.has(entry.id) && !entry.id.startsWith("planilha-2026-"));
  entries = [...manualEntries, ...seedEntries];
  localStorage.setItem("controle-familiar.migration-planilha-2026-v2", "done");
  localStorage.setItem("controle-familiar.entries", JSON.stringify(entries));
}
if (!localStorage.getItem("controle-familiar.migration-remove-due-date-v1")) {
  entries = entries.map(({ dueDate, ...entry }) => entry);
  localStorage.setItem("controle-familiar.migration-remove-due-date-v1", "done");
  localStorage.setItem("controle-familiar.entries", JSON.stringify(entries));
}
if (!localStorage.getItem("controle-familiar.migration-defaults-v2")) {
  const missingSeeds = seedEntries.filter((seed) => !entries.some((entry) => entry.id === seed.id));
  entries = [...entries, ...missingSeeds];
  localStorage.setItem("controle-familiar.migration-defaults-v2", "done");
  localStorage.setItem("controle-familiar.entries", JSON.stringify(entries));
}
if (!localStorage.getItem("controle-familiar.migration-defaults-v3")) {
  const missingSeeds = seedEntries.filter((seed) => !entries.some((entry) => entry.id === seed.id));
  entries = [...entries, ...missingSeeds];
  localStorage.setItem("controle-familiar.migration-defaults-v3", "done");
  localStorage.setItem("controle-familiar.entries", JSON.stringify(entries));
}
let calendarDate = new Date(2026, 5, 1);
let selectedCalendarDay = new Date(2026, 5, 1);
let editingEntryId = null;
const categoriesByType = {
  income: ["Salario", "Pensao", "Freelancer", "Renda extra", "Receitas", "Outros"],
  expense: [
    "Moradia",
    "Transporte",
    "Alimentacao",
    "Saude",
    "Lazer",
    "Educacao",
    "Familia",
    "Jade",
    "Outros",
  ],
  investment: ["Fundos", "Ouro", "Ativos", "Reserva", "Investimentos", "Outros"],
};

const splash = document.querySelector("#splash");
const loginView = document.querySelector("#loginView");
const dashboardView = document.querySelector("#dashboardView");
const loginForm = document.querySelector("#loginForm");
const createAccountButton = document.querySelector("#createAccountButton");
const authMessage = document.querySelector("#authMessage");
const entryModal = document.querySelector("#entryModal");
const entryForm = document.querySelector("#entryForm");
const newEntryButton = document.querySelector("#newEntryButton");
const closeModal = document.querySelector("#closeModal");
const pageTitle = document.querySelector("#pageTitle");
const prevMonth = document.querySelector("#prevMonth");
const nextMonth = document.querySelector("#nextMonth");
const dashboardPrevMonth = document.querySelector("#dashboardPrevMonth");
const dashboardNextMonth = document.querySelector("#dashboardNextMonth");
const searchInputs = ["searchText", "searchOwner", "searchType", "searchStatus"];
const dashboardScope = document.querySelector("#dashboardScope");
const activeProfile = document.querySelector("#activeProfile");
const settingsButton = document.querySelector("#settingsButton");
const settingsProfile = document.querySelector("#settingsProfile");
const settingsThemeButton = document.querySelector("#settingsThemeButton");
const insightTooltip = document.querySelector("#insightTooltip");
const sidebarAdvisorButton = document.querySelector("#sidebarAdvisorButton");
const topSearch = document.querySelector("#topSearch");
const isInstallment = document.querySelector("#isInstallment");
const isMonthly = document.querySelector("#isMonthly");
const advisorTone = document.querySelector("#advisorTone");
const advisorFocus = document.querySelector("#advisorFocus");
const migrateCloudButton = document.querySelector("#migrateCloudButton");
const cloudMessage = document.querySelector("#cloudMessage");

setTimeout(() => splash.classList.add("done"), 2600);

document.body.classList.toggle("dark", localStorage.getItem("controle-familiar.theme") === "dark");
activeProfile.value = localStorage.getItem("controle-familiar.profile") || "Kauan";
settingsProfile.value = activeProfile.value;
advisorTone.value = localStorage.getItem("controle-familiar.advisorTone") || "balanced";
advisorFocus.value = localStorage.getItem("controle-familiar.advisorFocus") || "balance";
updateProfileGreeting();
setEntryKind("income");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  await signIn();
});

createAccountButton.addEventListener("click", async () => {
  await createAccount();
});

migrateCloudButton.addEventListener("click", async () => {
  await migrateLocalEntriesToCloud();
});

settingsThemeButton.addEventListener("click", toggleTheme);

function toggleTheme() {
  document.body.classList.toggle("dark");
  localStorage.setItem("controle-familiar.theme", document.body.classList.contains("dark") ? "dark" : "light");
}

document.querySelectorAll("[data-kind]").forEach((button) => {
  button.addEventListener("click", () => setEntryKind(button.dataset.kind));
});

isInstallment.addEventListener("input", updateInstallmentFields);
isMonthly.addEventListener("input", () => {
  if (isMonthly.checked) {
    isInstallment.checked = false;
    updateInstallmentFields();
  }
});

newEntryButton.addEventListener("click", () => entryModal.showModal());
closeModal.addEventListener("click", () => entryModal.close());

prevMonth.addEventListener("click", () => {
  calendarDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1);
  selectedCalendarDay = new Date(calendarDate);
  renderCalendar();
});

nextMonth.addEventListener("click", () => {
  calendarDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1);
  selectedCalendarDay = new Date(calendarDate);
  renderCalendar();
});

dashboardPrevMonth.addEventListener("click", () => {
  calendarDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1);
  selectedCalendarDay = new Date(calendarDate);
  render();
});

dashboardNextMonth.addEventListener("click", () => {
  calendarDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1);
  selectedCalendarDay = new Date(calendarDate);
  render();
});

searchInputs.forEach((id) => {
  document.querySelector(`#${id}`).addEventListener("input", renderSearchPanel);
});

dashboardScope.addEventListener("input", render);
activeProfile.addEventListener("input", () => {
  setActiveProfile(activeProfile.value);
});

settingsProfile.addEventListener("input", () => {
  setActiveProfile(settingsProfile.value);
});

advisorTone.addEventListener("input", () => {
  localStorage.setItem("controle-familiar.advisorTone", advisorTone.value);
  render();
});

advisorFocus.addEventListener("input", () => {
  localStorage.setItem("controle-familiar.advisorFocus", advisorFocus.value);
  render();
});

settingsButton.addEventListener("click", () => {
  openPanel("configuracoes", "Configuracoes");
});

sidebarAdvisorButton.addEventListener("click", () => {
  openPanel("dashboard", "Dashboard");
  render();
  setTimeout(() => {
    document.querySelector(".ai-brief")?.scrollIntoView({ behavior: "smooth", block: "center" });
    document.querySelector(".ai-brief")?.classList.add("pulse-focus");
    setTimeout(() => document.querySelector(".ai-brief")?.classList.remove("pulse-focus"), 1200);
  }, 50);
});

topSearch.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  openPanel("movimentacoes", "Movimentacoes");
  document.querySelector("[data-movement-tab='pesquisa']").click();
  document.querySelector("#searchText").value = topSearch.value;
  renderSearchPanel();
});

document.querySelectorAll("[data-finance-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-finance-tab]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    document.querySelectorAll("[data-finance-panel]").forEach((panel) => {
      panel.classList.toggle("hidden", panel.dataset.financePanel !== button.dataset.financeTab);
    });
  });
});

document.querySelectorAll("[data-movement-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-movement-tab]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    document.querySelectorAll("[data-movement-panel]").forEach((panel) => {
      panel.classList.toggle("hidden", panel.dataset.movementPanel !== button.dataset.movementTab);
    });
  });
});

entryForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const entry = {
    id: editingEntryId || crypto.randomUUID(),
    owner: valueOf("owner"),
    type: valueOf("type"),
    description: valueOf("description"),
    category: valueOf("category"),
    amount: Number(valueOf("amount")),
    date: valueOf("date"),
    status: valueOf("status"),
    recurrence: isInstallment.checked ? "Parcelado" : isMonthly.checked ? "Mensal" : "Unico",
    installmentsLeft: isInstallment.checked ? Number(valueOf("installmentTotal")) - Number(valueOf("installmentNumber")) + 1 : 0,
    installmentTotal: isInstallment.checked ? Number(valueOf("installmentTotal")) : 0,
    installmentNumber: isInstallment.checked ? Number(valueOf("installmentNumber")) : 0,
    paidBy: valueOf("paidBy"),
  };

  if (editingEntryId) {
    entries = entries.map((item) => (item.id === editingEntryId ? entry : item));
  } else if (entry.type === "expense" && isInstallment.checked) {
    entries = [...createInstallmentEntries(entry), ...entries];
  } else {
    entries = [entry, ...entries];
  }

  persistEntries();
  entryForm.reset();
  editingEntryId = null;
  document.querySelector(".entry-form h3").textContent = "Novo lancamento";
  setEntryKind("income");
  entryModal.close();
  render();
});

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    openPanel(tab.dataset.tab, tab.textContent);
    render();
  });
});

function openPanel(target, title) {
  document.querySelectorAll(".tab").forEach((item) => {
    item.classList.toggle("active", item.dataset.tab === target);
  });

  document.querySelectorAll("[data-panel]").forEach((panel) => {
    panel.classList.toggle("hidden", panel.dataset.panel !== target);
  });

  pageTitle.textContent = title;
}

function valueOf(id) {
  return document.querySelector(`#${id}`).value;
}

function totalsFor(list) {
  return list.reduce(
    (total, entry) => {
      total.income += entry.type === "income" ? entry.amount : 0;
      total.expense += entry.type === "expense" ? entry.amount : 0;
      total.investment += entry.type === "investment" ? entry.amount : 0;
      return total;
    },
    { income: 0, expense: 0, investment: 0 },
  );
}

function cashBalanceFor(list) {
  const paid = list.filter((entry) => entry.status === "Pago");
  const totals = totalsFor(paid);
  return totals.income - totals.expense - totals.investment;
}

function projectedBalanceFor(list) {
  const totals = totalsFor(list);
  return totals.income - totals.expense - totals.investment;
}

function remainingToPayFor(list) {
  return list
    .filter((entry) => entry.status !== "Pago" && entry.type !== "income")
    .reduce((sum, entry) => sum + entry.amount, 0);
}

function effectiveStatus(entry) {
  if (entry.status === "Pago") return "Pago";
  const today = toDateKey(new Date());
  return entry.date < today ? "Atrasado" : entry.status;
}

function render() {
  const visibleEntries = scopedEntries(entriesForMonth(calendarDate));
  const totals = totalsFor(visibleEntries);
  const previousEntries = scopedEntries(
    entriesForMonth(new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1)),
  );
  const previousTotals = totalsFor(previousEntries);

  document.querySelector("#dashboardMonthLabel").textContent = calendarDate.toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });

  document.querySelector("#metricIncome").textContent = currency.format(totals.income);
  document.querySelector("#metricExpense").textContent = currency.format(totals.expense);
  document.querySelector("#metricRemaining").textContent = currency.format(remainingToPayFor(visibleEntries));
  const currentBalance = cashBalanceFor(visibleEntries);
  const projectedBalance = projectedBalanceFor(visibleEntries);
  const previousCurrentBalance = cashBalanceFor(previousEntries);
  document.querySelector("#metricBalance").textContent = currency.format(currentBalance);
  document.querySelector("#heroBalance").textContent = currency.format(currentBalance);
  document.querySelector("#heroHint").textContent =
    currentBalance >= 0 ? "Dinheiro atual positivo" : "Saldo atual negativo";
  document.querySelector("#deltaIncome").textContent = comparisonText(totals.income, previousTotals.income);
  document.querySelector("#deltaExpense").textContent = comparisonText(totals.expense, previousTotals.expense);
  document.querySelector("#deltaInvestments").textContent = comparisonText(
    totals.investment,
    previousTotals.investment,
  );
  document.querySelector("#deltaBalance").textContent = comparisonText(
    currentBalance,
    previousCurrentBalance,
  );

  safeRender(renderOwnerBars);
  safeRender(renderCategoryBars);
  safeRender(renderHealthScore);
  safeRender(renderAnnualChart);
  safeRender(renderDashboardAdvisorBrief);
  safeRender(renderDueList);
  safeRender(renderProjection);
  safeRender(renderTodayPanel);
  safeRender(renderWeekPanel);
  safeRender(renderRemainingByOwner);
  safeRender(renderTopExpenses);
  safeRender(renderAlerts);
  safeRender(() => renderOwnerPanel("kauan", "Kauan"));
  safeRender(() => renderOwnerPanel("raissa", "Raissa"));
  safeRender(() => renderOwnerPanel("casal", "Casal"));
  safeRender(renderCalendar);
  safeRender(renderSearchPanel);
  safeRender(renderPlanningPanel);
  safeRender(renderEntriesPanel);
  safeRender(attachInsightTooltips);
}

function safeRender(callback) {
  try {
    callback();
  } catch (error) {
    console.warn("Falha ao renderizar bloco:", error);
  }
}

function renderOwnerBars() {
  const container = document.querySelector("#ownerBars");
  if (!container) return;
  const visibleEntries = scopedEntries(entriesForMonth(calendarDate));
  const owners = ["Kauan", "Raissa", "Casal"].map((owner) => {
    const amount = visibleEntries
      .filter((entry) => entry.owner === owner && entry.type === "expense")
      .reduce((sum, entry) => sum + entry.amount, 0);
    return { owner, amount };
  });

  const max = Math.max(...owners.map((item) => item.amount), 1);
  container.innerHTML = owners
    .map(
      (item) => `
        <div class="bar-row">
          <div class="bar-row__meta">
            <strong>${item.owner}</strong>
            <span>${currency.format(item.amount)}</span>
          </div>
          <div class="bar-track">
            <div class="bar-fill" data-insight-title="${item.owner}" data-insight-detail="Despesas do mes: ${currency.format(item.amount)}" style="width:${(item.amount / max) * 100}%"></div>
          </div>
        </div>
      `,
    )
    .join("");
}

function renderDueList() {
  const container = document.querySelector("#dueList");
  if (!container) return;
  const due = scopedEntries(entriesForMonth(calendarDate))
    .filter((entry) => entry.type !== "income" && entry.status !== "Pago")
    .sort((a, b) => displayDateOf(a).localeCompare(displayDateOf(b)))
    .slice(0, 6);

  container.innerHTML =
    due
      .map(
        (entry) => `
          <div class="due-item">
            <div>
              <strong>${entry.description}</strong>
              <div>${entry.owner} · ${entry.category}</div>
            </div>
            <div>
              <strong>${currency.format(entry.amount)}</strong>
              <div>${formatDate(displayDateOf(entry))}</div>
            </div>
          </div>
        `,
      )
      .join("") || `<p class="login-note">Sem vencimentos pendentes.</p>`;
}

function renderCategoryBars() {
  const container = document.querySelector("#categoryBars");
  if (!container) return;
  const visibleEntries = scopedEntries(entriesForMonth(calendarDate)).filter((entry) => entry.type === "expense");
  const groups = groupBySum(visibleEntries, "category");
  const max = Math.max(...groups.map((item) => item.amount), 1);

  container.innerHTML =
    groups
      .slice(0, 8)
      .map(
        (item) => `
          <div class="bar-row">
            <div class="bar-row__meta">
              <strong>${item.label}</strong>
              <span>${currency.format(item.amount)}</span>
            </div>
            <div class="bar-track">
              <div class="bar-fill" data-insight-title="${item.label}" data-insight-detail="Total gasto na categoria: ${currency.format(item.amount)}" style="width:${(item.amount / max) * 100}%"></div>
            </div>
          </div>
        `,
      )
      .join("") || `<p class="login-note">Sem despesas no mes.</p>`;
}

function renderDashboardAdvisorBrief() {
  if (!document.querySelector("#dashboardAdvice")) return;
  const monthEntries = scopedEntries(entriesForMonth(calendarDate));
  const totals = totalsFor(monthEntries);
  const balance = projectedBalanceFor(monthEntries);
  const currentBalance = cashBalanceFor(monthEntries);
  const pending = monthEntries.filter((entry) => entry.status !== "Pago" && entry.type !== "income");
  const topCategory = groupBySum(
    monthEntries.filter((entry) => entry.type === "expense"),
    "category",
  )[0];
  const health = balance >= 0 ? "Boa" : "Atencao";

  document.querySelector("#dashboardAdvice").textContent =
    balance >= 0
      ? "Saldo projetado positivo. O mes permite organizar reserva, investimentos ou antecipar pendencias."
      : `Saldo projetado negativo. Revise ${topCategory?.label || "as maiores categorias"} antes de fechar o mes.`;
  document.querySelector("#aiHealthMini").textContent = health;
  document.querySelector("#aiPendingMini").textContent = pending.length;
  document.querySelector("#aiTopMini").textContent = topCategory ? topCategory.label : "-";
}

function renderProjection() {
  const container = document.querySelector("#projectionPanel");
  if (!container) return;
  const visibleEntries = scopedEntries(entriesForMonth(calendarDate));
  const paid = visibleEntries.filter((entry) => entry.status === "Pago");
  const pending = visibleEntries.filter((entry) => entry.status !== "Pago");
  const paidTotals = totalsFor(paid);
  const pendingTotals = totalsFor(pending);
  const currentBalance = cashBalanceFor(visibleEntries);
  const projectedBalance = projectedBalanceFor(visibleEntries);

  container.innerHTML = `
    <div class="projection-card">
      <span>Saldo atual</span>
      <strong class="${currentBalance >= 0 ? "positive" : "negative"}">${currency.format(currentBalance)}</strong>
    </div>
    <div class="projection-card">
      <span>Saldo projetado</span>
      <strong class="${projectedBalance >= 0 ? "positive" : "negative"}">${currency.format(projectedBalance)}</strong>
    </div>
    <div class="projection-card">
      <span>Receitas previstas</span>
      <strong>${currency.format(pendingTotals.income)}</strong>
    </div>
    <div class="projection-card">
      <span>Saidas pendentes</span>
      <strong>${currency.format(pendingTotals.expense + pendingTotals.investment)}</strong>
    </div>
  `;
}

function renderTodayPanel() {
  const container = document.querySelector("#todayPanel");
  if (!container) return;
  const today = toDateKey(new Date());
  const list = scopedEntries(entriesForMonth(calendarDate)).filter((entry) => entry.date === today);
  container.innerHTML =
    list.map(renderCompactEntry).join("") || `<p class="login-note">Nenhum lancamento para hoje.</p>`;
}

function renderWeekPanel() {
  const container = document.querySelector("#weekPanel");
  if (!container) return;
  const today = new Date();
  const todayKey = toDateKey(today);
  const nextWeekKey = toDateKey(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7));
  const list = scopedEntries(entriesForMonth(calendarDate))
    .filter((entry) => entry.date >= todayKey && entry.date <= nextWeekKey && entry.status !== "Pago")
    .sort((a, b) => a.date.localeCompare(b.date));
  container.innerHTML =
    list.map(renderCompactEntry).join("") || `<p class="login-note">Nada pendente nos proximos 7 dias.</p>`;
}

function renderRemainingByOwner() {
  const container = document.querySelector("#remainingByOwner");
  if (!container) return;
  const groups = ["Kauan", "Raissa", "Casal"].map((owner) => {
    const amount = remainingToPayFor(entriesForMonth(calendarDate).filter((entry) => entry.owner === owner));
    return { label: owner, amount };
  });
  const max = Math.max(...groups.map((item) => item.amount), 1);

  container.innerHTML = groups
    .map(
      (item) => `
        <div class="bar-row">
          <div class="bar-row__meta">
            <strong>${item.label}</strong>
            <span>${currency.format(item.amount)}</span>
          </div>
          <div class="bar-track">
            <div class="bar-fill" data-insight-title="${item.label}" data-insight-detail="Ainda falta pagar ${currency.format(item.amount)}" style="width:${(item.amount / max) * 100}%"></div>
          </div>
        </div>
      `,
    )
    .join("");
}

function renderTopExpenses() {
  const container = document.querySelector("#topExpenses");
  if (!container) return;
  const top = scopedEntries(entriesForMonth(calendarDate))
    .filter((entry) => entry.type === "expense")
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 6);

  container.innerHTML =
    top.map(renderCompactEntry).join("") || `<p class="login-note">Sem despesas no mes.</p>`;
}

function renderAlerts() {
  const container = document.querySelector("#alertsPanel");
  if (!container) return;
  const today = new Date();
  const monthEntries = scopedEntries(entriesForMonth(calendarDate));
  const alerts = monthEntries
    .filter((entry) => entry.type !== "income" && entry.status !== "Pago")
    .map((entry) => {
      const due = new Date(`${displayDateOf(entry)}T12:00:00`);
      const days = Math.ceil((due - today) / 86400000);
      return { ...entry, days };
    })
    .filter((entry) => entry.days <= 7)
    .sort((a, b) => a.days - b.days);

  container.innerHTML =
    alerts
      .map(
        (entry) => `
          <div class="due-item alert-item">
            <div>
              <strong>${entry.description}</strong>
              <div>${entry.days < 0 ? `${Math.abs(entry.days)} dia(s) atrasado` : `vence em ${entry.days} dia(s)`}</div>
            </div>
            <strong>${currency.format(entry.amount)}</strong>
          </div>
        `,
      )
      .join("") || `<p class="login-note">Sem alertas para os proximos 7 dias.</p>`;
}

function renderOwnerPanel(panelName, owner) {
  const panel = document.querySelector(`[data-finance-panel="${panelName}"]`);
  if (!panel) return;
  const list = entriesForMonth(calendarDate).filter((entry) => entry.owner === owner);
  const totals = totalsFor(list);

  panel.innerHTML = `
    <article class="person-section">
      <p class="eyebrow">${owner}</p>
      <h3>Resumo individual</h3>
      <div class="metrics">
        <article class="metric"><span>Receitas</span><strong>${currency.format(totals.income)}</strong></article>
        <article class="metric"><span>Despesas</span><strong>${currency.format(totals.expense)}</strong></article>
        <article class="metric"><span>Investimentos</span><strong>${currency.format(totals.investment)}</strong></article>
        <article class="metric"><span>Saldo atual</span><strong>${currency.format(cashBalanceFor(list))}</strong></article>
      </div>
      <div class="bars">${list.map(renderEntryRow).join("") || `<p class="login-note">Nenhum lancamento ainda.</p>`}</div>
    </article>
  `;
}

function renderEntriesPanel() {
  const panel = document.querySelector('[data-movement-panel="lancamentos"]');
  if (!panel) return;
  const visibleEntries = entriesForMonth(calendarDate);
  panel.innerHTML = `
    <article class="person-section">
      <p class="eyebrow">Historico</p>
      <h3>Lancamentos do mes</h3>
      <div class="bars">${visibleEntries.map(renderEntryRow).join("")}</div>
    </article>
  `;
}

function renderHealthScore() {
  const container = document.querySelector("#healthScore");
  if (!container) return;
  const monthEntries = scopedEntries(entriesForMonth(calendarDate));
  const totals = totalsFor(monthEntries);
  const paidRatio = monthEntries.length
    ? monthEntries.filter((entry) => entry.status === "Pago").length / monthEntries.length
    : 1;
  const balance = totals.income - totals.expense - totals.investment;
  const expensePressure = totals.income ? totals.expense / totals.income : 1;
  let score = 72;

  if (balance >= 0) score += 12;
  if (currentBalance >= 0) score += 6;
  if (expensePressure <= 0.7) score += 10;
  if (paidRatio >= 0.75) score += 8;
  if (balance < 0) score -= 22;
  if (currentBalance < 0) score -= 10;
  if (expensePressure > 1) score -= 18;

  score = Math.max(0, Math.min(100, Math.round(score)));
  const label = score >= 80 ? "Bom" : score >= 55 ? "Atencao" : "Critico";

  container.innerHTML = `
    <div class="health-ring" data-insight-title="Saude financeira" data-insight-detail="Nota calculada por saldo, contas pagas e pressao das despesas." style="--score:${score}%">
      <div>
        <strong>${score}</strong>
        <span>${label}</span>
      </div>
    </div>
  `;
}

function renderAnnualChart() {
  const container = document.querySelector("#annualChart");
  if (!container) return;
  const year = calendarDate.getFullYear();
  const months = Array.from({ length: 12 }, (_, month) => {
    const totals = totalsFor(scopedEntries(entriesForMonth(new Date(year, month, 1))));
    return {
      month,
      income: totals.income,
      expense: totals.expense,
      balance: totals.income - totals.expense - totals.investment,
    };
  });
  const max = Math.max(...months.flatMap((item) => [item.income, item.expense, Math.abs(item.balance)]), 1);
  const labels = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

  container.innerHTML = months
    .map(
      (item) => `
        <div class="annual-month" title="${labels[item.month]}">
          <div class="annual-bars">
            <div class="annual-bar income" data-insight-title="${labels[item.month]} - receitas" data-insight-detail="${currency.format(item.income)}" style="height:${Math.max(3, (item.income / max) * 170)}px"></div>
            <div class="annual-bar expense" data-insight-title="${labels[item.month]} - despesas" data-insight-detail="${currency.format(item.expense)}" style="height:${Math.max(3, (item.expense / max) * 170)}px"></div>
            <div class="annual-bar balance" data-insight-title="${labels[item.month]} - saldo" data-insight-detail="${currency.format(item.balance)}" style="height:${Math.max(3, (Math.abs(item.balance) / max) * 170)}px"></div>
          </div>
          <small>${labels[item.month]}</small>
        </div>
      `,
    )
    .join("");
}

function renderSearchPanel() {
  if (!document.querySelector("#searchResults")) return;
  const text = valueOf("searchText").toLowerCase().trim();
  const owner = valueOf("searchOwner");
  const type = valueOf("searchType");
  const status = valueOf("searchStatus");
  const results = entriesForMonth(calendarDate).filter((entry) => {
    const matchText =
      !text ||
      entry.description.toLowerCase().includes(text) ||
      entry.category.toLowerCase().includes(text);
    const matchOwner = owner === "all" || entry.owner === owner;
    const matchType = type === "all" || entry.type === type;
    const matchStatus = status === "all" || entry.status === status;
    return matchText && matchOwner && matchType && matchStatus;
  });
  const totals = totalsFor(results);

  document.querySelector("#searchSummary").innerHTML = `
    <div class="summary-chip"><span>Resultados</span><strong>${results.length}</strong></div>
    <div class="summary-chip"><span>Receitas</span><strong>${currency.format(totals.income)}</strong></div>
    <div class="summary-chip"><span>Despesas</span><strong>${currency.format(totals.expense)}</strong></div>
    <div class="summary-chip"><span>Investimentos</span><strong>${currency.format(totals.investment)}</strong></div>
  `;
  document.querySelector("#searchResults").innerHTML =
    results.map(renderEntryRow).join("") || `<p class="login-note">Nenhum lancamento encontrado.</p>`;
}

function renderPlanningPanel() {
  const panel = document.querySelector('[data-panel="planejamento"]');
  if (!panel) return;
  const futureEvents = entriesForMonth(calendarDate)
    .filter((entry) => entry.status !== "Pago")
    .sort((a, b) => displayDateOf(a).localeCompare(displayDateOf(b)))
    .slice(0, 10);

  panel.innerHTML = `
    <article class="person-section">
      <div class="section-head">
        <div>
          <p class="eyebrow">Futuro</p>
          <h3>Linha do tempo financeira</h3>
        </div>
      </div>
      <div class="timeline">
        ${
          futureEvents
            .map(
              (entry) => `
                <div class="timeline-item">
                  <strong>${formatDate(displayDateOf(entry))}</strong>
                  <div>
                    <strong>${entry.description}</strong>
                    <div>${entry.owner} · ${entry.category} · ${entry.status}</div>
                  </div>
                  <strong>${currency.format(entry.amount)}</strong>
                </div>
              `,
            )
            .join("") || `<p class="login-note">Sem eventos futuros para este mes.</p>`
        }
      </div>
    </article>
    <div class="grid">
      <article class="chart-panel">
        <h3>Ideias de planejamento</h3>
        <div class="due-list">
          <div class="due-item"><strong>Enxoval</strong><span class="pill">planejar</span></div>
          <div class="due-item"><strong>IPVA</strong><span class="pill">anual</span></div>
          <div class="due-item"><strong>Aniversario da Jade</strong><span class="pill">familia</span></div>
          <div class="due-item"><strong>Reserva de emergencia</strong><span class="pill">meta</span></div>
        </div>
      </article>
      <article class="chart-panel">
        <h3>Metas futuras</h3>
        <div class="projection">
          <div class="projection-card"><span>Reserva</span><strong>0%</strong></div>
          <div class="projection-card"><span>Viagem</span><strong>0%</strong></div>
          <div class="projection-card"><span>Novo carro</span><strong>0%</strong></div>
          <div class="projection-card"><span>Bebe</span><strong>0%</strong></div>
        </div>
      </article>
    </div>
  `;
}

function renderCalendar() {
  const grid = document.querySelector("#calendarGrid");
  const label = document.querySelector("#calendarLabel");
  if (!grid || !label) return;
  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startOffset = firstDay.getDay();
  const weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

  label.textContent = calendarDate.toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });

  const cells = weekdays.map((day) => `<div class="weekday">${day}</div>`);

  for (let index = 0; index < startOffset; index += 1) {
    cells.push(`<div class="calendar-day is-empty"></div>`);
  }

  for (let day = 1; day <= lastDay.getDate(); day += 1) {
    const date = toDateKey(new Date(year, month, day));
    const dayEntries = entriesForMonth(calendarDate).filter((entry) => displayDateOf(entry) === date);
    const expense = dayEntries
      .filter((entry) => entry.type === "expense")
      .reduce((sum, entry) => sum + entry.amount, 0);
    const income = dayEntries
      .filter((entry) => entry.type === "income")
      .reduce((sum, entry) => sum + entry.amount, 0);
    const isSelected = toDateKey(selectedCalendarDay) === date;

    cells.push(`
      <button class="calendar-day ${isSelected ? "selected" : ""}" type="button" data-date="${date}" data-insight-title="${formatDate(date)}" data-insight-detail="${dayEntries.length} lancamento(s), receitas ${currency.format(income)}, despesas ${currency.format(expense)}">
        <span class="calendar-day__number">${day}</span>
        ${income ? `<span class="calendar-day__income ${calendarStatusClass(dayEntries, "income")}">${currency.format(income)}</span>` : ""}
        ${expense ? `<span class="calendar-day__amount ${calendarStatusClass(dayEntries, "expense")}">${currency.format(expense)}</span>` : ""}
        ${dayEntries.length ? `<span class="calendar-day__count">${dayEntries.length} lanc.</span>` : ""}
      </button>
    `);
  }

  grid.innerHTML = cells.join("");
  grid.querySelectorAll("[data-date]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedCalendarDay = new Date(`${button.dataset.date}T12:00:00`);
      renderCalendar();
    });
  });

  renderDayDetails();
}

function renderDayDetails() {
  const container = document.querySelector("#dayDetails");
  const date = toDateKey(selectedCalendarDay);
  const dayEntries = entriesForMonth(calendarDate).filter((entry) => displayDateOf(entry) === date);
  const dayExpense = dayEntries
    .filter((entry) => entry.type === "expense")
    .reduce((sum, entry) => sum + entry.amount, 0);
  const dayIncome = dayEntries
    .filter((entry) => entry.type === "income")
    .reduce((sum, entry) => sum + entry.amount, 0);

  container.innerHTML = `
    <div class="due-item">
      <div>
        <strong>${selectedCalendarDay.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}</strong>
        <div>${dayEntries.length} lancamento(s) no dia</div>
      </div>
      <strong>${currency.format(dayIncome - dayExpense)}</strong>
    </div>
    ${
      dayEntries.map(renderEntryRow).join("") ||
      `<p class="login-note">Nenhum lancamento ou vencimento neste dia.</p>`
    }
  `;
}

function calendarStatusClass(dayEntries, type) {
  const filtered = dayEntries.filter((entry) => entry.type === type);
  if (!filtered.length) return "";
  const statuses = filtered.map(effectiveStatus);
  if (statuses.includes("Atrasado")) return "is-overdue";
  if (statuses.includes("Pendente")) return "is-pending";
  return "is-paid";
}

function renderEntryRow(entry) {
  const typeLabel = {
    income: "Receita",
    expense: "Despesa",
    investment: "Investimento",
  }[entry.type];

  return `
    <div class="entry-row">
      <div>
        <strong>${entry.description}</strong>
        <div>${entry.owner} · ${entry.category} · ${typeLabel}</div>
      </div>
      <div>
        <strong>${currency.format(entry.amount)}</strong>
        <div><span class="pill">${entry.status}</span> ${formatDate(displayDateOf(entry))}</div>
      </div>
      <div class="entry-actions">
        ${
          entry.status !== "Pago" && !entry.generated
            ? `<button class="mini-button" type="button" data-action="pay" data-id="${entry.id}">${entry.type === "income" ? "Recebido" : "Pago"}</button>`
            : ""
        }
        <button class="mini-button" type="button" data-action="edit" data-id="${entry.id}">Editar</button>
        <button class="mini-button danger" type="button" data-action="delete" data-id="${entry.id}">Excluir</button>
        ${entry.generated ? `<span class="pill">Recorrente</span>` : ""}
      </div>
    </div>
  `;
}

function renderCompactEntry(entry) {
  return `
    <div class="due-item">
      <div>
        <strong>${entry.description}</strong>
        <div>${entry.owner} · ${entry.category}</div>
      </div>
      <strong>${currency.format(entry.amount)}</strong>
    </div>
  `;
}

function formatDate(date) {
  if (!date) return "-";
  return new Date(`${date}T12:00:00`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
  });
}

function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function displayDateOf(entry) {
  return entry.date;
}

function entriesForMonth(monthDate) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();

  return entries
    .flatMap((entry) => expandEntryForMonth(entry, year, month))
    .sort((a, b) => displayDateOf(a).localeCompare(displayDateOf(b)));
}

function expandEntryForMonth(entry, year, month) {
  const baseDate = new Date(`${displayDateOf(entry)}T12:00:00`);
  if (Number.isNaN(baseDate.getTime())) return [];

  if (entry.schedule === "explicit") {
    const isSameMonth = baseDate.getFullYear() === year && baseDate.getMonth() === month;
    if (isSameMonth) return [entry];
    if (entry.recurrence === "Mensal" && entry.monthlyTemplate) {
      const baseMonthIndex = baseDate.getFullYear() * 12 + baseDate.getMonth();
      const targetMonthIndex = year * 12 + month;
      const monthOffset = targetMonthIndex - baseMonthIndex;
      return monthOffset > 0 ? [withOccurrenceDate(entry, year, month, monthOffset)] : [];
    }
    return [];
  }

  const baseMonthIndex = baseDate.getFullYear() * 12 + baseDate.getMonth();
  const targetMonthIndex = year * 12 + month;
  const monthOffset = targetMonthIndex - baseMonthIndex;

  if (entry.recurrence === "Mensal") {
    if (monthOffset < 0) return [];
    return [withOccurrenceDate(entry, year, month, monthOffset)];
  }

  if (entry.recurrence === "Parcelado") {
    const total = Number(entry.installmentsLeft) || 1;
    if (monthOffset < 0 || monthOffset >= total) return [];
    return [withOccurrenceDate(entry, year, month, monthOffset, `Parcela ${monthOffset + 1}/${total}`)];
  }

  return baseDate.getFullYear() === year && baseDate.getMonth() === month ? [entry] : [];
}

function withOccurrenceDate(entry, year, month, monthOffset, occurrenceLabel) {
  const baseDate = new Date(`${displayDateOf(entry)}T12:00:00`);
  const day = Math.min(baseDate.getDate(), new Date(year, month + 1, 0).getDate());
  const occurrenceDate = toDateKey(new Date(year, month, day));

  if (monthOffset === 0) {
    return { ...entry, date: occurrenceDate };
  }

  return {
    ...entry,
    id: `${entry.id}-occ-${monthOffset}`,
    date: occurrenceDate,
    status: "Pendente",
    description: occurrenceLabel ? `${entry.description} (${occurrenceLabel})` : entry.description,
    generated: true,
  };
}

function buildSpreadsheetSeedEntries() {
  const rows = [
    {
      owner: "Kauan",
      type: "income",
      description: "Salario IMBRA",
      category: "Receitas",
      recurrence: "Mensal",
      dueDay: 5,
      values: [0, 950, 2000, 2000, 2000, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      owner: "Kauan",
      type: "income",
      description: "Outros",
      category: "Receitas",
      recurrence: "Unico",
      dueDay: 5,
      values: [140, 0, 2000, 0, 500, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      owner: "Kauan",
      type: "expense",
      description: "Curso",
      category: "Educacao",
      recurrence: "Mensal",
      dueDay: 1,
      values: [-75, -150, -150, -150, -150, -150, -150, -150, 0, 0, 0, 0],
    },
    {
      owner: "Casal",
      type: "expense",
      description: "Custo da Jade",
      category: "Jade",
      recurrence: "Mensal",
      dueDay: 15,
      values: [0, -900, -900, -900, -900, -900, -700, -700, -700, -700, -700, -700],
    },
    {
      owner: "Casal",
      type: "expense",
      description: "Agua",
      category: "Moradia",
      recurrence: "Mensal",
      dueDay: 10,
      values: [0, 0, 0, -105, -105, -105, -105, -105, -105, -105, -105, -105],
    },
    {
      owner: "Casal",
      type: "expense",
      description: "Telefone celular",
      category: "Moradia",
      recurrence: "Mensal",
      dueDay: 10,
      values: [-80, -200, -310, -110, -110, 0, -90, -90, -90, -90, -90, -90],
    },
    {
      owner: "Casal",
      type: "expense",
      description: "Combustivel",
      category: "Transporte",
      recurrence: "Mensal",
      dueDay: 10,
      values: [0, -200, 0, 0, -300, -300, -300, -300, -300, -300, -300, -300],
    },
    {
      owner: "Kauan",
      type: "expense",
      description: "Futebol",
      category: "Lazer",
      recurrence: "Mensal",
      dueDay: 2,
      values: [-10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10],
    },
    {
      owner: "Casal",
      type: "expense",
      description: "Farmacia",
      category: "Saude",
      recurrence: "Mensal",
      dueDay: 15,
      values: [-306.79, 0, 0, 0, -420, -420, -420, -420, -420, -420, -420, -420],
    },
    {
      owner: "Casal",
      type: "expense",
      description: "Emprestimo",
      category: "Outros",
      recurrence: "Parcelado",
      dueDay: 1,
      values: [-250, -250, -250, -250, -250, -250, -250, 0, 0, 0, 0, 0],
    },
    {
      owner: "Casal",
      type: "expense",
      description: "Camisas venda 1",
      category: "Outros",
      recurrence: "Parcelado",
      dueDay: 14,
      values: [0, 0, 0, 0, 0, -38.1, -38.1, -38.1, 0, 0, 0, 0],
    },
    {
      owner: "Casal",
      type: "expense",
      description: "Camisas venda 2",
      category: "Outros",
      recurrence: "Parcelado",
      dueDay: 14,
      values: [0, 0, 0, 0, 0, -149.89, -149.89, -149.89, -149.89, -149.89, -149.89, -149.89],
    },
    {
      owner: "Raissa",
      type: "expense",
      description: "Kindle Raissa",
      category: "Outros",
      recurrence: "Parcelado",
      dueDay: 14,
      values: [0, 0, 0, 0, 0, -62.9, -62.9, -62.9, -62.9, -62.9, -62.9, -62.9],
    },
    {
      owner: "Casal",
      type: "expense",
      description: "Carro",
      category: "Transporte",
      recurrence: "Parcelado",
      dueDay: 10,
      values: [0, 0, 0, 0, 0, -400, -400, -400, -400, -400, -400, -400],
    },
  ];

  return rows.flatMap((row, rowIndex) => {
    const activeMonths = row.values
      .map((value, month) => ({ value, month }))
      .filter((item) => item.value !== 0);

    return activeMonths.map(({ value, month }, activeIndex) => {
      const remaining = row.recurrence === "Parcelado" ? activeMonths.length - activeIndex : 0;
      const date = dateForMonth(2026, month, row.dueDay);

      return {
        id: `planilha-2026-${rowIndex + 1}-${month + 1}`,
        owner: row.owner,
        type: row.type,
        description: row.recurrence === "Parcelado" ? `${row.description} (${activeIndex + 1}/${activeMonths.length})` : row.description,
        category: row.category,
        amount: Math.abs(value),
        date,
        status: month <= 4 ? "Pago" : "Pendente",
        recurrence: row.recurrence,
        installmentsLeft: remaining,
        paidBy: row.owner === "Raissa" ? "Raissa" : "Kauan",
        schedule: "explicit",
        monthlyTemplate: row.recurrence === "Mensal" && activeIndex === activeMonths.length - 1,
      };
    });
  });
}

function dateForMonth(year, month, day) {
  const safeDay = Math.min(day, new Date(year, month + 1, 0).getDate());
  return toDateKey(new Date(year, month, safeDay));
}

function groupBySum(list, key) {
  const map = new Map();
  list.forEach((entry) => {
    const label = entry[key] || "Outros";
    map.set(label, (map.get(label) || 0) + entry.amount);
  });

  return Array.from(map, ([label, amount]) => ({ label, amount })).sort((a, b) => b.amount - a.amount);
}

function scopedEntries(list) {
  const scope = dashboardScope?.value || "all";
  return scope === "all" ? list : list.filter((entry) => entry.owner === scope);
}

function advisorMessage({ currentBalance, projectedBalance, topCategory, pendingCount, tone, focus }) {
  const category = topCategory?.label || "as maiores saidas";
  const focusText = {
    balance: "fechar o mes positivo",
    debt: "reduzir parcelados",
    saving: "guardar dinheiro",
    family: "organizar os compromissos da familia",
  }[focus];

  if (currentBalance < 0) {
    return tone === "supportive"
      ? `O saldo atual esta negativo, mas da para organizar. Comece revisando ${category} e priorize ${focusText}.`
      : `Saldo atual negativo. Revise ${category}, marque receitas recebidas e foque em ${focusText}.`;
  }

  if (projectedBalance < 0) {
    return tone === "strict"
      ? `A projecao fecha negativa. Corte ou adie gastos em ${category} antes de assumir novas despesas.`
      : `Saldo atual positivo, mas a projecao fecha negativa. Revise ${category} para ${focusText}.`;
  }

  if (pendingCount > 0) {
    return `Mes sob controle. Ainda existem ${pendingCount} pendencia(s); atualizar pagamentos melhora a leitura para ${focusText}.`;
  }

  return `Mes saudavel. Bom momento para ${focusText} e planejar os proximos compromissos.`;
}

function updateProfileGreeting() {
  const profile = activeProfile.value;
  document.querySelector("#profileGreeting").textContent = `Ola, ${profile}`;
  document.querySelector("#profileAvatar").textContent = profile.slice(0, 1).toUpperCase();
}

function setActiveProfile(profile) {
  activeProfile.value = profile;
  settingsProfile.value = profile;
  localStorage.setItem("controle-familiar.profile", profile);
  updateProfileGreeting();
}

function attachInsightTooltips() {
  document.querySelectorAll("[data-insight-title]").forEach((element) => {
    element.onmouseenter = () => {
      insightTooltip.innerHTML = `<strong>${element.dataset.insightTitle}</strong><span>${element.dataset.insightDetail || ""}</span>`;
      insightTooltip.classList.remove("hidden");
    };
    element.onmousemove = (event) => {
      insightTooltip.style.left = `${Math.min(window.innerWidth - 320, event.clientX + 14)}px`;
      insightTooltip.style.top = `${event.clientY + 14}px`;
    };
    element.onmouseleave = () => {
      insightTooltip.classList.add("hidden");
    };
  });
}

function comparisonText(current, previous) {
  if (!previous) return "sem base no mes anterior";
  const diff = current - previous;
  const percent = Math.round((diff / previous) * 100);
  const signal = diff >= 0 ? "+" : "";
  return `${signal}${percent}% vs mes anterior`;
}

function persistEntries() {
  localStorage.setItem("controle-familiar.entries", JSON.stringify(entries));
  if (cloudReady) {
    entries.forEach((entry) => saveEntryToCloud(entry));
  }
}

async function signIn() {
  try {
    authMessage.textContent = "Entrando...";
    await signInWithEmailAndPassword(auth, valueOf("email"), valueOf("password"));
  } catch (error) {
    authMessage.textContent = authErrorMessage(error);
  }
}

async function createAccount() {
  try {
    authMessage.textContent = "Criando conta...";
    await createUserWithEmailAndPassword(auth, valueOf("email"), valueOf("password"));
  } catch (error) {
    authMessage.textContent = authErrorMessage(error);
  }
}

onAuthStateChanged(auth, async (user) => {
  currentUser = user;
  if (!user) return;

  authMessage.textContent = "Carregando dados...";
  loginView.classList.add("hidden");
  dashboardView.classList.remove("hidden");
  await loadEntriesFromCloud();
  cloudReady = true;
  render();
});

async function loadEntriesFromCloud() {
  const snapshot = await getDocs(entriesCollection());
  if (snapshot.empty) {
    cloudMessage.textContent = "Nenhum dado na nuvem ainda. Voce pode migrar os dados locais.";
    return;
  }

  entries = snapshot.docs.map((item) => item.data());
  localStorage.setItem("controle-familiar.entries", JSON.stringify(entries));
  cloudMessage.textContent = "Dados carregados da nuvem.";
}

async function migrateLocalEntriesToCloud() {
  if (!currentUser) {
    cloudMessage.textContent = "Entre na conta antes de migrar.";
    return;
  }

  cloudMessage.textContent = "Migrando dados...";
  await Promise.all(entries.map(saveEntryToCloud));
  cloudReady = true;
  cloudMessage.textContent = "Dados locais enviados para a nuvem.";
}

async function saveEntryToCloud(entry) {
  if (!currentUser || !entry.id) return;
  await setDoc(doc(entriesCollection(), entry.id), entry);
}

async function deleteEntryFromCloud(id) {
  if (!currentUser || !id) return;
  await deleteDoc(doc(entriesCollection(), id));
}

function entriesCollection() {
  return collection(db, "families", FAMILY_ID, "entries");
}

function authErrorMessage(error) {
  if (error.code === "auth/email-already-in-use") return "Este email ja tem conta. Use Entrar.";
  if (error.code === "auth/invalid-credential") return "Email ou senha incorretos.";
  if (error.code === "auth/weak-password") return "A senha precisa ter pelo menos 6 caracteres.";
  return "Nao foi possivel autenticar. Confira email e senha.";
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) return;

  const entry = findEntryById(button.dataset.id);
  if (!entry) return;

  if (button.dataset.action === "pay") {
    entry.status = "Pago";
    persistEntries();
    render();
  }

  if (button.dataset.action === "edit") {
    editingEntryId = entry.generated ? null : entry.id;
    fillEntryForm(entry);
    document.querySelector(".entry-form h3").textContent = "Editar lancamento";
    entryModal.showModal();
  }

  if (button.dataset.action === "delete") {
    const confirmed = confirm(`Excluir "${entry.description}"?`);
    if (!confirmed) return;
    entries = entries.filter((item) => item.id !== entry.id);
    deleteEntryFromCloud(entry.id);
    persistEntries();
    render();
  }
});

function findEntryById(id) {
  return entries.find((item) => item.id === id) || entriesForMonth(calendarDate).find((item) => item.id === id);
}

function fillEntryForm(entry) {
  setEntryKind(entry.type);
  setValue("owner", entry.owner);
  setValue("type", entry.type);
  setValue("description", entry.description);
  if (!Array.from(document.querySelector("#category").options).some((option) => option.value === entry.category)) {
    document.querySelector("#category").insertAdjacentHTML("afterbegin", `<option>${entry.category}</option>`);
  }
  setValue("category", entry.category);
  setValue("amount", entry.amount);
  setValue("date", entry.date);
  setValue("status", entry.status);
  isMonthly.checked = entry.recurrence === "Mensal";
  isInstallment.checked = entry.recurrence === "Parcelado";
  setValue("installmentTotal", entry.installmentTotal || entry.installmentsLeft || 1);
  setValue("installmentNumber", entry.installmentNumber || 1);
  updateInstallmentFields();
  setValue("paidBy", entry.paidBy);
}

function setEntryKind(kind) {
  setValue("type", kind);
  document.querySelectorAll("[data-kind]").forEach((button) => {
    button.classList.toggle("active", button.dataset.kind === kind);
  });

  const category = document.querySelector("#category");
  const current = category.value;
  const options = categoriesByType[kind].includes(current) ? categoriesByType[kind] : [current, ...categoriesByType[kind]];
  category.innerHTML = options.filter(Boolean).map((item) => `<option>${item}</option>`).join("");
  category.value = current || categoriesByType[kind][0];

  document.querySelector("#installmentChoice").classList.toggle("hidden", kind !== "expense");
  document.querySelector("#monthlyChoice span").textContent =
    kind === "income" ? "Recebe todo mes?" : kind === "investment" ? "Aporte mensal?" : "Repete todo mes?";

  if (kind !== "expense") {
    isInstallment.checked = false;
  }

  updateInstallmentFields();
}

function updateInstallmentFields() {
  document.querySelectorAll(".installment-field").forEach((field) => {
    field.classList.toggle("hidden", !isInstallment.checked);
  });

  if (isInstallment.checked) {
    isMonthly.checked = false;
  }
}

function createInstallmentEntries(entry) {
  const total = Math.max(1, Number(entry.installmentTotal) || 1);
  const start = Math.max(1, Number(entry.installmentNumber) || 1);
  const baseDate = new Date(`${entry.date}T12:00:00`);
  const result = [];

  for (let number = start; number <= total; number += 1) {
    const offset = number - start;
    const date = dateForMonth(baseDate.getFullYear(), baseDate.getMonth() + offset, baseDate.getDate());
    result.push({
      ...entry,
      id: crypto.randomUUID(),
      description: `${entry.description} (${number}/${total})`,
      date,
      status: offset === 0 ? entry.status : "Pendente",
      installmentNumber: number,
      installmentTotal: total,
      installmentsLeft: total - number + 1,
      schedule: "explicit",
    });
  }

  return result;
}

function setValue(id, value) {
  document.querySelector(`#${id}`).value = value ?? "";
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js");
}
