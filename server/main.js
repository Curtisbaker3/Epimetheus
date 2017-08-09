import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  var game = Game.findOne({ finished: false });
  if (game) {
    
  } else if (!game) {
    Game.insert({
      turn: 1,
      finished: false,
      phase: 'trade'
    });
  }
});

var User = new Mongo.Collection("users");
var FinancialAgreements = new Mongo.Collection("financialagreements");
var Game = new Mongo.Collection("game");

// var exampleUser = {
//   _id: 'j8f3jf3jf91j3f93j',
//   name: 'John',
//   gameId: '3jf83jf83jf83j'
// };

// var exampleFA = {
//   amount: 100.00,
//   rate: 0.08,
//   type: 'bank' / 'trade',
//   owner: null || 'jfj83jf83jf38j'
// };

// var exampleGame = {
//   turn: 5,
//   finished: true|false,
//   phase: 'trade' | 'buy'
// };

Meteor.methods({
  registerUser(name) {
    if (!name) {
      throw new Meteor.Error('Please supply a name.');
    }
    
    var game = Game.findOne({ finished: false });

    return User.insert({ name: name, gameId: game._id });
  }
});