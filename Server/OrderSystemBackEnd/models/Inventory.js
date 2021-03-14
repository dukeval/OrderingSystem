const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    itemName: {
        type: String,
        require: true,
    },itemDescription: {
        type: String,
        require: true,
    },itemImage: {
        type: String,
        require: true,
    },itemPrice: {
        type: Number,
        require: true,
    },discontinued: {
        type: Boolean,
        default:false
    },qty: {
        type: Number,
        require: true,
    },
});

module.exports = mongoose.model('Inventory', inventorySchema);