/*
  Usage of db-migrate
  - To use db-migrate, you call it via the command line. When entering only the command without paramaters you will see something like this:

    + Usage: db-migrate [up|down|reset|create|db] [[dbname/]migrationName|all] [options]

    + Down migrations are run in reverse run order, so migrationName is ignored for down migrations.
Use the --count option to control how many down migrations are run (default is 1).

      Options:
        --env, -e                   The environment to run the migrations under.    [default: "dev"]
        --migrations-dir, -m        The directory containing your migration files.  [default: "./migrations"]
        --count, -c                 Max number of migrations to run.
        --dry-run                   Prints the SQL but doesn't run it.              [boolean]
        --verbose, -v               Verbose mode.                                   [default: false]
        --config                    Location of the database.json file.             [default: "./database.json"]
        --force-exit                Call system.exit() after migration run          [default: false]
        --sql-file                  Create sql files for up and down.               [default: false]
        --coffee-file               Create a coffeescript migration file            [default: false]
        --migration-table           Set the name of the migration table.
        --table, --migration-table                                                  [default: "migrations"]


*************************

  Creating Migrations
  - To create a migration, execute <db-migrate> create with a title. <node-db-migrate> will create a node module within <./migrations> which contains the following two exports:

      exports.up = function (db, callback) {
        callback();
      }
      exports.down = function (db, callback) {
          callback();
      }

  - Note: In newer versions of db-migrate, we have included a promise-based interface. In these newer versions, the create command will generate a file containing the following:

      exports.up = function(db) {
          return null;
      }
      exports.down = function(db) {
          return null;
      }

  - All you have to do is populate these, invoking callback() or returning the result of your db operation when complete, and you are ready to migrate!
  - For example:

      @@ $ db-migrate create add-pets
      @@ $ db-migrate create add-owners

  - The first call creates ./migrations/20111219120000-add-pets.js, which we can populate:
      exports.up = function (db, callback) {
        db.createTable('pets', {
          id: { type: 'int', primaryKey: true },
          name: 'string'
        }, callback);
      }
      exports.down = function (db, callback) {
        db.dropTable('pets', callback);
      }

      exports.up = function (db) {
        return db.createTable('pets', {
          id: { type: 'int', primaryKey: true },
          name: 'string'
        })
      }
      exports.down = function (db) {
        return db.dropTable('pets')
      }

  - The second creates ./migrations/20111219120005-add-owners.js, which we can populate:
      exports.up = function (db, callback) {
        db.createTable('owners', {
          id: { type: 'int', primaryKey: true },
          name: 'string'
        }, callback);
      }
      exports.down = function (db, callback) {
        db.dropTable('owners', callback);
      }

      exports.up = function (db) {
        return db.createTable('owners', {
          id: { type: 'int', primaryKey: true },
          name: 'string'
        })
      }
      exports.down = function (db) {
        return db.dropTable('owners')
      }




*/
