const express = require("express");
const router = express.Router();
const { auth } = require("./middleware/auth");
const {executorCheck} = require("./middleware/executorCheck")

const {
    getOrder,
    addOrder,
    updateOrder,
    getOrders,
    getNotifications,
    getNotificationsUpdates,
    getNotificationsNew,
    getNotificationsCompleted,
    getMyOrders,
    getMyOrder,
    getInfoAboutExecutors
} = require("./controllers/orders");
router.get("/getMyOrders", auth, getMyOrders)
router.get("/getMyOrder/:orderId", auth, getMyOrder)
router.get("/info", auth,getInfoAboutExecutors )
router.get("/notifications/completed", auth, getNotificationsCompleted)
router.get("/notifications/updates", auth, getNotificationsUpdates)
router.get("/notifications/new", auth, getNotificationsNew)
router.get("/notifications", auth, getNotifications)
router.get("/:id", auth, getOrder);
router.post("/add", auth, addOrder);
router.put("/update/:id", auth, executorCheck, updateOrder);
router.get("/", auth, getOrders);

module.exports = router;
