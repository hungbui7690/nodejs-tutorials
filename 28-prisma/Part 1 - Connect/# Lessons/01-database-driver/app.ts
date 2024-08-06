/*
  - Prisma ORM: 
    + is a next-generation Node.js and TypeScript ORM that unlocks a new level of developer experience when working with databases thanks to its intuitive data model, automated migrations, type-safety & auto-completion.
  - Prisma Accelerate:
    + is a global database cache with scalable connection pooling to make your queries fast.
  - Prisma Pulse:
    + allows you to react to database changes with type-safe model subscriptions.


*************************

  - Initialize a TypeScript project using npm:
    @@ npm init -y
    @@ npm install typescript @types/node --save-dev
  
  - Instead of using ts-node, we can use tsx to run typescript app
    ## npm install -g tsx
      -> tsx app.ts
      -> tsx watch app.ts

  - Now, initialize TypeScript:
    ~~ npx tsc --init

  - Then, install the Prisma CLI as a development dependency in the project:
    ?? npm install prisma --save-dev

  - Finally, set up Prisma ORM with the init command of the Prisma CLI:
    @@ npx prisma init --datasource-provider sqlite
    
  - This creates a new prisma directory with a prisma.schema file and configures SQLite as your database. You're now ready to model your data and create your database with some tables.
    -> it'll create .env file


*******************************

  Database drivers
  - pic
  - Query Engine is a part of Prisma Client (PC) -> responsible to transform PC queries into SQL Statement

      Prisma Client <-> Query Engine <-> Database

  - Prisma Client can connect and run queries against your database using JavaScript database drivers using driver adapters. Adapters act as translators between Prisma Client and the JavaScript database driver.
  - Prisma Client will use the Query Engine to transform the Prisma Client query to SQL and run the generated SQL queries via the JavaScript database driver.

      Prisma Client <-> Query Engine <-> Database Driver <-> Database


*************************
  - To use driver adapters -> update the previewFeatures block in your schema to include the driverAdapters Preview feature:

    -> generator client {
        provider        = "prisma-client-js"
        previewFeatures = ["driverAdapters"]
      }

  - Generate Prisma Client: 
    -> npx prisma generate

  
*/
