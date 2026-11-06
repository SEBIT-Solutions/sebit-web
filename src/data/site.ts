// Single source of truth for the content that repeats across pages.
// Facts SEBIT still has to confirm are wrapped with ph(), which renders the
// yellow „ověřit“ chip (see components/Ph.astro and scripts/check-placeholders.mjs).

export const company = {
  name: 'SEBIT Solutions s.r.o.',
  email: 'info@sebit.cz',
  phone: '+420 721 405 384',
  phoneHref: '+420721405384',
  street: 'Zádušní 2926',
  city: '276 01 Mělník',
  ico: '22573780',
  dic: 'CZ22573780',
  linkedin: 'https://www.linkedin.com/company/sebit-solutions',
  url: 'https://www.sebit.cz',
  register: 'zapsaná v obchodním rejstříku vedeném Městským soudem v Praze, oddíl C, vložka 418694',
  founded: '2025-02-10',
};

// Response times promised on the site (owner, 2026-11-06).
export const sla = {
  standard: 'do 2 pracovních dnů',
  critical: 'do 4 hodin',
};

export type Capability = {
  slug: string;
  href: string;
  icon: string;
  name: string;
  short: string;
  tags: string[];
};

export const capabilities: Capability[] = [
  { slug: 'reporting-a-data', href: '/co-delame/reporting-a-data/', icon: 'i-chart-bar', name: 'Reporting a data',
    short: 'Informace pro rozhodování provozu a financí. Zpřístupněná data v Microsoft Fabric, přehledy v Power BI.',
    tags: ['Power BI', 'Microsoft Fabric', 'DAX', 'Lakehouse'] },
  { slug: 'ai', href: '/co-delame/ai/', icon: 'i-brain', name: 'AI nadstavby',
    short: 'Asistenti a automatizace nad vašimi daty, dokumenty a aplikacemi. S kontrolou, kam data tečou.',
    tags: ['RAG', 'LLM', 'MCP', 'Automatizace'] },
  { slug: 'integrace', href: '/co-delame/integrace/', icon: 'i-exchange-alt', name: 'Integrace',
    short: 'Vlastní platforma SEBIT Gateway: API gateway, datahub, monitoring a napojení na ERP. Plus API a základní registry.',
    tags: ['SEBIT Gateway', 'Datahub', 'ERP', 'API'] },
  { slug: 'weby-a-aplikace', href: '/co-delame/weby-a-aplikace/', icon: 'i-laptop-code', name: 'Weby a aplikace',
    short: 'Firemní weby, e-shopy, portály a interní aplikace. Rychlé, přístupné a napojené na vaše systémy.',
    tags: ['React', 'Next.js', 'Astro', 'E-shopy'] },
  { slug: 'modernizace-oracle-forms', href: '/co-delame/modernizace-oracle-forms/', icon: 'i-sync-alt', name: 'Modernizace legacy',
    short: 'Oracle Forms s novým frontendem a REST API, bez přepisu business logiky.',
    tags: ['Oracle Forms', 'PL/SQL', 'REST'] },
  { slug: 'it-outsourcing', href: '/it-outsourcing/', icon: 'i-users-cog', name: 'IT outsourcing',
    short: 'Kapacitní outsourcing: projektoví manažeři, analytici, vývojáři, testeři, data a security specialisté do vašeho týmu.',
    tags: ['Bodyshopping', 'Team leasing', 'Na klíč'] },
];

export type Detail = {
  reference?: string;
  slug: string;
  name: string;
  title: string;
  description: string;
  h1: string;
  lead: string;
  cta: string;
  need: string;
  deliver: { t: string; d: string; href?: string }[];
  stack: string[];
  projects: { t: string; d: string }[];
  offer: { t: string; d: string };
  own?: { t: string; d: string; features: { icon: string; t: string; d: string }[]; facts: [string, string][] };
};

