# 📋 Product Requirements Document (PRD): Webbshoppen – Kunddelen (Fas 2)

| Metadata                | Beskrivning                                                                                                                                                                                                                                                                                                     |
| :---------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Projekt**             | Webbshoppen – Kundportal (Fas 2)                                                                                                                                                                                                                                                                                |
| **Beställare**          | Nordic Retail Group (Fiktiv uppdragsgivare)                                                                                                                                                                                                                                                                     |
| **Utvecklingsteam**     | Konsultteamet / Projektgruppen                                                                                                                                                                                                                                                                                  |
| **Projekttid**          | 21 september 2026 – 13 oktober 2026                                                                                                                                                                                                                                                                             |
| **Slutleverans & Demo** | Tisdag 13 oktober 2026                                                                                                                                                                                                                                                                                          |
| **Teknisk Stack**       | React Vite + React Router 7, TypeScript/JavaScript, CSS/Tailwind                                                                                                                                                                                                                                                |
| **Stöddokument**        | [ADR-mall](https://github.com/perresoderberg/nordic-retail-group-webshop/blob/main/ADR-mall.md) \| [Domänordlista](https://github.com/perresoderberg/nordic-retail-group-webshop/blob/main/GLOSSARY.md) \| [Gruppkontrakt](https://github.com/perresoderberg/nordic-retail-group-webshop/blob/main/kontrakt.md) |

---

## 1. Vision & Bakgrund

Nordic Retail Group har framgångsrikt lanserat sitt interna administrativa gränssnitt (Fas 1). Nu behöver verksamheten ta nästa avgörande steg: **att öppna butiken för konsumenterna**.

Målet med Fas 2 är att förvandla produktkatalogen till en modern, inbjudande och högpresterande e-handelsbutik. Kunderna ska snabbt kunna hitta produkter, navigera i sortimentet, granska detaljer och förbereda sina beställningar. Lösningen ska byggas ovanpå teamets befintliga grund från Fas 1 med fokus på god användarupplevelse (UX), modern Next.js-arkitektur och stabil kodkvalitet.

---

## 2. Personas (Målgrupp)

För att säkerställa att design- och funktionsbeslut möter verkliga användarbehov utgår vi från två primära personas:

### 📱 Mobil-shopparen "Maya" (24 år)

- **Beteende:** Surfar ofta på språng via mobilen. Vill ha snabba laddtider och tydliga bilder.
- **Behov:** Enkel sökfunktion, ren layout utan krångliga menyer och smidig navigering mellan produktöversikt och detaljer.
- **Pain point:** Tröga sidor med layout shifts eller små knappar som är svåra att trycka på.

### 🔍 Pris- & Kvalitetsmedvetne "Peter" (42 år)

- **Beteende:** Handlar från dator/laptop, jämför specifikationer och vill filtrera fram exakt rätt vara.
- **Behov:** Exakt kategorifiltrering, fungerande paginering/sortering och länkar som går att dela/bokmärka (`searchParams`).
- **Pain point:** Sökfilter som nollställs vid sidomladdning eller otydlig lager- och prisinformation.

---

## 3. Grundläggande Funktionskrav (MVP - Scope)

Följande funktioner utgör basleveransen och måste vara implementerade och fungerande:

### 🛍️ FR-1: Produktkatalog (Översiktssida)

- Systemet ska visa alla tillgängliga produkter i ett responsivt rutnät (grid).
- Varje produktkort ska visa minst: bild, produktnamn, pris och kategori.
- Klick på ett produktkort ska leda direkt till produktens detaljsida.

### 🔍 FR-2: Dynamisk Detaljsida (`/products/[id]`)

- Systemet ska använda dynamiska rutter i Next.js App Router för att hämta och rendera information för en specifik vara.
- Sidan ska visa utförlig information: titel, högupplöst bild, beskrivning, pris, kategori och lagerstatus/köpknapp.
- Felhantering: Om en produkt inte finns ska en användarvänlig 404/not-found-vy visas.

### ⚡ FR-3: Sök & Filtrering via URL State (`searchParams`)

- Användaren ska kunna söka på produktnamn samt filtrera på kategorier.
- Tillståndet för sök och filter **måste lagras i URL:en** med hjälp av `searchParams` (så att filtrerade sökningar kan bokmärkas och delas).
- Data ska hämtas/filtreras sömlöst på servern baserat på aktuella parametrar.

### 📄 FR-4: Paginering

- Om katalogen innehåller fler varor än vad som ryms på en sida ska paginering finnas.
- Pagineringen ska styras via URL (`?page=X`) och möjliggöra bläddring framåt, bakåt och direktval av sida.

### 🛒 FR-5: Varukorg (Översiktsvy)

- En dedikerad vy/sida för varukorgen som visar hur en sammanställning av ordervärde, produkter, antal och totalbelopp ser ut.
- _Basnivå:_ En statisk vy med exempelprodukter som demonstrerar kassan och layouten.  
  _(Tips: Full dynamisk/persistent varukorg kan väljas som fördjupningsmodul)._

### 🛡️ Icke-funktionella krav (NFR)

- **Prestanda & Bildoptimering:** Använd Next.js inbyggda `<Image />`-komponent för optimerade bildstorlekar.
- **Tillgänglighet & SEO:** Semantisk HTML (`<header>`, `<main>`, `<article>`, `<nav>`), tydliga rubriknivåer (`h1`-`h3`) samt unika metadata-titlar per sida.
- **Dokumentation:** Repot ska ha en professionell och välstrukturerad `README.md` med installationsanvisningar, beskrivning av arkitektur och skärmdumpar.

---

## 4. Fas 2b: Fördjupningsmoduler (Kundens Önskelista)

För att särskilja ert erbjudande och skapa extra affärsvärde har kunden listat ett antal prioriterade fördjupningsområden. Varje team väljer fritt moduler utifrån sin kompetensprofil, sina ambitioner och intressen.

> 💡 **Riktlinje för teamet:**  
> Prioritera alltid **kvalitet och förståelse framför kvantitet**. En väl genomarbetad modul som alla i teamet förstår och kan förklara under redovisningen slår tre halvfärdiga moduler.

| Modul                         | Svårighetsgrad  | Inriktning & Rekommendation                                                                                                                                                                                             |
| :---------------------------- | :-------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **📦 Persistent Varukorg**    | 🟢 Lätt / Medel | Spara varukorgens innehåll mellan sidladdningar och sessioner.<br>_(Rekommenderat: **Zustand med persist-middleware** eller Cookies. Mycket tacksamt då det sker helt i kodbasen utan externa API-konton)._             |
| **🎨 Designsystem & UI**      | 🟢 Lätt / Medel | Bygg ett enhetligt, tillgängligt och proffsigt gränssnitt.<br>_(Rekommenderat: **Shadcn/ui + Tailwind CSS**. Undvik att bygga all CSS från scratch för att spara tid)._                                                 |
| **📨 Transaktionell E-post**  | 🟢 Lätt / Medel | Fungerande kontaktformulär eller orderbekräftelse via Next.js Server Actions.<br>_(Rekommenderat: **Resend**. Extremt smidigt i Next.js och kräver inga krångliga SMTP-inställningar)._                                 |
| **🔐 Autentisering**          |    🟡 Medel     | Kundinloggning och skyddade rutter (_Mina sidor_, orderhistorik, favoriter).<br>_(Rekommenderat: **NextAuth**, **Kinde**, **BetterAuth** eller **Clerk** för snabbast och säkrast integration med Next.js App Router)._ |
| **💳 Betallösning**           |    🟡 Medel     | Simulera ett riktigt köpflöde i testläge.<br>_(Rekommenderat: **Stripe Hosted Checkout**. Kunden omdirigeras till Stripes säkra sida och tillbaka, vilket minimerar komplexitet)._                                      |
| **☁️ Databasmigration**       |    🟡 Medel     | Ersätt Fas 1:s JSON-server med en riktig molndatabas och ett modernt ORM.<br>_(Rekommenderat: **Supabase** eller **Neon PostgreSQL** kopplat med **Prisma** eller **Drizzle**)._                                        |
| **🌍 Cloud Deployment**       |    🟡 Medel     | Publik driftsättning i produktionsmiljö.<br>_(Rekommenderat: **Vercel**. **Obs:** Kräver att er datakälla finns online och inte på `localhost:3001`!)_                                                                  |
| **〽️ Prestandaoptimering**    |  🔴 Avancerad   | Avancerad strömning, skelettladdare och optimistiska gränssnittsuppdateringar.<br>_(Rekommenderat: **Suspense-boundaries**, `useOptimistic` och Server Actions)._                                                       |
| **⚙️ Automatiserad Testning** |  🔴 Avancerad   | E2E-testning av affärskritiska flöden (sök vara → öppna detaljsida → lägg i korg).<br>_(Rekommenderat: **Playwright**)._                                                                                                |

> ⚠️ **Arkitekturtips inför val av moduler:**
>
> - **Säkra kort utan externa konton:** Om ni känner er osäkra eller vill minimera beroenden, välj **Persistent Varukorg (Zustand)** och **Designsystem (Shadcn/ui)**.
> - **Deployment-fällan:** Om ni vill driftsätta på Vercel måste datan antingen migreras till en molndatabas (t.ex. Supabase) eller serveras via ett publikt API. Vercel kan inte prata med er lokala `json-server`.

---

## 5. Teamets Arbetsdel & Specifikation [Att färdigställas av teamet]

> ✍️ **Instruktion till teamet:**  
> Denna sektion ska fyllas i av gruppen under **Sprint 1 (vecka 39)** innan kodningen drar igång.

### 5.1 Vald Kodbas från Fas 1 & Repouppsättning

> 🚀 **Gemensamt repo från start:**  
> För att alla i gruppen ska ha samma förutsättningar och behörigheter ska ni **inte** fortsätta koda direkt i en enskild persons gamla Fas 1-repo.
>
> 1. En person skapar ett **helt nytt gemensamt GitHub-repo** för gruppen (t.ex. `grupp-X-webbshop-fas2`).
> 2. Bjud in samtliga gruppmedlemmar som **Collaborators** med fulla skrivrättigheter.
> 3. Kopiera över den valda koden från Fas 1 och pusha som er första commit (`Initial commit from Phase 1`).
> 4. Lägg in detta dokument (`PRD.md`), `kontrakt.md` och `docs/` i repot.

- **Vald Fas 1-kodbas:** Bygger på kod skriven av `Per & Kinga / https://github.com/perresoderberg/scrum-inventory-management`
- **Nytt gemensamt GitHub-repo:** `https://github.com/perresoderberg/nordic-retail-group-webshop`
- **Eventuella städnings- eller refaktoreringsbehov i basen innan start:**
  - `All nuvarande funkonalitet ska ligga under en admin fil-struktur. Ta bort middleware och json-fil då vi går mot en .NET backend och databas`

---

### 5.2 Datamodell & API-kontrakt

_Specificera hur er produktmodell ser ut för kundgränssnittet:_

```json
{
  "id": "number",
  "title": "string",
  "description": "string",
  "price": "number",
  "categoryId": "number",
  "imageUrl": "string",
  "stock": "number"
}
```

_(Justera fälten ovan så de matchar er faktiska backend)._

---

### 5.3 Teamets User Stories & Acceptanskriterier

_Formulera minst 3–5 konkreta User Stories för ert MVP och era valda funktioner. Använd Gherkin-format (Given/When/Then) för acceptanskriterierna._

# User Stories

## US-1 – Visa produkter

**Som kund** vill jag kunna se butikens produkter i en tydlig produktöversikt så att jag enkelt kan hitta produkter som intresserar mig.

### Acceptanskriterier – Given / When / Then

- **Given** att jag befinner mig på produktkatalogen
- **When** produkterna har laddats
- **Then** visas alla tillgängliga produkter i ett responsivt grid.
- **And** varje produktkort visar minst produktbild, produktnamn, pris och kategori.
- **And** varje produktkort är klickbart och leder till produktens detaljsida.
- **And** produktöversikten anpassas till mobil, tablet och desktop.

---

## US-2 – Visa produktdetaljer

**Som en kund** vill jag kunna öppna en produkt och se mer information om den så att jag kan avgöra om produkten passar mina behov.

### Acceptanskriterier – Given / When / Then

- **Given** att jag befinner mig i produktkatalogen
- **When** jag klickar på en produkt
- **Then** navigeras jag till produktens detaljsida.
- **And** detaljsidan visar produktnamn, bild, beskrivning, pris, kategori och lagerstatus.
- **And** det finns en tydlig köpknapp.
- **And** om produkten inte finns visas en användarvänlig felsida.
- **And** detaljsidan fungerar på mobil, tablet och desktop.

---

## US-3 – Söka och filtrera produkter

**Som en kund** vill jag kunna söka efter produkter och filtrera på kategori så att jag snabbt kan hitta de produkter jag är intresserad av.

### Acceptanskriterier – Given / When / Then

- **Given** att jag befinner mig på produktkatalogen
- **When** jag skriver ett sökord
- **Then** visas endast produkter som matchar sökningen.
- **And** när jag väljer en kategori visas endast produkter från den valda kategorin.
- **And** sökord och valt kategorifilter sparas i URL:en.
- **And** sökning och filter finns kvar om sidan laddas om eller URL:en delas.
- **And** om inga produkter matchar visas ett tydligt meddelande, till exempel "Inga produkter matchade din sökning."

---

## US-4 – Paginering

**Som en kund** vill jag kunna bläddra mellan flera sidor med produkter så att jag enkelt kan navigera genom hela sortimentet.

### Acceptanskriterier – Given / When / Then

- **Given** att det finns fler produkter än vad som visas på en sida
- **When** jag klickar på nästa sida, föregående sida eller ett sidnummer
- **Then** visas produkterna för den valda sidan.
- **And** den aktuella sidan sparas i URL:en, exempelvis `?page=2`.
- **And** aktiva sökord och kategorifilter behålls när jag byter sida.
- **And** det framgår tydligt vilken sida jag befinner mig på.
- **And** jag kan inte navigera bakåt från första sidan eller framåt från sista sidan.

---

## US-5 – Varukorg

**Som en kund** vill jag kunna hantera produkterna i min varukorg och se en sammanställning av mitt köp så att jag kan kontrollera min beställning.

### Acceptanskriterier – Given / When / Then

- **Given** att jag har lagt till produkter i varukorgen
- **When** jag öppnar varukorgen
- **Then** visas produkterna som finns i varukorgen.
- **And** varje produkt visar minst produktnamn, pris och antal.
- **And** jag kan öka och minska antalet av en produkt.
- **And** jag kan ta bort en produkt från varukorgen.
- **And** totalbeloppet uppdateras utifrån produkterna och deras antal.
- **And** varukorgens innehåll finns kvar om sidan laddas om.
- **And** varukorgen har en tydlig och responsiv layout.

### 5.4 Valda Fördjupningsmoduler & Arkitekturbeslut (ADR)

> 💡 **Riktlinje för ADR:er (Architecture Decision Records):**  
> **Skriv INTE en ADR för varje litet beslut!** Ni ska **endast skriva 1 (max 2) ADR:er för hela projektet**.  
> Det är **extra viktigt och naturligt att koppla er ADR till era valbara fördjupningsmoduler** (t.ex. _Varför valde vi Zustand framför Context för varukorgen?_ eller _Varför valde vi Supabase framför JSON-server?_). Använd mallen i `docs/ADR-mall.md`.

1. **Modul 1:** `local storage för varukorg för anonyma användare`
   - **ADR-dokument:** Länk till `https://github.com/perresoderberg/nordic-retail-group-webshop/blob/main/docs/ADR-001.md`
   - **Kort motivering:** `localstorage överlever refresh i webbläsaren, det gör inte React Context. Zustand kräver ett extra bibliotek.`

---

### 5.5 Teamets Definition of Done (DoD)

_Vad krävs i er grupp för att en Issue/Ticket ska få flyttas till "Done"? (Kryssa i och anpassa)_:

- [x] Lösningen uppfyller den specificerade User Storyn och dess acceptanskriterier.
- [x] Funktionen är testad lokalt och fungerar som förväntat.
- [x] Applikationen bygger utan fel (`npm run build`).
- [ ] Det finns inga TypeScript- eller lint-fel.
- [x] Koden är tydlig, strukturerad och följer projektets befintliga kodstruktur.
- [x] Funktionen fungerar responsivt där det är relevant.
- [x] Grundläggande tillgänglighet är kontrollerad där det är relevant.
- [x] Pull Request är skapad och kopplad till rätt Issue/Ticket.
- [x] Pull Request är granskad och godkänd av den andra teammedlemmen.
- [x] Koden är mergad till `main`.
- [x] Relaterad Issue/Ticket är stängd och GitHub Projects är uppdaterat.

---

## 6. Process, Tidslinje & Rekommenderade Milstolpar

Grupperna förväntas arbeta enligt agila principer med sprintar, backlog i GitHub Projects och dagliga korta avstämningar enligt ert [Gruppkontrakt](https://github.com/perresoderberg/nordic-retail-group-webshop/blob/main/kontrakt.md).

### 🗓️ Hållpunkter i projektet

| Period                       | Huvudfokus                             | Mål & Leverans                                                                                                                                                                                                                                               |
| :--------------------------- | :------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Vecka 39 (21/9 – 25/9)**   | **Uppstart, Kontrakt & Specifikation** | • Gruppkontrakt signerat.<br>• Val av Fas 1-kodbas fastställt.<br>• PRD-sektionerna ovan ifyllda.<br>• **Senast fredag 25/9:** Kanban-board / GitHub Projects uppsatt med brutna tickets redo för sprintstart nästa vecka.                                   |
| **Vecka 40 (28/9 – 2/10)**   | **Sprint: MVP-Utveckling**             | • Kodning startar i full skala!<br>• Implementering av rutnät, detaljsida, sök/filter och paginering.<br>• **Mål slutet av v.40 (~2/10):** Feature Freeze för grundläggande MVP-krav.                                                                        |
| **Vecka 41 (5/10 – 9/10)**   | **Sprint: Fördjupning & Förfining**    | • Implementering av era valda fördjupningsmoduler.<br>• Refaktorering av kodbasen, styling och UI-puts.<br>• Skriva färdigt ADR-dokumentation i `docs/`.                                                                                                     |
| **Vecka 42 (12/10 – 13/10)** | **Slutleverans & Redovisning**         | • **Måndag 12/10:** Total Code Freeze, finslipning av `README.md`, förberedelse och testkörning av presentationen.<br>• **Tisdag 13/10:** Slutredovisningar enligt [redovisningsinstruktionen](file:///c:/docLocal/Lexicon/FE26/grupparbete/redovisning.md). |

---

## 7. Leverabler & Slutredovisning

Vid projektets avslutning ska varje grupp leverera:

1. **GitHub-repo:** Innehållande ren kod, versionshistorik via PRs, ifylld `PRD.md`, era `docs/ADR-xxx.md` samt en informativ `README.md`.
2. **Fungerande applikation:** Redo att demonstreras live under redovisningen.
3. **Muntlig presentation:** 15–20 minuter uppdelad i tre delar: _Förberedelse_, _Utförande_ och _Resultat & Reflektion_ enligt instruktionerna i [redovisning.md](file:///c:/docLocal/Lexicon/FE26/grupparbete/redovisning.md).
