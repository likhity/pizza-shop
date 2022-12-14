import Order from "../models/Order.js"; // New Orders
import AcceptedOrder from "../models/AcceptedOrder.js";
import FinishedOrder from "../models/FinishedOrder.js";

//==================================== PAGES =================================================

//----------------------------------DONE-----------------------------------------------------------------------
//needs to pass neworders object to page rendering
const new_orders_get = async (req, res) => {
  //finds ALL orders of ORDER's database, sends results/errors, we render ejs page with that information
  Order.find()
    .then((results) => {
      res.render("orderprocessor/NewOrdersPage", { arrayOfOrdersDB: results });
    })
    .catch((errors) => {
      console.log(errors);
    });
};
//--------------------------------------------------------------------------------------------------------------

//----------------------------------DONE-----------------------------------------------------------------------

const accepted_orders_get = async (req, res) => {
  //find all acceptedOrders
  AcceptedOrder.find()
    .then((results) => {
      //send acceptedOrdersPage array of Accepted Orders
      res.render("orderprocessor/AcceptedOrdersPage", {
        arrayOfAcceptedOrdersDB: results,
      });
    })
    .catch((errors) => {
      console.log(errors);
    });
};
//--------------------------------------------------------------------------------------------------------------

const finished_orders_get = async (req, res) => {
  try{
    const FinishedOrdersList = await FinishedOrder.find();

    res.render("orderprocessor/FinishedOrdersPage", { FinishedOrdersList });
  }catch(err){
    res.status(400).json({success: false});
  }
};

//===========================================================================================

//==================================== INDIVIDUAL ORDRE PAGES =================================================

//----------------------------------DONE-----------------------------------------------------------------------

const individual_new_order_get = async (req, res) => {
  //this route come from "/individual-new-order/:orderID"

  //we recieve the MONGODB ID for the order and retrieve it from the parameter
  const thisMongoOrderID = req.params.orderID;

  //finds the mongo DB order using its unique id
  Order.findById(thisMongoOrderID)
    .then((results) => {
      //render specificNewOrderPage and send it corresponding order object from database
      res.render("orderprocessor/specificNewOrder", {
        specificNewOrder: results,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  //-------------------------------------------------------------------------------------------------------------
};

//need to send myself the individual acceptedOrder to "specificAcceptedOrder" ejs
const individual_accepted_order_get = async (req, res) => {
  //we recieve MONGO NEWORDER ID in URL PARAMETERS
  const thisMongoOrderID = req.params.orderID;

  //finds the mongo DB acceptedOrder using its unique id
  AcceptedOrder.findById(thisMongoOrderID)
    .then((results) => {
      //render specificNewOrderPage and send it corresponding order object from database
      res.render("orderprocessor/specificAcceptedOrder", {
        specificAcceptedOrder: results,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const individual_finished_order_get = async (req, res) => {

  try {
    const orderID = req.params.orderID;
  
    const specificFinishedOrder = await FinishedOrder.findOne({orderID});
  
    res.render("orderprocessor/specificFinishedOrder", { specificFinishedOrder: specificFinishedOrder });

  } catch (err) {
    res.status(400).json({ success: false });
  }

};

//==============================================================================================

const accept_order_post = async (req, res) => {
  try {
    //get orderID
    //since post we get information in body
    const mongoOrderID = req.body.mongoOrderID;

    // get the newOrder from the database

    //findbyID finds mongoOrderID finds using string
    const newOrder = await Order.findById(mongoOrderID);

    // create new accepted order with the exact same order details
    const newAcceptedOrder = new AcceptedOrder({
      pickUpTime: newOrder.pickUpTime,
      orderID: newOrder.orderID,
      studentID: newOrder.studentID,
      pizzaType: newOrder.pizzaType,
      toppings: newOrder.toppings,
      specialInstructions: newOrder.specialInstructions,
      orderStatus: "Accepted",
    });

    //  save the new accepted order to the AcceptedOrders collection in the database
    await newAcceptedOrder.save();

    //  delete the order from the NewOrders list using mongoID
    await Order.findByIdAndDelete(mongoOrderID);

    //  send response to client
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

const confirm_pickedup_post = async (req, res) => {
  try {
    const { mongoOrderID } = req.body;

    const {
      asuID,
      pickUpTime,
      studentID,
      pizzaType,
      specialInstructions,
      toppings,
      orderID,
    } = await AcceptedOrder.findById(mongoOrderID);

    const newOrder = new FinishedOrder({
      asuID,
      pickUpTime,
      studentID,
      orderID,
      pizzaType,
      specialInstructions,
      toppings,
    });

    await AcceptedOrder.deleteOne({ orderID });

    newOrder.save().then(() => {
      res.status(200).json({ success: true });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false });
  }
};

const order_status_get = async (req, res) => {
  try {
    //get mongoOrderID from url parameter (mongoOrderID)
    const mongoOrderID = req.params.mongoOrderID;

    //note: only acceptedOrders have statuses (only search acceptedOrders collections)
    const acceptedOrder = await AcceptedOrder.findById(mongoOrderID);

    res.status(200).json({ success: true, status: acceptedOrder.orderStatus });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

export default {
  new_orders_get,
  accepted_orders_get,
  finished_orders_get,
  individual_new_order_get,
  individual_accepted_order_get,
  individual_finished_order_get,
  accept_order_post,
  confirm_pickedup_post,
  order_status_get,
};