export const details: Detail[] = [
  {
    slug: 'reporting-a-data', name: 'Reporting a data', need: 'data', cta: 'Domluvit datový audit',
    reference: 'Firma z oboru plynárenství: integrace zdrojových systémů přes SEBIT Gateway, datová platforma v Microsoft Fabric a reporting provozu a financí v Power BI.',
    title: 'Reporting a data: Power BI a Microsoft Fabric',
    description: 'Informace pro rozhodování provozu a financí z dat, která už máte. Datová platforma v Microsoft Fabric a přehledy v Power BI.',
    h1: 'Informace pro rozhodování. Z dat, která už máte.',
    lead: 'Zpřístupníme data z ERP, účetnictví, skladu a dalších systémů a uděláme z nich přehledy pro vedení, operativu a finance. Jedna pravda o číslech v Microsoft Fabric a Power BI, aktualizovaná bez ručního přepisování.',
    deliver: [
      { t: 'Datová architektura ve Fabric', d: 'OneLake, Lakehouse, Warehouse, vrstvy bronze, silver a gold' },
      { t: 'Datové pipeline', d: 'Data Factory, Dataflow Gen2, notebooky v PySpark' },
      { t: 'Sémantické modely', d: 'DAX, Direct Lake, výkon a správné vazby' },
      { t: 'Reporty a dashboardy', d: 'Pro vedení, obchod, finance i provoz' },
      { t: 'Governance', d: 'Workspace, role, RLS, deployment pipelines, Git' },
      { t: 'Migrace', d: 'Z Excelu, SSRS nebo starších BI nástrojů' },
    ],
    stack: ['Power BI', 'Microsoft Fabric', 'OneLake', 'DAX', 'Power Query (M)', 'PySpark', 'SQL', 'Azure'],
    projects: [
      { t: 'Reporting pro vedení', d: 'Finanční a obchodní ukazatele na jednom místě, s denní aktualizací.' },
      { t: 'Konsolidace dat', d: 'ERP, CRM a e-shop v jednom datovém modelu.' },
      { t: 'Konec Excelu', d: 'Sdílený model místo desítek ručně slučovaných souborů.' },
    ],
    offer: { t: 'Datový audit', d: 'Projdeme zdroje, reporty a licence a navrhneme cílovou architekturu ve Fabric.' },
  },
  {
    slug: 'ai', name: 'AI nadstavby', need: 'ai', cta: 'Domluvit AI workshop',
    title: 'AI nadstavby nad firemními daty a systémy',
    description: 'AI asistenti a automatizace nad vašimi dokumenty, daty a aplikacemi — s kontrolou bezpečnosti a GDPR.',
    h1: 'AI nad vašimi daty a systémy. S kontrolou, kam data tečou.',
    lead: 'Stavíme AI asistenty a automatizace, které pracují s vašimi dokumenty, daty a aplikacemi — v prostředí, které obstojí při kontrole bezpečnosti a GDPR.',
    deliver: [
      { t: 'Asistenti nad dokumenty', d: 'Odpovědi ze směrnic, smluv a dokumentace s odkazem na zdroj (RAG)' },
      { t: 'Dotazy na data v češtině', d: 'Otázky v přirozeném jazyce nad Power BI a Fabric' },
      { t: 'Automatizace procesů', d: 'Třídění e-mailů, vytěžení dokumentů, zpracování požadavků' },
      { t: 'AI v aplikacích', d: 'Napojení modelů do stávajících systémů přes API' },
      { t: 'Agenti s nástroji', d: 'Bezpečné napojení na interní systémy přes MCP' },
      { t: 'Měření a kontrola', d: 'Evaluace kvality, náklady, logování a lidské schválení' },
    ],
    stack: ['Claude', 'Azure OpenAI', 'MCP', 'RAG', 'Python', 'Vektorové databáze', 'Microsoft Fabric'],
    projects: [
      { t: 'Interní asistent', d: 'Odpovědi ze směrnic a dokumentace, vždy s citací zdroje.' },
      { t: 'Data v češtině', d: 'Vedení se ptá na čísla bez znalosti DAX.' },
      { t: 'Vytěžení dokumentů', d: 'Faktury, objednávky a smlouvy rovnou do systému.' },
    ],
    offer: { t: 'AI workshop', d: 'Vybereme 1–2 případy užití s měřitelným přínosem a ověříme je prototypem v SEBIT Labs.' },
  },
  {
    slug: 'integrace', name: 'Integrace', need: 'integrace', cta: 'Zmapovat integrace',
    reference: 'Dopravní společnost a firma z oboru plynárenství: napojení ERP a provozních systémů přes SEBIT Gateway a datahub jako zdroj pro reporting.',
    title: 'Integrace systémů a SEBIT Gateway',
    description: 'Integrace ERP, CRM, e-shopu a státních registrů na vlastní platformě SEBIT Gateway: API gateway, datahub, monitoring a napojení na ERP.',
    h1: 'Systémy, které spolu mluví. Spolehlivě a s monitoringem.',
    lead: 'Navrhneme, postavíme a provozujeme integrace mezi ERP, CRM, e-shopem, bankou a státními registry — na naší platformě SEBIT Gateway, nebo přímo přes API.',
    deliver: [
      { t: 'Integrační architektura', d: 'Návrh toků, API design, verzování' },
      { t: 'Integrační platforma SEBIT Gateway', d: 'API gateway, datahub, monitoring a napojení na ERP; případně WSO2 nebo platforma, kterou už máte' },
      { t: 'Základní registry', d: 'ROB, ROS, RPP, RÚIAN včetně ztotožnění', href: '/co-delame/integrace/zakladni-registry/' },
      { t: 'API nad legacy', d: 'REST vrstva nad Oracle Forms a starými systémy', href: '/co-delame/modernizace-oracle-forms/' },
      { t: 'Monitoring a alerting', d: 'Logování, sledování chyb, provozní dashboardy' },
      { t: 'Dokumentace rozhraní', d: 'OpenAPI, testovací prostředí, onboarding partnerů' },
    ],
    stack: ['SEBIT Gateway (SEGW)', 'WSO2', 'REST', 'OData', 'SOAP', 'OpenAPI', 'Java', 'Oracle'],
    projects: [
      { t: 'ERP a e-shop', d: 'Objednávky, sklad a ceny synchronizované bez ručního přepisu.' },
      { t: 'Napojení na registry', d: 'Ztotožnění klientů a automatické aktualizace údajů.' },
      { t: 'API nad legacy', d: 'Nové aplikace volají starý systém bezpečně přes API.' },
    ],
    offer: { t: 'Integrační mapa', d: 'Zmapujeme vaše systémy a toky dat a ukážeme, kde vznikají ruční práce a chyby.' },
    own: {
      t: 'SEBIT Gateway (SEGW)',
      d: 'Naše vlastní integrační platforma. API gateway, datahub, monitoring a napojení na ERP v jednom — integrace proto nestavíme pro každého klienta od nuly a data z nich rovnou slouží reportingu v Power BI a Fabric.',
      features: [
        { icon: 'i-sitemap', t: 'API gateway', d: 'Jednotný vstupní bod pro API mezi vašimi systémy a partnery.' },
        { icon: 'i-database', t: 'Datahub', d: 'Data z napojených systémů na jednom místě, připravená pro reporting.' },
        { icon: 'i-chart-bar', t: 'Monitoring', d: 'Přehled o každé integraci: co proběhlo, co selhalo a kde.' },
        { icon: 'i-cubes', t: 'Napojení na ERP', d: 'Propojení ERP s e-shopem, skladem, účetnictvím a dalšími systémy.' },
      ],
      facts: [
        ['Podporovaná ERP', 'Microsoft Dynamics 365 Business Central a další systémy přes API'],
        ['Nasazení', 'Podle vašich požadavků na bezpečnost a provoz'],
        ['Kde běží', 'Dopravní společnost, firma z oboru plynárenství'],
      ],
    },
  },
  {
    slug: 'weby-a-aplikace', name: 'Weby a aplikace', need: 'weby', cta: 'Objednat webový audit',
    reference: 'Velkoobchod se spojovacím materiálem: e-shop napojený na ERP a sklad, reporting prodeje a marže v Power BI.',
    title: 'Weby, e-shopy a webové aplikace',
    description: 'Firemní weby, e-shopy, B2B portály a interní aplikace. Rychlé, přístupné a napojené na vaše systémy.',
    h1: 'Weby a aplikace, které pracují pro vaše obchodní čísla.',
    lead: 'Navrhneme a postavíme firemní weby, e-shopy a webové aplikace — od UX a design systému přes vývoj po napojení na ERP a měření výsledků.',
    deliver: [
      { t: 'Firemní weby', d: 'Obsah, struktura a texty, které prodávají' },
      { t: 'E-shopy a B2B portály', d: 'Napojení na sklad, ceny a platby' },
      { t: 'Webové aplikace', d: 'Interní nástroje místo Excelu a e-mailů' },
      { t: 'Design systémy', d: 'Jednotné komponenty pro web i aplikace' },
      { t: 'Výkon a SEO', d: 'Core Web Vitals, strukturovaná data, AI viditelnost' },
      { t: 'Přístupnost', d: 'WCAG 2.2 AA jako akceptační kritérium' },
    ],
    stack: ['React', 'Next.js', 'Astro', 'TypeScript', 'Node.js', 'PostgreSQL', 'Vercel'],
    projects: [
      { t: 'E-shop napojený na sklad', d: 'Dostupnost a ceny v reálném čase.' },
      { t: 'Web s design systémem', d: 'Třeba tenhle: jeden zdroj pravdy pro barvy, písmo a komponenty.' },
      { t: 'Interní aplikace', d: 'Schvalování a evidence místo sdílených tabulek.' },
    ],
    offer: { t: 'Webový audit', d: 'Výkon, SEO, přístupnost a konverze. Dostanete seřazený seznam oprav s odhadem pracnosti.' },
  },
];

