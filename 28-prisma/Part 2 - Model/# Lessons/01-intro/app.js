/*
  Models - Intro
  - Represent the entities of your application domain
  - Map to the tables (relational databases like PostgreSQL) or collections (MongoDB) in your database
  - Form the foundation of the queries available in the generated Prisma Client API
  - When used with TypeScript, Prisma Client provides generated type definitions for your models and any variations of them to make database access entirely type safe.


**************************

  1. Create Model in schema.prisma

  - The data model definition is made up of:
      + Models (model primitives) that define a number of fields, including relations between models
      + Enums (enum primitives) (if your connector supports Enums)
      + Attributes and functions that change the behavior of fields and models

  - The corresponding database looks like this: pic


  2. The following query uses Prisma Client that's generated from this data model to create:
      + A User record
      + Two nested Post records
      + Three nested Category records


**************************

  - Your data model reflects your application domain. For example:
      + In an ecommerce application you probably have models like Customer, Order, Item and Invoice.
      + In a social media application you probably have models like User, Post, Photo and Message.


**************************

  Introspection and migration
  - There are two ways to define a data model:
    + Write the data model manually and use Prisma Migrate: You can write your data model manually and map it to your database using Prisma Migrate. In this case, the data model is the single source of truth for the models of your application.
    + Generate the data model via introspection: When you have an existing database or prefer migrating your database schema with SQL, you generate the data model by introspecting your database. In this case, the database schema is the single source of truth for the models of your application.


*/

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({})

// A `main` function so that you can use async/await
async function main() {
  // Create user, posts, and categories
  const user = await prisma.user.create({
    data: {
      email: 'ariadne@prisma.io',
      name: 'Ariadne',
      posts: {
        create: [
          {
            title: 'My first day at Prisma',
            categories: {
              create: {
                name: 'Office',
              },
            },
          },
          {
            title: 'How to connect to a SQLite database',
            categories: {
              create: [{ name: 'Databases' }, { name: 'Tutorials' }],
            },
          },
        ],
      },
    },
  })

  // Return user, and posts, and categories
  const returnUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    include: {
      posts: {
        include: {
          categories: true,
        },
      },
    },
  })

  console.log(returnUser)
}

main()
