const Order = require('../models/order');

exports.getOrders = async(req, res) => {
    const orders = await Order.findOne({ userRef: req.user._id });
  
    if (orders) {
        res.status(200).json( orders )  
    } else {
        res.status(400).json({err: 'No Orders found for user.'})
    }
}

exports.addOrder = async (req, res) => {
    const { orders }  = req.body;
    
    const ord = await Order.findOne({ userRef: req.user._id });
    //console.log(JSON.parse(orders));
  
    if (ord) {
      ord.orders = ord.orders.concat(orders);
      //ord.orders.concat(JSON.parse(orders)) 
  
      const orders_ = await ord.save()
  
      res.status(200).json( ord.orders.length )
    } else {      
      const toSave = {
        userRef: req.user._id,
        orders: orders,//JSON.parse(orders),
      }
      console.log(toSave)
      const newOrder = new Order({ ...toSave })
      const orders_ = await newOrder.save();
  
      res.status(200).json( toSave.orders.length )  
    }
  }