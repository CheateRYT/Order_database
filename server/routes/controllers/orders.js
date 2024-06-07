const { prisma } = require("../../prisma/prisma-client");

const addOrder = async (req, res) => {
  try {
    const { equipment, faultType, problemDescription } = req.body;
    if (!equipment || !faultType || !problemDescription) {
      return res.status(400).json({ message: "Please fill in all required fields" });
    }
    const order = await prisma.order.create({
      data: {
        equipment,
        faultType,
        problemDescription,
        client: {
          connect: { id: req.user.id }
        },
        status: "в ожидании",
        dateAdded: new Date(),
      },
    });
    await prisma.notification.create({
      data: {
        orderId: order.id,
        type: "NewOrder",
        message: "New order created",
        createdAt: new Date(),
      },
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while processing your request "+ error });
  }
};

const updateOrder = async (req, res) => {
  try {
    const orderId = parseInt(req.params.id);
    const { status, executorComment, executorId } = req.body;
    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status,
        executorId,
        executorComment,
      },
    });
    if (status === "выполнено") {
        await prisma.notification.create({
            data: {
                orderId: order.id,
                type: "CompletedOrder",
                message: "Order completed",
                createdAt: new Date(),
            },
        });
    }
    await prisma.notification.create({
      data: {
        orderId: order.id,
        type: "UpdateOrder",
        message: "Order updated",
        createdAt: new Date(),
      },
    });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while processing your request" + error });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching orders" });
  }
};


const getMyOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        clientId: req.user.id,
      },
    });
    if (!orders) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching the order" });
  }
};


const getOrder = async (req, res) => {
  try {
    const orderId = parseInt(req.params.id);
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching the order" });
  }
};
const getNotifications = async (req, res) => {
  try {
    const notifications = await prisma.notification.findMany()
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching notifications" });
  }
};

const getNotificationsNew = async (req, res) => {
  try {
    const notifications = await prisma.notification.findMany(
        {where: {
                type: "NewOrder"
            }}
    )
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching notifications" });
  }
};
const getNotificationsUpdates = async (req, res) => {
  try {
    const clientOrders = await prisma.order.findMany({
      where: {
        clientId: req.user.id // Получаем все заказы, принадлежащие текущему клиенту
      }
    });

    const clientOrderIds = clientOrders.map(order => order.id); // Получаем только ID заказов клиента

    const notifications = await prisma.notification.findMany({
      where: {
        orderId: { in: clientOrderIds },
        type: "UpdateOrder"
      }
    });

    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching notifications" });
  }
};

const getNotificationsCompleted = async (req, res) => {
  try {
    const clientOrders = await prisma.order.findMany({
      where: {
        clientId: req.user.id // Получаем все заказы, принадлежащие текущему клиенту
      }
    });

    const clientOrderIds = clientOrders.map(order => order.id); // Получаем только ID заказов клиента

    const notifications = await prisma.notification.findMany({
      where: {
        orderId: { in: clientOrderIds },
        type: "CompletedOrder"
      }
    });

    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching notifications" });
  }
};
module.exports = {
  addOrder,
  updateOrder,
  getOrders,
  getOrder,
  getMyOrders,
  getNotifications,
  getNotificationsNew,
  getNotificationsUpdates,
  getNotificationsCompleted
};