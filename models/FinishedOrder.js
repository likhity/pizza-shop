const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const finishedOrderSchema = new Schema({
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
  amountPaid: {
    type: Number,
  },
});

const finishedOrder = mongoose.model("finishedorder", finishedOrderSchema);

module.exports = finishedOrder;
