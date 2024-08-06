/*
  PostgreSQL
  - To connect to a PostgreSQL database server, you need to configure a datasource block in your Prisma schema:

      datasource db {
        provider = "postgresql"
        url      = env("DATABASE_URL")
      }
  

*************************

  - For PostgreSQL, node-postgres is the pg package -> is one of the most popular drivers in the JavaScript ecosystem. It can be used with any PostgreSQL database that's accessed via TCP.


  - Once you have added the feature flag to your schema, re-generate Prisma Client:
    ~~ npx prisma generate

  - Next, install the pg package and Prisma ORM's driver adapter:
      npm install pg
      npm install @types/pg --save-dev
      npm install @prisma/adapter-pg


*************************

  Connection String
  - DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>

  - can have arguments as well: 
    + postgresql://<USER>:<PASSWORD>@<HOST>:<PORT>/<DATABASE>?schema=myschema&connection_limit=5&socket_timeout=3

  -> https://www.prisma.io/docs/orm/overview/databases/postgresql


*/

// Finally, when you instantiate Prisma Client, you need to pass an instance of Prisma ORM's driver adapter to the PrismaClient constructor:
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const connectionString = `${process.env.DATABASE_URL}`
const pool = new Pool({ connectionString })

// Method 1
const adapter = new PrismaPg(pool)

// Method 2: You can specify a PostgreSQL schema by passing in the schema option when instantiating PrismaPg:
const adapterX = new PrismaPg(pool, {
  schema: 'myPostgresSchema',
})

const prisma = new PrismaClient({ adapterX })