export const roles: [string, string][] = [
  ['Solution Architect', 'Architektura'], ['Enterprise Architect', 'Architektura'],
  ['IT Analyst', 'Analýza'], ['Business Analyst', 'Analýza'],
  ['Tester', 'Testování'], ['Test Analyst', 'Testování'], ['Test Manager', 'Testování'],
  ['Java Developer', 'Vývoj aplikací'], ['WSO2 Developer', 'Vývoj aplikací'], ['React Developer', 'Vývoj aplikací'],
  ['Oracle Developer', 'Databáze'], ['ETL Developer', 'Databáze'],
  ['Project Manager', 'Řízení a koordinace'], ['Scrum Master', 'Řízení a koordinace'], ['Delivery Manager', 'Řízení a koordinace'],
  ['Integration Analyst', 'Integrace'], ['System Architect', 'Integrace'], ['DevOps Specialist', 'Integrace'],
  ['AWS Developer', 'Cloud'], ['Azure Developer', 'Cloud'], ['DevOps Engineer', 'Cloud'],
  ['Power BI Developer', 'Data a AI'], ['Data Engineer (Microsoft Fabric)', 'Data a AI'], ['AI Engineer', 'Data a AI'],
  ['Cyber Security Expert', 'Bezpečnost'],
];

export const roleAreas: { area: string; icon: string; sprite: 'ui' | 'dom' }[] = [
  { area: 'Architektura', icon: 'i-sitemap', sprite: 'dom' },
  { area: 'Analýza', icon: 'i-project-diagram', sprite: 'dom' },
  { area: 'Testování', icon: 'i-check-circle', sprite: 'ui' },
  { area: 'Vývoj aplikací', icon: 'i-laptop-code', sprite: 'dom' },
  { area: 'Databáze', icon: 'i-database', sprite: 'dom' },
  { area: 'Řízení a koordinace', icon: 'i-users-cog', sprite: 'dom' },
  { area: 'Integrace', icon: 'i-exchange-alt', sprite: 'dom' },
  { area: 'Cloud', icon: 'i-cloud', sprite: 'dom' },
  { area: 'Data a AI', icon: 'i-chart-bar', sprite: 'dom' },
  { area: 'Bezpečnost', icon: 'i-shield-alt', sprite: 'dom' },
];

