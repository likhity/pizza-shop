import mongoose from "mongoose";

const Schema = mongoose.Schema;

const finishedOrderSchema = new Schema({
  pickUpTime: {
    type: String,
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
    default: 10
  },
});

const finishedOrder = mongoose.model("finishedorder", finishedOrderSchema);

export default finishedOrder;
