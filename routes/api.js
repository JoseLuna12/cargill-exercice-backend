const express = require('express');
const farmController = require('../controller/farm.controller')
const pondController = require('../controller/pond.controller')
const app = express();

//Farm API
app.post('/addFarm', farmController.checkFarmName, farmController.createFarm);            // Create a New Farm
app.get('/farmSize/:id', farmController.getFarmSize);       // Get the total size of a Farm by id
app.get('/getFarms', farmController.getAllFarms);           // Get all the farms
app.get('/getFarm/:id', farmController.getOneFarm);         // Get one farm by id
app.delete('/deleteFarm/:id', farmController.removeFarm);   // Delete one farm by id
app.put('/updateFarm/:id', farmController.updateFarm);      // Update a farm by id
//End farm API

//Pond API
app.post('/addPond/:id', pondController.createPond);        // Create a new Pond inside a Farm by the Farm's id
app.get('/getPonds/:id', pondController.getPonds);          // Get all Ponds inside a Farm by the Farm's id
app.get('/getPond/:id', pondController.getOnePond);         // Get one pond by id
app.get('/feedPond/:id', pondController.feedShrimp);        // Update the time where the shrimps in each Pond where feeded 
app.delete('/deletePond/:id', pondController.deletePond);   // Delete one pond by id
app.put('/updatePond/:id', pondController.updatePond);      // Update a Pond by his id
//End Pond API
module.exports = app;