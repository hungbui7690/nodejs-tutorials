/*
  Lists
  - The following example includes a scalar list and a list of related models
  - Note: Scalar lists are only supported if the database connector supports scalar lists, either natively or at a Prisma ORM level.


***************************

  Optional and mandatory fields
  - When not annotating a field with the ? type modifier, the field will be required on every record of the model. This has effects on two levels:

      Databases
      + Relational databases: Required fields are represented via NOT NULL constraints in the underlying database.
      + MongoDB: Required fields are not a concept on a MongoDB database level.

      Prisma Client: Prisma Client's generated TypeScript types that represent the models in your application code will also define these fields as required to ensure they always carry values at runtime.

  - Note: The default value of an optional field is null.


***************************

  Unsupported types
  - When you introspect a relational database, unsupported data types are added as Unsupported 

      location    Unsupported("POLYGON")?


*/
