/*
  Relation fields
  - A relation field's type is another model - for example, a post (Post) can have multiple comments (Comment[])


***************************

  Type Attributes
  - Type attributes are:
    + Specific to the underlying provider - for example, PostgreSQL uses @db.Boolean for Boolean whereas MySQL uses @db.TinyInt(1)
    + Written in PascalCase (for example, VarChar or Text)
    + Prefixed by @db, where db is the name of the datasource block in your schema

  - For example, a String can be @db.VarChar(200) or @db.Char(50)
    -> @db.VarChar(200)


****************************

  Type modifiers
  - The type of a field can be modified by appending either of two modifiers:
    + [] Make a field a list
    + ? Make a field optional
  
  - Note: You cannot combine type modifiers - optional lists are not supported.


*/
