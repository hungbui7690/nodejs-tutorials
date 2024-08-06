/*
  MySQL/MariaDB

    datasource db {
      provider = "mysql"
      url      = env("DATABASE_URL")
    }


*************************

  Connection String
  - DATABASE_URL=mysql://<username>:<password>@<host>:<port>/<database>


*************************

    ~~ npx prisma generate


*************************

  Permissions
  - A fresh new installation of MySQL/MariaDB has by default only a root database user. Do not use root user in your Prisma configuration, but instead create a database and database user for each application. On most Linux hosts (e.g. Ubuntu) you can simply run this as the Linux root user (which automatically has database root access as well):

      mysql -e "CREATE DATABASE IF NOT EXISTS $DB_PRISMA;"
      mysql -e "GRANT ALL PRIVILEGES ON $DB_PRISMA.* TO $DB_USER@'%' IDENTIFIED BY '$DB_PASSWORD';"

  - The above is enough to run the prisma db pull and prisma db push commands. In order to also run prisma migrate commands these permissions need to be granted:

      mysql -e "GRANT CREATE, DROP, REFERENCES, ALTER ON *.* TO $DB_USER@'%';"


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
