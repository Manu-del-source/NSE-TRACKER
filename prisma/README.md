# Database setup

NSE Tracker uses PostgreSQL through Prisma ORM.

## Configure a database

1. Create or select a Neon PostgreSQL project.
2. Copy its pooled connection string into a local `.env` file as `DATABASE_URL`.
3. Keep the real connection string out of GitHub.
4. Generate the Prisma client:

```bash
npm install
npx prisma generate
```

5. Apply the schema to a development database:

```bash
npx prisma migrate dev --name init_nse_tracker
```

Do not run a production migration until the target Neon project and branch have been confirmed.

## Data integrity

- `SourceDocument` stores the origin of imported records.
- `OwnershipEvent` and `InsiderDisclosure` require a source document and have explicit verification states.
- `ShareholdingSnapshot` records holdings as reported at a specific date; it is not a live position feed.
- `MarketSignal` is separate from disclosed facts and stores its method, calculation window, score, input snapshot and disclaimer.
- Aggregate market activity must never be used to claim the identity of a buyer or seller.

## Important

No seed data is included. Empty tables are intentional until real, attributable data sources are selected and reviewed.
