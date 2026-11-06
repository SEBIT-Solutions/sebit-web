// Example data for the interactive report widgets. Every widget that shows it
// carries the „Ukázková data“ badge; none of these figures describe a client.
// Totals, averages and plan percentages are internally consistent on purpose.

export type Report = {
  sub?: string;
  title: string;
  unit: string;
  labels: string[];
  values: number[];
  max: number;
  ticks: number[];
  plan?: number;
  planName?: string;
  planVs?: string;
  sel: number;
  kpis: [string, string, string][];
  answer: string;
  src: string[];
};

const WEEKS = ['T38', 'T39', 'T40', 'T41', 'T42', 'T43', 'T44', 'T45'];

export const heroReports: Record<'obchod' | 'provoz' | 'finance', Report> = {
  obchod: {
    title: 'Tržby po týdnech', unit: 'mil. Kč', labels: WEEKS, values: [3.6, 3.9, 4.2, 3.8, 4.4, 4.1, 3.5, 4.3],
    max: 5, ticks: [0, 2.5, 5], plan: 4, planName: 'plán 4,0', planVs: 'proti plánu', sel: 7,
    kpis: [['Tržby za 8 týdnů', '31,8', 'mil. Kč'], ['Plnění plánu', '99,4', '%'], ['Průměrná objednávka', '48', 'tis. Kč']],
    answer: 'Za 8 týdnů plníte plán na 99,4 %. Propad v T44 dorovnal T45.', src: ['ERP', 'CRM', 'E-shop'],
  },
  provoz: {
    title: 'Zakázky dodané včas', unit: '%', labels: WEEKS, values: [91, 93, 88, 95, 94, 90, 86, 92],
    max: 100, ticks: [0, 50, 100], plan: 95, planName: 'cíl 95 %', planVs: 'proti cíli', sel: 6,
    kpis: [['Včas dodáno', '91,1', '%'], ['Po termínu', '14', 'zakázek'], ['Vytížení výroby', '87', '%']],
    answer: 'Cíl 95 % jste za 8 týdnů splnili jen v T41. Nejhorší byl T44 — zpožděný materiál od jednoho dodavatele.', src: ['ERP', 'Výroba', 'Sklad'],
  },
  finance: {
    title: 'Inkaso po týdnech', unit: 'mil. Kč', labels: WEEKS, values: [3.1, 3.4, 3.9, 3.3, 4.0, 3.8, 3.0, 3.7],
    max: 5, ticks: [0, 2.5, 5], plan: 3.6, planName: 'plán 3,6', planVs: 'proti plánu', sel: 6,
    kpis: [['Inkaso za 8 týdnů', '28,2', 'mil. Kč'], ['Po splatnosti', '2,4', 'mil. Kč'], ['DSO', '41', 'dní']],
    answer: 'Inkaso zaostává za plánem ve 4 z 8 týdnů. 2,4 mil. Kč je po splatnosti.', src: ['Účetnictví', 'Banka', 'ERP'],
  },
};

