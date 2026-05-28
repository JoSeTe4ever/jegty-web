# Copilot instructions for jegty-web

## Build, test, and run commands

- Install dependencies: `npm install` (README expects Node.js v12.14.1; this app uses older React 16 and `node-sass` 4).
- Start the local CRA dev server: `npm run start`, then open `http://localhost:3000`.
- Build production assets: `npm run build`.
- Run tests once: `npx react-scripts test --watchAll=false --passWithNoTests` (there are currently no test files).
- Run one test file: `npx react-scripts test --watchAll=false src\path\to\file.test.jsx`.
- There is no dedicated lint script; package ESLint config extends `react-app`.

## High-level architecture

- This is a Create React App single-page app using React 16, React Router v5, Redux, redux-persist, Firebase, Material UI v4, Bootstrap 4, and SCSS.
- `src\index.js` wires the app together: `AuthContext` -> Redux `Provider` -> `PersistGate` -> `BrowserRouter` -> `App`. Redux state is persisted to browser localStorage with `redux-persist`.
- `src\App.jsx` gates the main experience from Redux `state.isLogged`: logged-out users see `Login` plus the landing `Header`; logged-in users enter `Dashboard` inside `MuiPickersUtilsProvider`.
- Firebase is centralized in `src\data\firebase.js`, exporting Auth app, Firestore `db`, Realtime Database `realTimeDb`, cloud function base URL, and the current auth token. `AuthContext` listens to Firebase auth state, but most UI gating and user data flow through Redux.
- Backend data access lives under `src\data\`: `jegty-api.js` handles Firestore/Realtime DB users, friends, pending requests, and rooms; `games-api.js` calls RAWG; `cloud-functions.js` calls Firebase Cloud Functions; `jegty-api-mongo.js` appears experimental and is not wired into the UI.
- Dashboard routes are declared in `src\components\views\Dashboard.jsx` and rendered through `GuardedRoute`. Dashboard feature pages live in `src\components\views\dashboard\`, while reusable UI is grouped as `shared\atoms`, `shared\mollecules`, and `shared\organisms`.
- Firestore data is denormalized for Firebase limitations. Important collections/paths include `users/{uid}`, `users/{uid}/games`, `games/{gameId}`, `games/{gameId}/users`, `friendZone/{uid}/friends`, `pendings/{encodedEmail}/users`, and Realtime DB `pendingRequests/{encodedEmail}`.
- RAWG game search/detail data is separate from Jegty room data. Room records store `rawgGameId`; components fetch RAWG details and cache them in Redux.

## Key conventions

- JavaScript/JSX only. `jsconfig.json` sets `baseUrl` to `src` and `checkJs` to true, so imports may be absolute from `src` such as `data/jegty-api` or `components/shared/...`; relative imports are also common.
- Redux state shape is defined in `src\redux\store.js`. Add new state transitions via constants in `src\redux\actions\action-type.js`, action creators in `src\redux\actions\actions.js`, and cases in `src\redux\reducers\rootReducer.js`.
- The reducer usually shallow-copies state and mutates nested arrays before returning. Preserve existing persisted-state behavior, including the default return path in `rootReducer`.
- Logout is handled by dispatching `logValidUser(false)`, which clears localStorage and resets Redux state.
- Cache arrays under `state.cache` (`rawGames`, `roomGames`, `jegtyUsers`) are used to avoid repeat Firebase/RAWG requests. Check these caches before adding new fetch paths.
- Firebase query snapshots are commonly converted with `.docs.map(doc => doc.data().id)` or `.docs.map(doc => doc.data())`.
- Encode email-derived Firebase keys with `emailEncoder` from `src\helpers\idEncoder.js`; it replaces dots with semicolons.
- Form components often use refs rather than fully controlled state. `InputField` expects an `innerRef` and writes `innerRef.current.value` in its `onChange`.
- Bootstrap/jQuery modals are loaded from `public\index.html` and manipulated with `window.$`; React code also removes stale `.modal-backdrop` elements in `App` and `Dashboard`.
- Global styling starts at `src\index.scss`, which imports `src\styles\base.scss`. Bootstrap, Font Awesome, and template CSS/JS are served from `public\`.
- RAWG list/search calls require `REACT_APP_RAWG_API_KEY`; CRA only exposes environment variables prefixed with `REACT_APP_`.
