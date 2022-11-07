const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const acceptedOrderSchema = new Schema({
  pickUpTime: {
    type: Date,
    required: true,
  },
  orderID: {
    type: String,
    required: true,
  },
  studentID: {
    type: String,
    required: true,
  },
  pizzaType: {
    type: String,
    required: true,
  },
  toppings: [
    {
      type: String,
      required: true,
    },
  ],
  specialInstructions: {
    type: String,
  },
  orderStatus: {
    type: String,
    required: true,
  },
});

const acceptedOrder = mongoose.model("acceptedorder", acceptedOrderSchema);

module.exports = acceptedOrder;
