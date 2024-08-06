/*
  Mandatory 1-1 relation
  - In the following example, profile and profileId are mandatory. This means that you cannot create a User without connecting or creating a Profile:

    model User {
      id        Int     @id @default(autoincrement())
      profile   Profile @relation(fields: [profileId], references: [id]) // references `id` of `Profile`
      profileId Int     @unique // relation scalar field (used in the `@relation` attribute above)
    }

    model Profile {
      id   Int   @id @default(autoincrement())
      user User?
    }


******************************

  Optional 1-1 relation
  - In the following example, profile and profileId are optional. This means that you can create a user without connecting or creating a Profile:

    model User {
      id        Int      @id @default(autoincrement())
      profile   Profile? @relation(fields: [profileId], references: [id]) // references `id` of `Profile`
      profileId Int?     @unique // relation scalar field (used in the `@relation` attribute above)
    }

    model Profile {
      id   Int   @id @default(autoincrement())
      user User?
    }


******************************

  Choosing which side should store the foreign key in a 1-1 relation
  - In 1-1 relations, you can decide yourself which side of the relation you want to annotate with the @relation attribute (and therefore holds the foreign key).
  - In the following example, the relation field on the Profile model is annotated with the @relation attribute. userId is a direct representation of the foreign key in the underlying database:

    model User {
      id      Int      @id @default(autoincrement())
      profile Profile?
    }

    model Profile {
      id     Int  @id @default(autoincrement())
      user   User @relation(fields: [userId], references: [id])
      userId Int  @unique // relation scalar field (used in the `@relation` attribute above)
    }


*******************************

  - You can also annotate the other side of the relation with the @relation attribute. The following example annotates the relation field on the User model. profileId is a direct representation of the foreign key in the underlying database:

    model User {
      id        Int      @id @default(autoincrement())
      profile   Profile? @relation(fields: [profileId], references: [id])
      profileId Int?     @unique // relation scalar field (used in the `@relation` attribute above)
    }

    model Profile {
      id   Int   @id @default(autoincrement())
      user User?
    }



*/
