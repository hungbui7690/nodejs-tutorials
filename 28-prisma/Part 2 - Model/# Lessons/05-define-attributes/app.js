/*
  Defining attributes
  - Attributes modify the behavior of fields or model blocks. The following example includes three field attributes (@id , @default , and @unique ) and one block attribute (@@unique)

  - Some attributes accept arguments - for example, @default accepts true or false:
    -> isAdmin   Boolean @default(false) // short form of @default(value: false)


*****************************

  Defining an ID field
  - An ID uniquely identifies individual records of a model. A model can only have one ID:

  - In relational databases, the ID can be a single field or based on multiple fields. If a model does not have an @id or an @@id, you must define a mandatory @unique field or @@unique block instead.
  - In MongoDB, an ID must be a single field that defines an @id attribute and a @map("_id") attribute.

*/
