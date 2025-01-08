const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { 
    type: String,
     required: true 
    },
  genre: [String],
  duration: { 
    type: Number,
     required: true
     },
  language: { 
    type: String,
     required: true 
    },
  releaseDate: {
     type: Date, 
     required: true 
    },
  rating: { 
    type: Number, 
    min: 0,
     max: 10 
    },
  description: { 
    type: String 
  },
  posterUrl: { 
    type: String
   }, 
});

module.exports = mongoose.model("Movie", movieSchema);

