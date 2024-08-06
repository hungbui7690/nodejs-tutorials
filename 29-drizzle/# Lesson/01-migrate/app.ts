/*
  Installation
  - Turso is a libSQL powered edge SQLite database as a service.
  
    @@ npm i drizzle-orm 
    @@ npm i -D drizzle-kit
    @@ npm i -D better-sqlite3 @types/better-sqlite3 mysql2

    ~~ npm i dotenv

  
*************************

  1. Create Schema -> schema.ts 

  2. Create Config -> drizzle.config.ts

  3. Generate the Migration -> this will generate drizzle folder that contains migration sql file
    ## npx drizzle-kit generate

  4. Run the migrations
    @@ npx drizzle-kit migrate


***************************

  Note: When run dev package (drizzle-kit) 
    -> ❌ npm drizzle-kit generate 
    -> ✅ npx drizzle-kit generate


*/