export const questions: { group: 'op' | 'fi'; q: string; report: Report }[] = [
  { group: 'op', q: 'Které zakázky nestihneme a proč?', report: {
    sub: 'Operativa · zakázky', title: 'Aktivní zakázky podle stavu', unit: 'zakázek', labels: ['Včas', 'V riziku', 'Po termínu'], values: [42, 7, 3],
    max: 50, ticks: [0, 25, 50], sel: 2, kpis: [['Aktivní zakázky', '52', ''], ['V riziku', '7', ''], ['Po termínu', '3', '']],
    answer: '3 zakázky jsou po termínu a 7 v riziku. U 5 z nich chybí materiál od jednoho dodavatele.', src: ['ERP', 'Výroba'] } },
  { group: 'op', q: 'Kde nám ve skladu leží peníze?', report: {
    sub: 'Operativa · sklad', title: 'Hodnota zásob podle doby bez pohybu', unit: 'mil. Kč', labels: ['< 30 dní', '30–90', '90–180', '> 180'], values: [6.2, 4.1, 2.3, 1.8],
    max: 8, ticks: [0, 4, 8], sel: 3, kpis: [['Zásoby celkem', '14,4', 'mil. Kč'], ['Obrátka', '63', 'dní'], ['Bez pohybu 180+', '1,8', 'mil. Kč']],
    answer: '1,8 mil. Kč leží ve zboží, které se nehnulo přes půl roku. Dalších 2,3 mil. Kč je na cestě tam.', src: ['Sklad', 'ERP'] } },
  { group: 'op', q: 'Jak vytížená je výroba tento týden?', report: {
    sub: 'Operativa · výroba', title: 'Vytížení výroby tento týden', unit: '%', labels: ['Po', 'Út', 'St', 'Čt', 'Pá'], values: [82, 91, 97, 88, 74],
    max: 100, ticks: [0, 50, 100], plan: 90, planName: 'cíl 90 %', planVs: 'proti cíli', sel: 2,
    kpis: [['Průměr týdne', '86', '%'], ['Nejvytíženější', 'St 97', '%'], ['Volno v pátek', '26', '%']],
    answer: 'Středa je přetížená na 97 %, v pátek zbývá 26 % kapacity. Přesunout část zakázek se vyplatí.', src: ['Výroba', 'ERP'] } },
  { group: 'op', q: 'Kteří dodavatelé se zpožďují?', report: {
    sub: 'Operativa · nákup', title: 'Průměrné zpoždění dodávek', unit: 'dní', labels: ['Dod. A', 'Dod. B', 'Dod. C', 'Dod. D', 'Dod. E'], values: [1, 6, 2, 9, 0],
    max: 10, ticks: [0, 5, 10], sel: 3, kpis: [['Dodávky včas', '78', '%'], ['Průměrné zpoždění', '3,6', 'dne'], ['Blokované zakázky', '4', '']],
    answer: 'Dodavatel D zpožďuje v průměru 9 dní a blokuje 4 zakázky. Dodavatel E dodává vždy včas.', src: ['ERP', 'Sklad'] } },
  { group: 'fi', q: 'Jaké bude cash flow za čtyři týdny?', report: {
    sub: 'Finance · cash flow', title: 'Očekávaný zůstatek na účtech', unit: 'mil. Kč', labels: ['T46', 'T47', 'T48', 'T49'], values: [8.4, 6.9, 7.6, 5.2],
    max: 10, ticks: [0, 5, 10], plan: 6, planName: 'rezerva 6,0', planVs: 'proti rezervě', sel: 3,
    kpis: [['Zůstatek dnes', '9,1', 'mil. Kč'], ['Minimum (T49)', '5,2', 'mil. Kč'], ['Rezerva', '6,0', 'mil. Kč']],
    answer: 'V T49 klesne zůstatek pod rezervu 6 mil. Kč, protože se sejde splatnost DPH a mezd. Víte to čtyři týdny dopředu.', src: ['Účetnictví', 'Banka', 'ERP'] } },
  { group: 'fi', q: 'Kteří zákazníci nesou marži?', report: {
    sub: 'Finance · marže', title: 'Hrubá marže podle zákazníků', unit: '%', labels: ['Zák. A', 'Zák. B', 'Zák. C', 'Zák. D', 'Zák. E', 'Zák. F'], values: [24, 19, 17, 12, 8, 2],
    max: 30, ticks: [0, 15, 30], sel: 5, kpis: [['Průměr zákazníků', '13,7', '%'], ['Pod 10 %', '2', 'zákazníci'], ['Nejlepší', '24', '%']],
    answer: 'Zákazník F má marži 2 % — po započtení dopravy je ztrátový. Zákazník A nese nejvíc.', src: ['ERP', 'Účetnictví'] } },
  { group: 'fi', q: 'Jak plníme plán proti skutečnosti?', report: { ...heroReports.obchod, sub: 'Finance · plán' } },
  { group: 'fi', q: 'Kolik nás stojí pozdní platby?', report: {
    sub: 'Finance · pohledávky', title: 'Pohledávky po splatnosti podle stáří', unit: 'mil. Kč', labels: ['1–15 dní', '16–30', '31–60', '60+'], values: [1.2, 0.6, 0.4, 0.2],
    max: 1.5, ticks: [0, 0.75, 1.5], sel: 3,
    kpis: [['Po splatnosti', '2,4', 'mil. Kč'], ['Déle než měsíc', '0,6', 'mil. Kč'], ['Náklad peněz', '≈ 18', 'tis. Kč / měs.']],
    answer: 'Po splatnosti je 2,4 mil. Kč. Při úroku 9 % ročně vás to stojí zhruba 18 tis. Kč měsíčně.', src: ['Účetnictví', 'Banka'] } },
];
