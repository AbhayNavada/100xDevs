/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(bodyParser.json());

//Get list of all todos
app.get('/todos', (req, res) => {
	fs.readFile("./files/a.txt", "utf-8", (err, data) => {
		if (err) throw err;
		data = JSON.parse(data);
		data.shift(); // To remove the object with nextAutoGenId
		res.status(200).send(data);
	});
});

//Get todo, given an ID
app.get('/todos/:id', (req, res) => {

    let id = req.params.id;

	fs.readFile("./files/a.txt", "utf-8", (err, data) => {
		if (err) throw err;
		data = JSON.parse(data);
		data.shift();
		let todo = data.filter((todo) => {
			if (todo.id == id) {
			  return todo;
			}
	  	});
		  if (todo.length > 0) {
			res.status(200).json(todo[0]);
		} else {
			res.status(404).send(`Todo with ID ${id} does not exist.`);
		}
	})
})

// Add a todo to the list
app.post('/todos', (req, res) => {

	fs.readFile("./files/a.txt", "utf-8", (err, data) =>  {
		if (err) throw err;

		data = JSON.parse(data);
		let firstObj = data.shift();
		let nextAutoGenId = firstObj.nextAutoGenId;
		
		let todo = {
			id: nextAutoGenId,
			title: req.body.title,
			description: req.body.description
		}

		data.push(todo);
		data.unshift({
			"nextAutoGenId": JSON.stringify(++nextAutoGenId)
		});

		fs.writeFile("./files/a.txt", JSON.stringify(data), (err) => {
			if (err) throw err;
			res.status(201).json({id: todo.id});
		})
	});
});

//Update a todo, given an ID
app.put('/todos/:id', (req, res) => {
	let todoId = req.params.id;
	let todoTitle = req.body.title;
	let todoDesc = req.body.description;
	let isUpdated = false;

	fs.readFile("./files/a.txt", "utf-8", (err, data) => {
		if (err) throw err;

		todos = JSON.parse(data);

		for (let i = 1; i < todos.length; i++) {
			if (todos[i].id == todoId) {
				todos[i] = {
					id: todoId,
					title: todoTitle,
					description: todoDesc
				};

				fs.writeFile("./files/a.txt", JSON.stringify(todos), (err) => {
					if (err) throw err;
				});

				isUpdated = true;
				break;
			}
		}
		if (isUpdated == true) {
			res.status(200).send(`Todo item with ID ${todoId} was found and updated.`)
		} else {
			res.status(404).send(`Todo item with ID ${todoId} does not exist.`)
		}
	});
});

//Delete a todo, given an ID
app.delete('/todos/:id', (req, res) => {
	let todoId = req.params.id;
	let isDeleted = false;

	fs.readFile("./files/a.txt", "utf-8", (err, data) => {
		if (err) throw err;
		let todos = JSON.parse(data);

		for (let i = 1; i < todos.length; i++) {
			if (todos[i].id == todoId) {
				todos.splice(i, 1);

				fs.writeFile("./files/a.txt", JSON.stringify(todos), (err) => {
					if (err) throw err;
				});

				isDeleted = true;
				break;
			}
		}
	
		if (isDeleted == true) {
			res.status(200).send(`Todo item with ID ${todoId} has been deleted.`);
		} else {
			res.status(404).send(`Todo with ID ${todoId} was not found.`);
		}
	});
});

app.listen(3001);
module.exports = app;