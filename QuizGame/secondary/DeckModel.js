const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/quizGame")
.then((r)=>{
  console.log("Connected to database");
}).catch((e)=>{console.error(e)});

const DeckSchema = new mongoose.Schema({
  userId: {
    type: Object,
    required: true
  },
  title: String,
  desc: String,
  cards: {
    type: Number,
    default: 0
  }
});

const CardSchema = new mongoose.Schema({
  deckId: {
    type: Object,
    required: true
  },
  title: String,
  answer: String
});

const DeckModel = new mongoose.model("Deck", DeckSchema);
const CardModel = new mongoose.model("Card", CardSchema);

/*
For now, we are going to add these simple procedures:
1) Add card to deck
2) Remove card from deck
3) Update carfd from deck
Once we can do that... then:
4) Create deck
5) Delete deck
6) Update deck (title, desc, etc.)
Once that is done:
7) Add card to certain deck
*/

module.exports.addDeck = (title, desc, userId)=>{
  return new Promise((resolve, reject)=>{
  // duplicates are allowed
    DeckModel.insertOne({userId, title, desc})
    .then((r)=>{
      console.log("/////////////// Addded the deck ", title);
      resolve(r._id);
    }).catch((e)=>{reject(e)});
  });
};
module.exports.deleteDeck = (id)=>{
  return new Promise((resolve, reject)=>{
    DeckModel.deleteOne({_id: id})
    .then((r)=>{
      console.log("/////////////// Removed the deck ", title);
      // DEBATE: should we return the id here?
      resolve(true);
    }).catch((e)=>{reject(e)});
  });
};

module.exports.updateDeck = (newItem, isTitle)=>{
  return new Promise((resolve, reject)=>{
    DeckModel.updateOne({_id: id}, ({title: newItem} ? isTitle : {desc: newItem}))
    .then((r)=>{
      resolve(true);
    }).catch((e)=>{reject(e)});
  });
};

// module.exports.updateDeckTitle = (newTitle, id)=>{
//   return new Promise((resolve, reject)=>{
//     DeckModel.updateOne({_id: id}, {title: newTitle})
//     .then((r)=>{
//       resolve(true);
//     }).catch((e)=>{reject(e)});
//   });
// };

// module.exports.updateDeckDesc = (newDesc, id)=>{
//   return new Promise((resolve, reject)=>{
//     DeckModel.updateOne({_id: id}, {title: newTitle})
//     .then((r)=>{
//       resolve(true);
//     }).catch((e)=>{reject(e)});
//   });
// };
