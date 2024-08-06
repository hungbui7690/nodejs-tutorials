/*
  One-to-many
  - In the previous example, the author relation field of the Post model references the id field of the User model. 
  - You can also reference a different field. In this case, you need to mark the field with the @unique attribute, to guarantee that there is only a single User connected to each Post. 
  
  - In the following example, the author field references an email field in the User model, which is marked with the @unique attribute:


*/
