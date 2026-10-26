# Etapa 1

## Instrumente utilizate
- Gemini

### 1. Adaptarea temei de proiect și structura semantică HTML
- **Întrebare:** Cum să organizez elementele semantice HTML (header, main, două panouri și subsol) și să definesc câmpurile specifice pentru o aplicație de rezervări turistice.
- **Răspuns primit:** O structură cu `<header>`, `<main class="container">`, două elemente `<section class="panel">` pentru formularul de adăugare și listă, plus câmpurile de date pe card (`destinatie`, `tip_masa`, `platita`).
- **Modificări / Ajustări:** Am adaptat denumirile claselor CSS pentru etichetele de turism și am asigurat împărțirea ecranului pe desktop în 1fr 2fr, care trece pe o singură coloană pe ecrane înguste.

### 2. Stilizarea cu variabile CSS și reguli responsive
- **Întrebare:** Cum se scrie un fișier CSS modern folosind variabile în `:root` și interogări media pentru ecrane sub 700 px fără a duplica declarațiile de culori.
- **Răspuns primit:** Un set de stiluri în `style.css` cu variabile, contur accesibil `:focus-visible` pentru navigarea cu tasta Tab și regula `@media (max-width: 700px)`.
- **Modificări / Ajustări:** Am păstrat schema vizuală cu degrade și am aplicat stilul cerut pentru elementele finalizate (`.done` / `.platita` cu text tăiat și culoare estompată).

## Ce am învățat / ce nu a funcționat
- Am învățat cum se configurează conturul vizibil de focalizare (`:focus-visible`) pentru navigarea accesibilă din tastatură.
- Am constatat că regulile `@media` trebuie plasate la finalul fișierului CSS pentru a suprascrie corect proprietățile desktop de Grid.
- Am înțeles avantajul folosirii elementelor semantice (`<header>`, `<main>`, `<section>`) în locul div-urilor generice.

# Etapa 2

## Instrumente utilizate
- Gemini 

### 1. Operații imutabile pe liste de obiecte
- **Întrebare:** Cum se implementează funcțiile `numaraNeplatite`, `cautaDupaDestinatie`, `comutaPlatita` și `stergeRezervare` fără a modifica array-ul inițial.
- **Răspuns primit:** Funcții pure care folosesc metodele `map()`, `filter()`, `find()` și operatorul spread `[...lista, nou]`.
- **Modificări / Ajustări:** Am menținut denumirile specifice temei de rezervări turistice și am evitat metodele distructive precum `push()` pentru a asigura compatibilitatea viitoare cu React.

### 2. Generarea id-urilor unice și validarea
- **Întrebare:** Cum se evită generarea de id-uri duplicate la adăugare după ce anumite elemente au fost șterse din listă.
- **Răspuns primit:** O funcție ajutătoare `nextId()` bazată pe `reduce((max, r) => Math.max(max, r.id), 0) + 1` în loc de simpla lungime a listei (`length + 1`).
- **Modificări / Ajustări:** Am introdus validări explicite care resping destinațiile goale (folosind `.trim()`) sau tipurile de masă nepermise, afișând avertismente clare în consolă.

## Ce am învățat / ce nu a funcționat
- Am învățat că metoda `push()` modifică direct referința array-ului, ceea ce împiedică React să detecteze schimbările de stare în etapele ulterioare.
- Am înțeles utilitatea metodei `reduce()` pentru calcularea sigură a cheilor primare unice.
- Am exersat gruparea mesajelor de test în consolă pe secțiuni clare pentru verificare ușoară.

# Etapa 3

## Instrumente utilizate
- Gemini 

### 1. Migrarea stilurilor și a fișierelor demonstrative Vite
- **Întrebare:** Ce fișiere trebuie eliminate după crearea proiectului React cu Vite și cum se transferă stilurile din mockup.
- **Răspuns primit:** Ștergerea fișierelor demonstrative (`assets/`, `index.css`), mutarea fișierelor din etapele 1 și 2 în folderul `mockup/` și importul fișierului `App.css` în `main.jsx`.
- **Modificări / Ajustări:** Am păstrat structura cu o singură coloană conform indicațiilor din ghid și am afișat temporar lista ca text brut prin `<pre>{JSON.stringify(rezervari, null, 2)}</pre>`.

### 2. Calcularea dinamică a contorului în antet
- **Întrebare:** Unde trebuie declarat array-ul de obiecte și cum se calculează numărul de rezervări plătite și neplătite direct în JSX.
- **Răspuns primit:** Declararea array-ului deasupra funcției componentei `App` și calculul prin `.filter()` la fiecare randare.
- **Modificări / Ajustări:** Am inserat expresia JSX dinamică direct în antet: `{rezervari.length} rezervări, dintre care {platite} plătite`.

## Ce am învățat / ce nu a funcționat
- Am întâmpinat o eroare de execuție (`ENOENT`) când am rulat `npm run dev` din rădăcina proiectului în loc să navighez mai întâi în subfolderul `frontend/`.
- Am învățat că în JSX etichetele trebuie să fie mereu închise (`<input />`) și că atributul `class` devine obligatoriu `className`.
- Am înțeles rolul comenzii `npm run build` pentru testarea corectitudinii compilării înainte de trimiterea pe GitHub.

# Etapa 4

## Instrumente utilizate
- Gemini 


### 1. Împărțirea în componente și randarea condiționată
- **Întrebare:** Cum se sparge lista de rezervări în două componente distincte situate în folderul `src/components/`.
- **Răspuns primit:** Crearea fișierului `RezervariList.jsx` (care parcurge lista prin `.map()` și asociază atributul `key={rezervare.id}`) și a fișierului `RezervariCard.jsx` (care primește obiectul rezervare prin props).
- **Modificări / Ajustări:** Am adăugat verificarea timpurie pentru cazul în care lista este goală, afișând mesajul explicit: `Nu există nicio rezervare.`

### 2. Rezolvarea erorii de import în Vite pe Windows
- **Întrebare:** Cum se rezolvă eroarea `[plugin:vite:import-analysis] Failed to resolve import "./components/RezervareList.jsx"` apărută în `App.jsx`.
- **Răspuns primit:** Identificarea diferenței de scriere între numele fișierului de pe disc (`RezervariList.jsx`) și textul căii din `import`, sincronizarea numelor și golirea memoriei cache a serverului Vite.
- **Modificări / Ajustări:** Am aliniat denumirile din importuri exact cu cele ale fișierelor și am repornit serverul de dezvoltare folosind comanda `npm run dev -- --force`.

### 3. Încadrarea elementelor în panou și stilizarea
- **Întrebare:** De ce câmpul de intrare pentru „Nopți” depășea chenarul alb din panoul formularului și cum se corectează.
- **Răspuns primit:** Adăugarea proprietăților `width: 100%` și `min-width: 0` pe containerele copil din structura flexbox `.form-row`.
- **Modificări / Ajustări:** Am integrat starea reactivă pentru comutarea plății și adăugarea de rezervări noi direct în interfață, păstrând aspectul vizual conform mockup-ului.

## Ce am învățat / ce nu a funcționat
- Am învățat că React impune atribuirea cheii unice `key` pe elementul returnat direct din `map()` pentru a evita avertismentele din consolă.
- Am constatat că sistemul de fișiere de pe Windows este case-insensitive, ceea ce poate crea confuzii în rezoluția modulelor din Vite dacă denumirile nu sunt sincronizate cu exactitate.
- Am înțeles fluxul unidirecțional al datelor transmise de la părinte către copii prin intermediul props-urilor.