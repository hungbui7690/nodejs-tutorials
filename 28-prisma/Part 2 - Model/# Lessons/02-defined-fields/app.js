/*
  Defining fields
  - The properties of a model are called fields, which consist of:
    + A field name
    + A field type
    + Optional type modifiers
    + Optional attributes, including native database type attributes

  - A field's type determines its structure, and fits into one of two categories:
    + Scalar types (includes enums) that map to columns (relational databases) or document fields (MongoDB) in the database - for example, String or Int
    + Model types (the field is then called relation field) - for example Post or Comment[].


********************************

  Scalar fields
  - The following example extends the Comment and Tag models with several scalar types. Some fields include attributes

  1. schema.prisma

*/
