const express = require('express');
const Animal = require('../models/animalModel');  
const { getAnimals,getAnimal,createAnimal,updateAnimal,deleteAnimal,searchAnimalByName,searchAnimalByType } = require('../controllers/animalController'); 

const router = express.Router();

// Create an Animal 
router.post('/',createAnimal );

// Get All Animals
router.get('/', getAnimals);

// Get a Single Animal by ID
router.get('/:id', getAnimal);

// Update an Animal
router.put('/:id', updateAnimal);

// Delete an Animal
router.delete('/:id', deleteAnimal);

// Add Search Functionality
router.get('/search/:name', searchAnimalByName);

// Route to search animals by type
router.get('/searchType/:type', searchAnimalByType);


module.exports = router;
