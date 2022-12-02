//schema imports
import Order from "../models/Order.js";
import AcceptedOrder from "../models/AcceptedOrder.js";
import ShortUniqueId from "short-unique-id";

const customize_pizza_get = (req, res) => {
  res.render("student/customizePizzaPage");
};

const pickup_time_get = (req, res) => {
  res.render("student/pickUpTimePage");
};

const order_summary_get = (req, res) => {
  res.render("student/orderSummaryPage");
};

const special_instructions_get = (req, res) => {
  res.render("student/specialInstructions");
};

const view_order_status_get = async (req, res) => {
  const { asuID } = res.locals;
  const order =
      (await Order.findOne({ studentID: asuID })) ||
      (await AcceptedOrder.findOne({ studentID: asuID }));
  
  if (order) {
    res.render("student/orderStatusPage", { order });
  } else {
    res.redirect("/student/customize-pizza");
  }
};

const create_order_post = async (req, res) => {
  try {
    const { pickUpTime, asuID, pizzaType, toppings, specialInstructions } =
      req.body;

    // every order will have a unique ID 10 characters long
    const orderID = new ShortUniqueId({ length: 10 })();

    //create order based off post request
    const newOrder = new Order({
      pickUpTime: pickUpTime,
      studentID: asuID,
      orderID: orderID,
      pizzaType: pizzaType,
      toppings: toppings,
      specialInstructions: specialInstructions,
    });
    //save order to database
    //return ok status success:true & orderID
    newOrder.save().then((result) => {
      console.log(result);
      res.status(201).json({ success: true });
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

const cancel_order_delete = async (req, res) => {
  try {
    const { studentID } = req.body;

    await Order.deleteOne({ studentID });

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

const order_status_get = async (req, res) => {
  try {
    //we received orderID from client
    const { studentID } = req.params;

    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);

    //try to find client's orderID in pending orders (order) database
    //or try to find in acceptedOrders
    const order =
      (await Order.findOne({ studentID })) ||
      (await AcceptedOrder.findOne({ studentID }));

    //we find order and check what collection it belongs to in the database

    //if belongs to acceptedOrder
    //send OK response (200) and json containing success = true and status from order
    if (order.constructor.modelName === "acceptedorder") {
      res.status(200).json({ success: true, status: order.orderStatus });
    } else {
      //else status is pending (order) and return json saying ok status
      //and success = true and status is not accepted (order sent)
      res.status(200).json({ success: true, status: "Order Sent" });
    }
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

export default {
  customize_pizza_get,
  pickup_time_get,
  order_summary_get,
  special_instructions_get,
  view_order_status_get,
  create_order_post,
  cancel_order_delete,
  order_status_get,
};