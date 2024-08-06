/*
  Implicit many-to-many relations
  - Implicit m-n relations define relation fields as lists on both sides of the relation. Although the relation table exists in the underlying database, it is managed by Prisma ORM and does not manifest in the Prisma schema. Implicit relation tables follow a specific convention.

  - Implicit m-n-relations makes the Prisma Client API for m-n-relations a bit simpler (since you have one fewer level of nesting inside of nested writes).

  - In the example below, there's one implicit m-n-relation between Post and Category


****************************

  Rules for defining an implicit m-n relation
  - Implicit m-n relations:
    + Use a specific convention for relation tables
    + Do not require the @relation attribute unless you need to disambiguate relations with a name, e.g. @relation("MyRelation") or @relation(name: "MyRelation").
    + If you do use the @relation attribute, you cannot use the references, fields, onUpdate or onDelete arguments. This is because these take a fixed value for implicit m-n-relations and cannot be changed.
    + Require both models to have a single @id. Be aware that:
      # You cannot use a multi-field ID
      # You cannot use a @unique in place of an @id


****************************

  Querying an implicit many-to-many
  - The following section demonstrates how to query an implicit m-n relation. The queries require less nesting than explicit m-n queries.


*/

// The following query creates a single Post and multiple Category records:
const createPostAndCategory = await prisma.post.create({
  data: {
    title: 'How to become a butterfly',
    categories: {
      create: [{ name: 'Magic' }, { name: 'Butterflies' }],
    },
  },
})

// The following query creates a single Category and multiple Post records:
const createCategoryAndPosts = await prisma.category.create({
  data: {
    name: 'Stories',
    posts: {
      create: [
        { title: 'That one time with the stuff' },
        { title: 'The story of planet Earth' },
      ],
    },
  },
})

// The following query returns all Post records with a list of that post's assigned categories:
const getPostsAndCategories = await prisma.post.findMany({
  include: {
    categories: true,
  },
})
