/*
  Optional one-to-many relation
  - In the following example, you can create a Post without assigning a User:

    model User {
      id    Int    @id @default(autoincrement())
      posts Post[]
    }

    model Post {
      id       Int   @id @default(autoincrement())
      author   User? @relation(fields: [authorId], references: [id])
      authorId Int?
    }


*************************

  Mandatory one-to-many relation
  - In the following example, you must assign a User when you create a Post:

    model User {
      id    Int    @id @default(autoincrement())
      posts Post[]
    }

    model Post {
      id       Int  @id @default(autoincrement())
      author   User @relation(fields: [authorId], references: [id])
      authorId Int
    }




*/
