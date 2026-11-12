# NSE Tracker

NSE Tracker is an investor-intelligence interface for the Nairobi Securities Exchange.

## Frontend stack

- Next.js 15 App Router
- React 19 and TypeScript
- Tailwind CSS
- Lucide React icons

## Routes

- `/` — Market overview dashboard
- `/market` — Market indices and market breadth
- `/stocks` — Sample listed-company directory
- `/stocks/[symbol]` — Individual company profile preview
- `/investors` — Publicly identified investor directory
- `/institutions` — Institutional holdings register
- `/ownership` — Disclosed ownership changes
- `/insider-activity` — Publicly disclosed insider dealings
- `/watchlist` — Local, in-session symbol watchlist preview
- `/alerts` — Alert configuration preview

## Run locally

```bash
npm install
npm run dev
```

For a production build:

```bash
npm run build
npm start
```

## Data integrity rules

- All current market figures and company examples in the UI are illustrative placeholders, not live NSE data.
- Never infer the identity of an exchange buyer or seller from aggregate market volume.
- Ownership and insider events must be backed by public source documents.
- Store source URL/document, publication date, effective date, and verification status for every disclosure.
- Keep market-data-derived indicators separate from verified disclosure facts.
- Select and license an appropriate market-data provider before publishing live quotes.

## Current implementation status

The frontend routes and shared layout are in place. Authentication, persistent user watchlists, notifications, database models, admin review workflows, and market-data integrations have not yet been implemented. A production build and browser QA are still required before deployment.
