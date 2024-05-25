const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema(
{
    name:{
        type:String,
        required:[true,"Pleas enter  a name  for animal!"]
    },
    type:{
        type:String
    },
    origin:{
        type:String
    },
    image:{
        type:String
    }
});

const Animal= mongoose.model('Animal', animalSchema);

module.exports = Animal;
