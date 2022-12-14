import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderSchema = new Schema({
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
});

const order = mongoose.model("order", orderSchema);

export default order;
