# Kanban board

## Description
A Kanban board is a work and workflow visualization tool that enables you to optimize the flow of your work.
## Table of Contents

* [Instructions](#instructions)
* [Dependencies](#dependencies)

## Demo
https://kanban-auth.herokuapp.com/

## Instructions
First you have to log in or sign up to Kanban app. You can use credentials below or create new account and create your own new board.
```bash
email: example@mail.com
password: example123
```
Now you can play with an app. You can do:
* Create new board /create-board page
* Edit exisiting board on /edit-board page
* Add new lanes
* Add new notes
* Edit lanes
* Edit notes
* Drag and drop notes between lanes
* Deleting lanes
* Deleting notes
* Add users
* Remove users

## Dependencies
To run dev or production version you need browser with enabled JavaScript.

## Build setup
Client was developed using:
* CRA
* React
* Redux
* ES6
* Recharts (http://www.recharts.org)
* SASS (original syntax)
* HTML5

Server was developed using:
* Gulp
* Node
* Express
* Mongoose
* MongoDB
* bcrypt (https://www.npmjs.com/package/bcrypt)
```bash
# To install dev-dependencies, just go to the root folder and run
npm i

# To build production version run
client: cd client && npm run build
server: cd server && gulp

# To run dev version run
npm start
```
