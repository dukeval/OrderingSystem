const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        orders: {
            type: Array,
            required: true,
            default: [],
        },
        userRef: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        }
    }, {
        timestamps: true,
        collection: 'orders'
      }
);

module.exports = mongoose.model('Order',orderSchema);