### Inserting into database

1. Create new Supabase Project
2. Take Supabase Url and Anon Key
3. Setup Local Seeding to Database

### setup seeding

Using [Drizzle ORM](https://orm.drizzle.team/) to seed database

- Declare schema on schema.ts
- Apply migration
- run `pnpm drizzle-kit generate` to create a migration file
- run ` pnpm drizzle-kit migrate` to migrate the database
