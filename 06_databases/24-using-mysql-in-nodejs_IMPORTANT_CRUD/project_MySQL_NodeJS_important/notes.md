1. **Plan and design our database & tables**: we will have 2 tables, one for the posts and one for the authors; the post table will have the authorId foreign key that links the post table to the authors table

2. **Create database and tables via MySQL workbench** (Lecture 426): go to the Schemas tab and start creating a database (= schema) and the relative tables there. Create a new schema named "blog". Create new tables inside the blog database. The first table is the "authors" table. Follow the video (lecture 426) and click Apply. Create the second table, "posts". For the date variable of the table, in the MySQL Workbench column "Default/Expression" insert CURRENT_TIMESTAMP (this will automatically return and save a date without the user inserting it manually)

3. **Add initial data to dabatase tables via MySQL workbench**.
```
INSERT INTO blog.authors (name, email)
VALUES ("Elisa Battistoni", "eli.battistoni@gmail.com")
```
Run query and add other data points (authors)
To verify that you added data, run the query:
```
SELECT * FROM blog.authors
```

4. **Connect to database & interact via NodeJS / Express app**: write NodeJS Express code to connect the database and query that database from inside NodeJS.
Install the package "Node MySQL 2" with npm: **npm install --save mysql2**

NB the database was not configured so you will not run really this project. It is more just comments and explanations.