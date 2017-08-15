import { Meteor } from 'meteor/meteor';
import { User, FinancialAgreements, Game } from '/imports/collections/collections';
import _ from 'lodash';


function myFunc() {
  alert('Make myFunc the pFunc... omg that was horrible i am so sorry');
}

Meteor.startup(() => {
  Game.remove({}); //resets game every restart
  User.remove({});
  FinancialAgreements.remove({});
  // code to run on server at startup
  var game = Game.findOne({ finished: false });
  if (!game) {
    const newGame = {
      turn: 1,
      finished: false,
      phase: 'trade'
    };
    const newFinancialAgreement = {
      amount: getNewAmount(),
      rate: getNewRate(),
      type: getNewType(),
      owner: null
    };

    Game.insert(newGame);
    FinancialAgreements.insert(newFinancialAgreement); //adds the new financial agreement to the financial agreement database
  }
});

var getNewAmount = function() {
  return 50 + Math.round(Math.random() * 100);
}
var getNewRate = function() {
  return Number((5 + Math.random() * 7).toFixed(2));
}
var getNewType = function() {
  if(Math.random > .5) {
    return 'trade';
  } else {
    return 'bank';
  }
}


// var exampleUser = {
//   _id: 'j8f3jf3jf91j3f93j',
//   name: 'John',
//   gameId: '3jf83jf83jf83j',
//   Cash: '100'
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

    return User.insert({ 
      name: name, 
      gameId: game._id,
      cash: 100,
      turnReady: false 
    });
  },
  markUserAsReady(userID) {
    User.update({
      _id: userID
    }, {
      $set: {
        turnReady: true
      }
    });
    //get all users
    const users = User.find({}).fetch();
    //check if all users are ready
    const allusersready = _.every(users, u => u.turnReady);
    if (allusersready) {
      //advance game 1 turn
      Game.update({}, {
        $inc: {turn:1}
      });
      //set turnReady to false
      User.update({}, {
        $set: {
          turnReady: false
        }
      }, {multi:true})
    }

  }
});
var Fred = {
   _id: 'j8f3jf3jf91j3f93j',
   name: 'Fred',
   gameId: '3jf83jf83jf83j',
   Cash: '100'
 };

 
