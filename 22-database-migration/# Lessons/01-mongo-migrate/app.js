/*
  MongoDB
  ~~ npm install -g migrate-mongo
    + init
    + create
    + up
    + down
    + status


****************************

  1. init:
    @@ migrate-mongo init
    -> this will create config file

  2. config: 
      -> databaseName: 'testing'
  
    - alternatively, we can setup everything in URL -> and leave out the <databaseName> empty
      -> url: "mongodb://localhost:27017/testing"


****************************

  Creating a new migration script
  - To create a new database migration script, just run the migrate-mongo create [description] command.

    3. migrate-mongo create blacklist_the_beatles
      -> it will create migrations/ that has up and down functions

    - There are 3 options to implement the up and down functions of your migration:

        Return a Promises
        Use async-await
        Call a callback (DEPRECATED!)

    - Always make sure the implementation matches the function signature:

        function up(db, client) {} 
        -> should return Promise
        async function up(db, client) {} 
        -> should contain await keyword(s) and return Promise
        -> Async & await is especially useful if you want to perform multiple operations against your MongoDB in one migration.


****************************

  Status
  - At any time, you can check which migrations are applied (or not)

    4. migrate-mongo status

        ┌────────────────┬────────────┐
        │ Filename       │ Applied At │
        ├────────────────┼────────────┤
        │ async-await.js │ PENDING    │
        ├────────────────┼────────────┤
        │ promise.js     │ PENDING    │
        └────────────────┴────────────┘


****************************

  Migrate Up
  - This command will apply all pending migrations

    5. migrate-mongo up


    -> migrate-mongo status
    -> open mongoDB Compass and check


****************************

  Migrate Down
  - With this command, migrate-mongo will revert (only) the last applied migration

    6. migrate-mongo down


****************************

  Transaction
  - You can make use of the MongoDB Transaction API in your migration scripts.
    -> migrations/transaction.js


****************************
  
  Atlas
  - the way we migrate to atlas is different

  1. export data from local mongodb
    -> mongoexport --db=<DATABASE_NAME> --collection=<COLLECTION_NAME> --out=<FILENAME>.json
    -> mongoexport --db=citiesDB --collection=cities --out=cities.json

  2. import data to atlas
    -> mongoimport --uri mongodb+srv://<USERNAME>:<PASSWORD>@<CLUSTER_HOST_NAME>/<DATABASE> --collection <COLLECTION> --type <FILETYPE> --file <FILENAME>
    -> mongoimport --uri mongodb+srv://hungbui7690:Pass123@cluster0.cebcs.mongodb.net/citiesDB --collection cities --type json --file cities.json 


  *** These commands has to be exec in normal command-line tool -> not in mongo-shell
  *** These tools are not in mongo-shell -> download separately


*/
