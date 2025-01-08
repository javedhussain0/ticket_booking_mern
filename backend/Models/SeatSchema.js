const seatSchema = new mongoose.Schema({
    screen: {
         type: mongoose.Schema.Types.ObjectId,
          ref: 'Screen', 
          required: true
         },
    seatNumber: {
         type: String, 
         required: true 
        },
    row: { 
        type: String,
         required: true 
         },

    column: {
         type: String, 
         required: true 
        },
    type: { 
        type: String, 
        enum: ['Normal', 'Special', 'VIP'], 
        required: true
     }, 
    category: {
         type: String,
          enum: ['Regular', 'Premium', 'VIP'], 
          required: true
         },
    isAvailable: {
         type: Boolean, 
         default: true 
        },
  });
  
  module.exports = mongoose.model('Seat', seatSchema);
  