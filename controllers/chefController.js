import AcceptedOrder from "../models/AcceptedOrder.js";

const order_list_get = async (req, res) => {

  try {

    const acceptedOrdersList = await AcceptedOrder.find({"orderStatus": { $ne: "Ready to Pickup" }});

    res.render("chef/chefOrderListPage", { acceptedOrdersList });
  } catch (err) {
    res.status(400).json({ success: false });
  }

};
const individual_order_get = async (req, res) => {
  try {
  const thisOrderID = req.params.orderID;
  
  const order = await AcceptedOrder.findOne({ orderID: thisOrderID });

  res.render("chef/chefSpecificOrder", {specificOrder: order});

  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//============================= ORDER STATUS ======================================================

const confirm_ready_to_cook_post = async (req, res) => {
  try {
    const orderID = req.body.orderID;

    await AcceptedOrder.findOneAndUpdate({ orderID: orderID }, { orderStatus: "Ready to Cook" });

    res.status(200).json({ success: true });

  } catch (err) {
    res.status(400).json({ sucess: false });
  }
}

const confirm_cooking_post = async (req, res) => {
  try {
    const { orderID } = req.body;

    await AcceptedOrder.findOneAndUpdate({ orderID }, { orderStatus: "Cooking" });

    res.status(200).json({ success: true });

  } catch (err) {
    res.status(400).json({ success: false });
  }
};

const confirm_ready_to_pickup_post = async (req, res) => {
  try {
    const { orderID } = req.body;

    await AcceptedOrder.findOneAndUpdate({ orderID }, { orderStatus: "Ready to Pickup" });

    res.status(200).json({ success: true });

  } catch (err) {
    res.status(400).json({ success: false });
  }
};

const order_status_get = async (req, res) => {
  try {
    const { orderID } = req.body;

    const order = await AcceptedOrder.findOne({ orderID });

    res.status(200).json({ success: true, status: order.orderStatus });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

export default {
  order_list_get,
  order_status_get,
  individual_order_get,
  confirm_ready_to_cook_post,
  confirm_cooking_post,
  confirm_ready_to_pickup_post,
};
