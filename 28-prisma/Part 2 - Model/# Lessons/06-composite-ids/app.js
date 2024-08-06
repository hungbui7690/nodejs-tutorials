/*
  Composite IDs
  - In the following example, the User ID is represented by a combination of the firstName and lastName fields:
    -> @@id([firstName, lastName])
    -> By default, the name of this field in Prisma Client queries will be firstName_lastName.

  - You can also provide your own name for the composite ID using the @@id attribute's name field:
    -> @@id(name: "fullName", fields: [firstName, lastName])
    -> The firstName_lastName field will now be named fullName instead.



*/
