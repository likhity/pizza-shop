const Order = require("../models/Order"); // New Orders
const AcceptedOrder = require("../models/AcceptedOrder");
const FinishedOrder = require("../models/FinishedOrder");
const OrderProcessor = require("../models/OrderProcessor");


//----------------------------------DONE-----------------------------------------------------------------------
//needs to pass neworders object to page rendering
module.exports.new_orders_get = async (req, res) => {

  //finds ALL orders of ORDER's database, sends results/errors, we render ejs page with that information
  Order.find()
  .then( (results) => {
    res.render("orderprocessor/NewOrdersPage", {arrayOfOrdersDB: results});
  })
  .catch( (errors) => {
    console.log("errors stuff");
    console.log(errors);
  })
};
//--------------------------------------------------------------------------------------------------------------




module.exports.accepted_orders_get = async (req, res) => {
  res.render("orderprocessor/AcceptedOrdersPage.ejs");
};
module.exports.finished_orders_get = async (req, res) => {
  res.render("orderprocessor/FinishedOrdersPage");
};






module.exports.individual_new_order_get = async (req, res) => {

  //this route come from "/individual-new-order/:orderID"
 
  //we recieve the MONGODB ID for the order and retrieve it from the parameter
  const thisOrderID = req.params.orderID;
  console.log(thisOrderID);

  //finds the mongo DB order using its unique id
  Order.findById(thisOrderID)
    .then((results)=>{
      //render specificNewOrderPage and send it corresponding order object from database
      console.log("got results");
      console.log(results);
      res.render("orderprocessor/specificNewOrder", {specificNewOrder: results});
    })
    .catch(err => {
      console.log(err);
    }); 

}

;





module.exports.individual_accepted_order_get = async (req, res) => {
  res.render("orderprocessor/specificAcceptedOrder");
};
module.exports.individual_finished_order_get = async (req, res) => {
  res.render("orderprocessor/specificFinishedOrder");
};





module.exports.accept_order_post = async (req, res) => {
  try {
    //get orderID
    //since post we get information in body
    const { mongoOrderID } = req.body;
      console.log(mongoOrderID);

    // get the newOrder from the database
    
    //findOne find by MongoID?
    const newOrder = await Order.findById({ mongoOrderID });

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
    await Order.findByIdAndDelete({ mongoOrderID });

    //  send response to client
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};






module.exports.confirm_pickedup_post = async (req, res) => {
  try {
    const { orderID } = req.body;

    const { asuID, pickUpTime, studentID, pizzaType, specialInstructions, toppings } = await AcceptedOrder.findOne({ orderID });

    const newOrder = new FinishedOrder({ asuID, pickUpTime, studentID, pizzaType, specialInstructions, toppings });

    await AcceptedOrder.deleteOne({ orderID });

    newOrder.save().then(() => {
      res.status(200).json({ success: true });
    });

  } catch (err) {
    res.status(400).json({ success: false });
  }
};
module.exports.order_status_get = async (req, res) => {
  try {
    const { orderID } = req.body;

    const order = await AcceptedOrder.findOne({ orderID });

    res.status(200).json({ success: true, status: order.orderStatus });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
