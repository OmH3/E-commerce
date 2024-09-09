const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  products:[
    {
        type:mongoose.ObjectId,
        ref:'Product',
    },
  ],
  payment:{},
  buyer:{
    type:mongoose.ObjectId,
    res:'User'
  },
  status:{
    type:String,
    default:"Not Process",
    enum:['Not Process','Processing','Shipped']
  },
},{timestamps:true}); // Correct placement of timestamps option

const orderModel = mongoose.model("Order", orderSchema);

module.exports = orderModel;