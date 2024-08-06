/*
  One to One 
  - In the previous example, the user relation field of the Profile model references the id field of the User model. You can also reference a different field. In this case, you need to mark the field with the @unique attribute, to guarantee that there is only a single User connected to each Profile. In the following example, the user field references an email field in the User model, which is marked with the @unique attribute:



*/
