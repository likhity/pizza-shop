const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
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
  canceled: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const order = mongoose.model("order", orderSchema);

module.exports = order;
