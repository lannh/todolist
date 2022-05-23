const express = require("express");
const cors = require("cors");

const userServices = require("./models/user-services");

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

//root
app.get("/", (req, res) => 
{
	res.send("Hello World!");
});

//get user by name or name && job
app.get("/users", async (req, res) => 
{
	const taskName = req.query.taskName;
	const date = req.query.date;
	const location = req.query.location;

	try 
	{
		const result = await userServices.getUsers(taskName, date,location);
		res.send({tasks_list: result});         
	}
	catch (error) 
	{
		console.log(error);
		res.status(500).send("An error ocurred in the server.");
	}
});


//get user by id
app.get("/users/:id", async (req, res) => 
{
	const id = req.params["id"]; //or req.params.id
	let result = await userServices.findUserById(id);

	if(result === undefined || result.length === 0)
		res.status(404).send("Resource not found.");
	else
	{
		result = {tasks_list: result};
		res.send(result);
	}
});

//add new user 
app.post("/users", async (req, res) => 
{
	const userToAdd = req.body;

	console.log(userToAdd);
	const savedUser = await userServices.addUser(userToAdd);
	if (savedUser)
		res.status(201).send(savedUser);
	else
		res.status(500).end();
});

//delete user by id
app.delete("/users/:id", async (req, res) => 
{
	const idToDel = req.params.id;
	let userToDel = await userServices.deleleUserByID(idToDel);

	if(userToDel === undefined)
		res.status(404).send("resource not found").end();
	else
		res.status(204).end();
});


app.listen(process.env.PORT || port, () => 
{
	if (process.env.PORT) 
	{
		console.log(`REST API is listening on port: ${process.env.PORT}.`);
	}
	else console.log(`REST API is listening on port: ${port}.`);
});