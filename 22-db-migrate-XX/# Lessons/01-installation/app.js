/*
  db-migrate
  - Database migration framework for node.js
    + https://db-migrate.readthedocs.io/en/latest/

  - Official Supported Databases
      Mysql (https://github.com/felixge/node-mysql) - npm i db-migrate-mysql
      PostgreSQL (https://github.com/brianc/node-postgres) - npm i db-migrate-pg
      sqlite3 (https://github.com/developmentseed/node-sqlite3) - npm i db-migrate-sqlite3
      Mongodb (https://github.com/mongodb/node-mongodb-native) - npm i db-migrate-mongodb
      CockroachDB (https://github.com/db-migrate/cockroachdb) - npm i db-migrate-cockroachdb


**************************

  Installation
  - package: 
      @@ npm install db-migrate

  - To use db-migrate you can now use:
      @@ db-migrate
      @@ node node_modules/db-migrate/bin/db-migrate

**************************

  Basic Usage
  - Usage: db-migrate [up|down|reset|create|db] [[dbname/]migrationName|all] [options]
  - Down migrations are run in reverse run order, so migrationName is ignored for down migrations.
  - Use the --count option to control how many down migrations are run (default is 1).

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


**************************

  Configuration
  - db-migrate supports the concept of environments. For example, you might have a dev, test, and prod environment where you need to run the migrations at different times. Environment settings are loaded from a database.json file 

  - You can also specify environment variables in your config file by using a special notation. Here is an example:
      {
        "prod": {
          "driver": "mysql",
          "user": {"ENV": "PRODUCTION_USERNAME"},
          "password": {"ENV": "PRODUCTION_PASSWORD"}
        },
      }  

  - In this case, db-migrate will search your environment for variables called PRODUCTION_USERNAME and PRODUCTION_PASSWORD, and use those values for the corresponding configuration entry.

  - If you use the dotenv package to manage environment variables, db-migrate will automatically load it.
  - Note that if the settings for an environment are represented by a single string that string will be parsed as a database URL.

  - You can pass the -e or --env option to db-migrate to select the environment you want to run migrations against. The --config option can be used to specify the path to your database.json file if it's not in the current working directory.

    @@ db-migrate up --config config/database.json -e prod

  - The above will run all migrations that haven't yet been run in the prod environment, grabbing the settings from config/database.json.
  - If the environment is not specified by the -e or --env option, db-migrate will look for an environment named dev or development. You can change this default behavior with the database.json file:
      {
        "defaultEnv": "local",
        "local": {
          "driver": "sqlite3",
          "filename": ":memory:"
        }
      }

  - In addition, the default env can also be set with an environment variable. This can be helpful if you'd like to use the NODE_ENV variable to select configuration:
      {
        "defaultEnv": {"ENV": "NODE_ENV"},
        "prod": {
          "driver": "mysql",
          "user": {"ENV": "PRODUCTION_USERNAME"},
          "password": {"ENV": "PRODUCTION_PASSWORD"}
        },
      }


**************************

  DATABASE_URL
  - Alternatively, you can specify a DATABASE_URL environment variable that will be used in place of the configuration file settings. This is helpful for use with Heroku.
  - Note: If a database url is specified, the config file is being skipped. You can however also specify rc configs, where you can configure everything you can configure also on the CLI.


**************************

  RC configs
  - RC configs give the possibility to configure settings for more than just one project, as RC configs are being loaded from different directories.
  - You can take a view over here where to save those configs.

  - Most prominent locations are, the root directory where you currently execute db-migrate and your HOME directory. The file is always named .db-migraterc, except for some examples you can find under the link above.
  - An example .db-migraterc config file could look like this:
      {
        "sql-file": true,
        "configFile": "path/to/config/database.json",
        "table": "new_migration_table_name"
      }
    
  - Use table property in .db-migraterc config file to change the default name of migrations table.
  - This would set activate the sql mode unless you would deactivate it in your database.json again, which always has the highest priority.
  - The configFile is a special rc config variable, because config is reserved by the rc module.


**************************

  Important - For MySQL users
  - If you use MySQL, to be able to use multiple statements in your sql file, you have to set the property multipleStatements: true when creating the connection object. You can set it in your database.json as follows:
      {
        "dev": {
          "host": "localhost",
          "user": { "ENV" : "DB_USER" },
          "password" : { "ENV" : "DB_PASS" },
          "database": "database-name",
          "driver": "mysql",
          "multipleStatements": true
        }
      }






*/
