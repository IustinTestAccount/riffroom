# Riffroom

Riffroom is a dark music rating and recommendation frontend focused on metal and rock listeners. It simulates a small product where a listener can track albums, rate records, browse artist pages, follow friend activity, and receive recommendations based on their taste profile.

The sample version is intentionally centered on four reference artists:

- Eluveitie
- Rammstein
- Septicflesh
- System of a Down

The application is built as a frontend-only product prototype. It uses real sample data, real artist and album image URLs where possible, tested recommendation logic, and a compact dark visual system instead of a generic dashboard layout.

## What problem this simulates

Riffroom simulates the product problem of helping a heavy music listener answer three questions quickly:

1. What have I already rated or queued?
2. Which genres and artists define my current taste?
3. Which album should I hear next, and why?

The app is useful as a small but realistic frontend target for automated testing, CI failure generation, visual regression experiments, and Repo Guardian controller scripts.

## Main features

- Compact dark metal-inspired UI.
- Centered layout with a readable maximum width.
- Listener profile summary with rating and genre signals.
- Artist cards for Eluveitie, Rammstein, Septicflesh, and System of a Down.
- Music library with status, genre, and text filtering.
- Album cards with real cover images where possible.
- Recommendation list generated from rated genres and unrated records.
- Friend activity feed.
- Image credit section with replaceable source URLs.
- Graceful image fallback component for failed remote images.
- Unit-tested core logic.
- GitHub Actions CI workflow.

## Technology stack

- Svelte 5
- TypeScript
- Vite
- Vitest
- svelte-check
- ESLint
- Plain CSS
- GitHub Actions

## Folder structure

```text
riffroom/
  .github/
    workflows/
      ci.yml
  src/
    lib/
      components/
        ImageWithFallback.svelte
      data.ts
      musicLogic.test.ts
      musicLogic.ts
      types.ts
    app.css
    App.svelte
    main.ts
    vite-env.d.ts
  .gitignore
  eslint.config.js
  index.html
  package.json
  package-lock.json
  README.md
  svelte.config.js
  tsconfig.json
  vite.config.ts
```

## Install dependencies

```bash
npm ci
```

## Run locally

```bash
npm run dev
```

Then open the local Vite URL printed by the terminal.

## Build for production

```bash
npm run build
```

## Preview the production build

```bash
npm run preview
```

## Run tests

```bash
npm run test
```

## Run type checking

```bash
npm run typecheck
```

## Run linting

```bash
npm run lint
```

## Run the full local CI command

```bash
npm run ci
```

This command runs linting, type checking, unit tests, and the production build.

## GitHub Actions CI

The repository includes `.github/workflows/ci.yml`. The workflow runs the following commands:

```bash
npm ci
npm run lint
npm run typecheck
npm run test
npm run build
```

## Core logic covered by tests

The logic in `src/lib/musicLogic.ts` is intentionally separated from the UI so it can fail independently and be detected by CI.

Covered behavior:

- average rating calculation;
- album average calculation;
- top genre calculation;
- library filtering by status, genre, and search text;
- recommendation filtering and scoring.

## Image sources and credits

Image URLs live in `src/lib/data.ts`. Each artist and album image has a credit object with:

- display label;
- source name;
- source URL;
- license or rights note;
- image URL;
- replacement note.

Artist images are loaded from Wikimedia Commons file pages through `Special:FilePath` URLs:

- Eluveitie: `https://commons.wikimedia.org/wiki/File:Eluveitie.jpg`
- Rammstein: `https://commons.wikimedia.org/wiki/File:Rammstein_Nijmegen_2022_(1).jpg`
- Septicflesh: `https://commons.wikimedia.org/wiki/File:Septicflesh,_B90,_Gda%C5%84sk,_November_8_2022_19.jpg`
- System of a Down: `https://commons.wikimedia.org/wiki/File:Pinkpop_2017_-_System_of_a_Down.jpg`

Album covers mostly use Cover Art Archive URLs generated from MusicBrainz release MBIDs:

- Eluveitie, `Origins`: `https://musicbrainz.org/release/d44c860a-e657-4f82-86ac-19a72def7712/cover-art`
- Eluveitie, `Everything Remains as It Never Was`: `https://musicbrainz.org/release/80bd89fb-0e6c-44fe-b003-413eefc8ac2f/cover-art`
- Eluveitie, `Evocation II - Pantheon`: `https://musicbrainz.org/release/f82bfd3b-d79e-45d4-b81b-97ae6b88c72d/cover-art`
- Rammstein, `Mutter`: `https://musicbrainz.org/release/9da5a7f9-bb2b-3421-bf82-29b4f124c6b3/cover-art`
- Rammstein, `Rosenrot`: `https://musicbrainz.org/release/15b602a8-07d0-43f6-a0bd-10cde8b3a0b1/cover-art`
- Rammstein, `Liebe ist fur alle da`: `https://musicbrainz.org/release/103e5768-6d87-37e3-aeda-996f83d9cedb/cover-art`
- Septicflesh, `A Fallen Temple`: `https://musicbrainz.org/release/01b1b7e6-6505-4100-ae3e-ffcdefc325fa/cover-art`
- System of a Down, `Toxicity`: `https://musicbrainz.org/release/589cebcb-a7ea-3c76-b3b4-c7e77e38887e/cover-art`
- System of a Down, `Mezmerize`: `https://musicbrainz.org/release/62c28f7f-e8e2-4a94-b2bb-e0c77b3364af/cover-art`
- System of a Down, `Hypnotize`: `https://musicbrainz.org/release/c5c36cb2-d409-4c97-ae21-9f331a895566/cover-art`

`Communion` uses a directly replaceable Wikipedia-hosted album artwork URL. Its data entry is explicitly marked as copyrighted album artwork and should be replaced before production or commercial use.

## Replacing image URLs later

To replace an image, edit only the matching entry in `src/lib/data.ts`:

1. Find the `Artist` or `Album` object.
2. Replace `imageUrl` or `coverUrl`.
3. Update the matching `credit` object.
4. Keep the fallback component unchanged.

The UI does not assume a specific image provider. It only needs a valid image URL string.

## Image fallback behavior

`src/lib/components/ImageWithFallback.svelte` renders a styled fallback if an image fails to load. The application includes a visible fallback demonstration card in the Friends and Activity section using an intentionally invalid URL. This keeps fallback behavior easy to verify without breaking real artist or album data.

## Future failure scenarios for Repo Guardian testing

The project is structured so controller scripts can deliberately introduce realistic failures. Useful scenarios include:

- breaking recommendation logic;
- breaking average rating calculation;
- breaking artist or album type contracts;
- introducing a Svelte component import error;
- introducing a failing unit test;
- introducing a typecheck error;
- introducing a lint error;
- breaking image fallback behavior;
- changing album data in a way that breaks UI assumptions.

## Notes on licensing

The app is a frontend prototype. Image credits are included for traceability, but album artwork rights can be complex. If the project becomes public or commercial, review every image source and replace uncertain artwork with licensed assets.