// Client names stay out until each client approves them (owner, 2026-11-06).
// Sector descriptions stand in until then.
export const sectors = ['Autodoprava', 'Plynárenství', 'Spojovací materiál', 'IT konzultace'];

export const cases = [
  { sector: 'Autodoprava', title: 'Dopravní společnost', services: ['Integrace', 'Reporting a data'],
    text: 'Propojení provozních systémů a přehled o zakázkách a nákladech dopravy.',
    done: ['Napojení ERP a provozních systémů přes SEBIT Gateway', 'Datahub se zakázkami a náklady na jednom místě', 'Přehledy pro vedení a dispečink v Power BI'] },
  { sector: 'Plynárenství', title: 'Firma z oboru plynárenství', services: ['Reporting a data', 'Integrace'],
    text: 'Datová platforma, ze které vedení, provoz i finance čtou stejná čísla.',
    done: ['Integrace zdrojových systémů přes SEBIT Gateway', 'Datová platforma v Microsoft Fabric', 'Reporting provozu a financí v Power BI'] },
  { sector: 'Velkoobchod', title: 'Velkoobchod se spojovacím materiálem', services: ['Weby a aplikace', 'Integrace'],
    text: 'Online prodej napojený na sklad a ERP, s přehledem o prodeji a marži.',
    done: ['E-shop napojený na ERP a sklad', 'Synchronizace cen, dostupnosti a objednávek', 'Reporting prodeje a marže v Power BI'] },
  { sector: 'IT služby', title: 'IT konzultační společnost', services: ['IT outsourcing'],
    text: 'Kapacita seniorních specialistů pro projekty klienta, bez náboru na jeho straně.',
    done: ['Analytici a vývojáři v týmech na projektech klienta', 'Rychlé doplnění kapacity podle potřeby projektu', 'Průběžný reporting odvedené práce'] },
];

