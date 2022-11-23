At this moment, before starting this lecture, we don't fully use the advantages NodeJS offers to us.
For example, we are not talking to a DB.

However, with just NodeJS we have certain limitations, more specifically, we have extra unnecessary work to do.
For example, for every website that we build, we have to create that NodeJS server on our own and define the function for handling requests.

Typically we don't work with just NodeJS in this way: we use a third-party library on top of NodeJS to make our life easier.
This lectures section is about NodeJS development with a third party library called **ExpressJS**.

In this section we will parse user input submitted through a form, and we will store that input in a file that will be stored on the server, which we then in turn can use to generate dynamic HTML pages based on that file content.

# Install ExpressJS

## Installing ExpressJS with npm
**Inside the project folder** open a terminal and run:
**npm init**
**npm install express**

NB: if you delete the folder *node_modules* you can always re-install everything by running **npm install**: If you have to share the project with someone, share it without the node_modules folder, then they will run npm install and they will get it up and running.

IMPORTANT compare the code in the file of app_02.js (in previous lecture and folder) and the code in app.js in this project folder, in which you are using ExpressJS instead of simply NodeJS: the code with ExpressJS is much easier to create and read

Therefore, easier code and more structured!!

## nodemon
// NB whenever you change your NodeJS code, you need to quit your running server (which was started base on the old code) and restart it, otherwise you will not see your latest changes.
In order to avoid this stopping and restarting, we install another package that allows us to run this server in a more convenient way, by automatically watching our code files and restarting the server for us when the code is changed.
**npm install nodemon --save-dev** --save-dev marks the package as a development dependency, which tells NodeJS that it is not actually a dependency (i.e. a package that we use for our final code), but a package that we only use during development because it makes life easier for us developers, it offers suppport.
Now instead of running **node app.js** we can use nodemon: it will start the server as it did before but in addition it will watch the code files (javascript only) inside this project and restart the server whenever we make changes to our code files.
To make it work, you have to change the package.json file in the part of the scripts:
"scripts": {
    "start": "nodemon app.js"
  },
Then in the command line: **npm start**