Sequelize CLI [Node: 10.21.0, CLI: 6.0.0, ORM: 6.1.0]

sequelize <command>

Commands:
  sequelize db:migrate                        Run pending migrations
  sequelize db:migrate:schema:timestamps:add  Update migration table to have timestamps
  sequelize db:migrate:status                 List the status of all migrations
  sequelize db:migrate:undo                   Reverts a migration
  sequelize db:migrate:undo:all               Revert all migrations ran
  sequelize db:seed                           Run specified seeder
  sequelize db:seed:undo                      Deletes data from the database
  sequelize db:seed:all                       Run every seeder
  sequelize db:seed:undo:all                  Deletes data from the database
  sequelize db:create                         Create database specified by configuration
  sequelize db:drop                           Drop database specified by configuration
  sequelize init                              Initializes project
  sequelize init:config                       Initializes configuration
  sequelize init:migrations                   Initializes migrations
  sequelize init:models                       Initializes models
  sequelize init:seeders                      Initializes seeders
  sequelize migration:generate                Generates a new migration file      [aliases: migration:create]
  sequelize model:generate                    Generates a model and its migration [aliases: model:create]
  sequelize seed:generate                     Generates a new seed file           [aliases: seed:create]

Options:
  --version  Show version number                                                  [boolean]
  --help     Show help                                                            [boolean]


///////
TO CREATE A TABLE
...
 npx sequelize model:create --name <tableName> --attributes col1:<datatype>,col2:<datatype>
...
 also after we do this creating sequelize command we doesnot get the actual table
 in the models folder a <table_name>.js file get created and in it we have all the description of the 
 coloumns we give 

 but in migrations folder it stores all the info about the table with a code of that table created
 where if any changes made led to change in final table
 TO finally create a TABLE
 ...
 npx sequelize db:migrate 
 ...
 this commannd creates the changes to our table so before this we need to do changes required

by command -> npx sequelize db:migrate:undo 
we can undo the last migrate we did

so the Migration folder deals with the DATABASE 
but  the models folder have all the info about tables that is for the javascript work... 

