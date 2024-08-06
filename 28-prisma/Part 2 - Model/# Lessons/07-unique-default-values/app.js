/*
  @unique fields as unique identifiers
  - In the following example, users are uniquely identified by a @unique field. Because the email field functions as a unique identifier for the model (which is required), it must be mandatory:


****************************

  Defining a default value
  - You can define default values for scalar fields of your models using the @default attribute

  - @default attributes either:
    + Represent DEFAULT values in the underlying database (relational databases only) or
    + Use a Prisma ORM-level function. For example, cuid() and uuid() are provided by Prisma Client's query engine for all connectors.

  - Default values can be:
    + Static values that correspond to the field type, such as 5 (Int), Hello (String), or false (Boolean)
    + Lists of static values, such as [5, 6, 8] (Int[]) or ["Hello", "Goodbye"] (String[]). These are available in Prisma ORM versions 4.0.0 and later, when using supported databases (PostgreSQL, CockroachDB and MongoDB)
    + , such as now() or uuid()
    + JSON data. Note that JSON needs to be enclosed with double-quotes inside the @default attribute, e.g.: @default("[]"). If you want to provide a JSON object, you need to enclose it with double-quotes and then escape any internal double quotes using a backslash, e.g.: @default("{ \"hello\": \"world\" }").


  - Multiple unique values
    -> @@unique([authorId, title])
    -> Prisma Client queries: authorId_title


  - To change the name: 
    -> @@unique(name: "authorTitle", [authorId, title])

*/
