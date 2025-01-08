const seatCategorySchema = new mongoose.Schema({
    category: { 
        type: String,
         enum: ['Regular', 'Premium', 'VIP'],
          required: true 
        },

    priceMultiplier: { 
        type: Number,
         required: true }, 
         
  });
  
  module.exports = mongoose.model('SeatCategory', seatCategorySchema);
  