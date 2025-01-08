const screenSchema = new mongoose.Schema({
    name: { 
        type: String,
         required: true
         },
    totalSeats:{
         type: Number, 
        required: true 
    },
  });
  
  module.exports = mongoose.model('Screen', screenSchema);
  