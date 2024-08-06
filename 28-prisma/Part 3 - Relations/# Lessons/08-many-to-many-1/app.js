/*
  Many-to-many
  - Many-to-many (m-n) relations refer to relations where zero or more records on one side of the relation can be connected to zero or more records on the other side.


**************************

  Explicit many-to-many relations
  - In an explicit m-n relation, the relation table is represented as a model in the Prisma schema and can be used in queries. Explicit m-n relations define three models:

    + Two models with m-n relation, such as Category and Post.
    + One model that represents the relation table, such as CategoriesOnPosts (also sometimes called JOIN, link or pivot table) in the underlying database. The fields of a relation table model are both annotated relation fields (post and category) with a corresponding relation scalar field (postId and categoryId).

  - The relation table CategoriesOnPosts connects related Post and Category records. In this example, the model representing the relation table also defines additional fields that describe the Post/Category relationship - who assigned the category (assignedBy), and when the category was assigned (assignedAt):

      Post <-> CategoriesOnPosts <-> Category

  - Note that the same rules as for 1-n relations apply (because Post↔ CategoriesOnPosts and Category ↔ CategoriesOnPosts are both in fact 1-n relations), which means one side of the relation needs to be annotated with the @relation attribute.
  - When you don't need to attach additional information to the relation, you can model m-n-relations as implicit m-n-relations. If you're not using Prisma Migrate but obtain your data model from introspection, you can still make use of implicit m-n-relations by following Prisma ORM's conventions for relation tables.


*/
