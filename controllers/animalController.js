const { models } = require('mongoose');
const Animal = require('../models/animalModel');
const asyncHandler = require('express-async-handlr')


//Get all animals
const getAnimals = asyncHandler(async (req, res) => {
    try {
        const animals = await Animal.find();
        res.status(200).json(animals);
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
});

//Get a   single animal
const getAnimal = asyncHandler(async (req, res) => {
    try {
        const animal = await Animal.findById(req.params.id);
        if (!animal) return res.status(404).json({ message: 'Animal not found' });
        res.status(200).json(animal);
    } catch (error) {
        console.log(error.message);
        res.status(500)
        throw new Error(error.message)
    }
})

//Create an animal
const createAnimal = asyncHandler(async (req, res) => {
    try {
        const newAnimal = await Animal.create(req.body);
        res.status(200).json(newAnimal);
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

//Update an animal
const updateAnimal = asyncHandler(async (req, res) => {
    try {
        const {id} = req.params;
        const updatedAnimal = await Animal.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedAnimal) {
            res.status(404)
            throw new Error('Can not found animal with ID ${id}');
        }
        res.status(200).json(updatedAnimal);

    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

//Delete an animal
const deleteAnimal = asyncHandler(async (req, res) => {
    try {
        const {id} = req.params;
        const deletedAnimal = await Animal.findByIdAndDelete(id);
        if (!deletedAnimal) {
            res.status(404)
            throw new Error('Can not found animal with ID ${id}');
        }
        res.status(200).json({ message: 'Animal deleted successfully' });

    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

// Searche an animal by name
const searchAnimalByName = asyncHandler(async (req, res) => {
    try {
        const animals = await Animal.find({ name: { $regex: req.params.name, $options: 'i' } });
        res.status(200).json(animals);
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

// Search animals by type
const searchAnimalByType = asyncHandler(async (req, res) => {
    try {
        const animals = await Animal.find({ type: { $regex: req.params.type, $options: 'i' } }); 
        res.status(200).json(animals);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});


module.exports = {
    getAnimals,
    getAnimal,
    createAnimal,
    updateAnimal,
    deleteAnimal,
    searchAnimalByName,
    searchAnimalByType
}