export const leadership = [
  { name: 'Vojtěch Šebek', role: 'Head of Solutions', email: 'vojtech.sebek@sebit.cz',
    text: 'Business analytik a projektový manažer s praxí v bankovním IT. Odpovídá za řešení, která navrhujeme, a za to, že je dodáme.' },
  { name: null, role: null, email: null, text: null },
];

export const specialists = [
  { name: 'Leona Biová', role: 'Senior projektová manažerka', catalog: 'Project Manager', email: 'leona.biova@sebit.cz' },
  { name: 'Vojtěch Pastyřík', role: 'Integrační analytik', catalog: 'Integration Analyst', email: 'vojtech.pastyrik@sebit.cz' },
  { name: 'Anna Michutová', role: 'Business analytička', catalog: 'Business Analyst', email: 'anna.michutova@sebit.cz' },
  { name: 'Zdeněk Strnad', role: 'Expert na kybernetickou bezpečnost', catalog: 'Cyber Security Expert', email: 'zdenek.strnad@sebit.cz' },
];

export function initials(name: string): string {
  return name.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase();
}

export const manifest = [
  ['Transparentní výkaznictví', 'Práci vykazujeme v reálném čase a v 15minutových blocích. Naše výkazy jsou vždy přesným a pravdivým odrazem odvedené práce.'],
  ['Otevřená komunikace', 'Jsme plně transparentní ke klientům i sami k sobě. Důvěra a otevřenost jsou základem naší spolupráce.'],
  ['Úcta a profesionalita', 'Ke klientům jsme vždy uctiví, milí a profesionální. Budujeme partnerské vztahy založené na vzájemném respektu.'],
  ['Konstruktivní upřímnost', 'Nic nezatajujeme. Pokud klient dělá chybu, taktně mu to řekneme, vysvětlíme souvislosti a navrhneme řešení.'],
  ['Partnerství a proaktivita', 'Nejsme jen dodavatelé. Aktivně přemýšlíme nad projekty klienta a navrhujeme vylepšení, která přinášejí skutečnou hodnotu.'],
  ['Jsme jeden tým', 'Sdílíme znalosti, pomáháme si a táhneme za jeden provaz. Úspěch klienta je naším společným úspěchem.'],
  ['Hrdost na naši práci', 'Reprezentujeme značku SEBIT Solutions v každém kroku. Naše práce je naší nejlepší vizitkou.'],
];

export const needs: { key: string; icon: string; t: string; d: string }[] = [
  { key: 'data', icon: 'i-chart-bar', t: 'Reporting a data', d: 'Power BI, Fabric, přehledy' },
  { key: 'ai', icon: 'i-brain', t: 'AI nadstavba', d: 'Asistenti, automatizace, RAG' },
  { key: 'integrace', icon: 'i-exchange-alt', t: 'Integrace', d: 'SEBIT Gateway, API, ERP' },
  { key: 'weby', icon: 'i-laptop-code', t: 'Web nebo aplikace', d: 'Weby, e-shopy, portály' },
  { key: 'outsourcing', icon: 'i-user-plus', t: 'IT specialista nebo tým', d: 'Kapacitní outsourcing' },
  { key: 'modernizace', icon: 'i-sync-alt', t: 'Modernizace Oracle Forms', d: 'REST vrstva, nový frontend' },
  { key: 'registry', icon: 'i-university', t: 'Základní registry', d: 'ROB, ROS, RPP, RÚIAN' },
  { key: 'academy', icon: 'i-graduation-cap', t: 'Stáž nebo práce', d: 'Kariéra a Academy' },
];
