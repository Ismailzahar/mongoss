require('dotenv').config({path:'./config/.env'})
const express =require('express');
const mongoose = require('mongoose');
const app =express();


mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(error));

  //Create a person with this prototype

  const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, default: 15 },
    favoriteFoods: [{ type: String }]
  });

const Person = mongoose.model('Person', personSchema);

const person = new Person({
  name: 'mossa',
  age: 33,
  favoriteFoods: ['tajin', 'tacos', 'bstila']
});

//Create and Save a Record of a Model:

person.save(function(err, data) {
  if (err) return console.error(err);
  console.log('Person saved:', data);
});

//Create Many Records with model.create()

const arrayOfPeople = [
  { name: 'ali', age: 31, favoriteFoods: ['tajin', 'banan'] },
  { name: 'ayoub', age: 25, favoriteFoods: ['tacos', 'dla7'] },
  { name: 'ali', age: 23, favoriteFoods: ['dghmira', 'tajin'] },
  { name: 'nizar', age: 60, favoriteFoods: ['tajin', 'kiwi'] }
];

Person.create(arrayOfPeople, function(err, data) {
  if (err) return console.error(err);
  console.log('People created:', data);
});

//Use model.find() to Search , Search by name

Person.find({ name: 'John' }, function(err, data) {
  if (err) return console.error(err);
  console.log('People found by name:', data);
});

//Use Model.findOne() to search , Search  by food

const food = 'tajin';
Person.findOne({ favoriteFoods: food }, function(err, data) {
  if (err) return console.error(err);
  console.log(`Person found by favorite food "${food}":`, data);
});

//Use model.findById() to Search , Search by id

const personId = '6436a22b91214527a446dc92'; //
Person.findById(personId, function(err, data) {
  if (err) return console.error(err);
  console.log(`Person found by _id "${personId}":`, data);
});

//Updates by Running Find, Edit, then Save

Person.findById(personId, function(err, person) {
  if (err) return console.error(err);
  person.favoriteFoods.push('pidza');
  person.save(function(err, data) {
    if (err) return console.error(err);
    console.log('Person updated:', data);
  });
});

//Updates on a Document Using model.findOneAndUpdate()

const personName = 'nizar';
Person.findOneAndUpdate({ name: personName }, { age: 20 }, { new: true }, function(err, data) {
  if (err) return console.error(err);
  console.log(`Person "${personName}" updated:`, data);
});

//Delete One Document Using model.findByIdAndRemove

Person.findByIdAndRemove(personId, function(err, data) {
  if (err) return console.error(err);
  console.log(`Person "${personId}" removed:`, data);
});

//Delete Many Documents with model.remove()

Person.remove({ age: {$lt:30} }, function(err, data) {
  if (err) return console.error(err);
  console.log(`People with age < 30 removed ` , data )
});


