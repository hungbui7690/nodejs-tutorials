/*
  Querying an explicit many-to-many
  - The following section demonstrates how to query an explicit m-n-relation. You can query the relation model directly (prisma.categoriesOnPosts(...)), or use nested queries to go from Post -> CategoriesOnPosts -> Category or the other way.


*/

// The following query does three things:
// 1. Creates a Post
// 2. Creates a new record in the relation table CategoriesOnPosts
// 3. Creates a new Category that is associated with the newly created Post record
const createCategory = await prisma.post.create({
  data: {
    title: 'How to be Bob',
    categories: {
      create: [
        {
          assignedBy: 'Bob',
          assignedAt: new Date(),
          category: {
            create: {
              name: 'New category',
            },
          },
        },
      ],
    },
  },
})

// The following query:
// 1. Creates a new Post
// 2. Creates a new record in the relation table CategoriesOnPosts
// 3. Connects the category assignment to existing categories (with IDs 9 and 22)
const assignCategories = await prisma.post.create({
  data: {
    title: 'How to be Bob',
    categories: {
      create: [
        {
          assignedBy: 'Bob',
          assignedAt: new Date(),
          category: {
            connect: {
              id: 9,
            },
          },
        },
        {
          assignedBy: 'Bob',
          assignedAt: new Date(),
          category: {
            connect: {
              id: 22,
            },
          },
        },
      ],
    },
  },
})

// Sometimes you might not know if a Category record exists. If the Category record exists, you want to connect a new Post record to that category. If the Category record does not exist, you want to create the record first and then connect it to the new Post record. The following query:
// 1. Creates a new Post
// 2. Creates a new record in the relation table CategoriesOnPosts
// 3. Connects the category assignment to an existing category (with ID 9), or creates a new category first if it does not exist
const assignCategoriesX = await prisma.post.create({
  data: {
    title: 'How to be Bob',
    categories: {
      create: [
        {
          assignedBy: 'Bob',
          assignedAt: new Date(),
          category: {
            connectOrCreate: {
              where: {
                id: 9,
              },
              create: {
                name: 'New Category',
                id: 9,
              },
            },
          },
        },
      ],
    },
  },
})

// The following query returns all Post records where at least one (some) category assignment (categories) refers to a category named "New category":
const getPosts = await prisma.post.findMany({
  where: {
    categories: {
      some: {
        category: {
          name: 'New Category',
        },
      },
    },
  },
})

// The following query returns all categories where at least one (some) related Post record titles contain the words "Cool stuff" and the category was assigned by Bob.
const getAssignments = await prisma.category.findMany({
  where: {
    posts: {
      some: {
        assignedBy: 'Bob',
        post: {
          title: {
            contains: 'Cool stuff',
          },
        },
      },
    },
  },
})

// The following query gets all category assignments (CategoriesOnPosts) records that were assigned by "Bob" to one of 5 posts:
const getAssignmentsX = await prisma.categoriesOnPosts.findMany({
  where: {
    assignedBy: 'Bob',
    post: {
      id: {
        in: [9, 4, 10, 12, 22],
      },
    },
  },
})
