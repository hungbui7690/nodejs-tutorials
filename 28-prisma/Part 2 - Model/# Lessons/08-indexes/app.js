/*
  Define Index
  - You can define indexes on one or multiple fields of your models via the @@index on a model. The following example defines a multi-column index based on the title and content field


****************************

  - MongoDB -> Composite Indexes
      type City {
        name String
      }

      type Address {
        number Int
        city   City
      }

      model User {
        id      Int       @id
        address Address[]

        @@index([address.city.name])
      }


*/
