const mongoose = require('mongoose');

const wishlistItemSchema = new mongoose.Schema({
  ID:String,  
  Image: String,
  Title: String,
  Price: String,
  Shipping: String,
  itemarr: Object, // Store the entire item object if needed
});

const WishlistItem = mongoose.model('WishlistItem', wishlistItemSchema);

module.exports = WishlistItem;
