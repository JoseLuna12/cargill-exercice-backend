## Project information
The project was built on NodeJs, Express and MongoDB

### Commands
- `npm install` to setup the project
- `npm run test` to test the REST API
- `npm run start` to start the server

## Backend
All the http requests are made to the link: `http://localhost:8000/api`, port `8000`, this can be changed in the `server.js` file ( the front end will also need to be updated to the new endpoint ).

### Setup for the Backend
- Download the project
- Install MongoDB locally or setup a live version
- Run `npm install` to install dependencies
- Connect to a MongoDb database locally or online
    - Open the `app.js` file and replace the url inside de `mongoose.connect(<url>)` function
    - Database name `"cargill_shrimp"`
    - Collection name `"farms"` is used to store all Farms data
    - Collection name `"ponds"` is used to store all Ponds data

## Project structure
- server.js -> here you can change the port for the server
- app.js -> here you can set the new MongoDb Connection or edit the main API route
- test -> in this folder is the jest test for the API
- routes -> In this folder you can find every route of the API
- models -> In this folder you can find the main Database Model for Farms and Ponds
- controller
    - farm.controller.js -> here are all the functionalities for Read, Write, Update or Delete in the Farm collection
    - pond.controller.js -> here are all the functionalities for Read, Write, Update or delete in the Ponds collection


## Functionalities
- Farm API
    - Get the total size of a Farm
    - Create a Farm
    - Get all Farms
    - Get one Farm
    - Edit one Farm
    - Erase a Farm
- Pond API
    - Create a Pond inside a Farm
    - Get Every Pond in a single Farm
    - Get one Pond
    - Edit a Pond
    - Erase a Pond
    - Save the last time where the shrimps in a Pond where feeded

### Notes
Replace the id in the test's urls with a actual database id
