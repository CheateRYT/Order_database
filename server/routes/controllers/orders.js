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
        type: "Новая заявка",
        message: `Заявка была создана с полями: Оборудование - ${equipment}, Тип неисправности - ${faultType}, Описание проблемы - ${problemDescription}, ID клиента - ${req.user.id}`,
        createdAt: new Date(),
      },
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while processing your request "+ error });
  }
};const updateOrder = async (req, res) => {
  try {
    const orderId = parseInt(req.params.id);
    const { status, executorComment, executorId } = req.body;

    const parsedExecutorId = executorId ? parseInt(executorId) : req.user.id;
    const date = new Date()
    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status,
        executorId: parsedExecutorId,
        executorComment,
        ...(status === "выполнено" ? { dateCompleted: date } : {}),
        ...(status === "в работе" ? { dateAccepted: date } : {}),
      },
    });

    if (status === "выполнено") {
      await prisma.notification.create({
        data: {
          orderId: order.id,
          type: "Выполненная заявка",
          message: `Заявка была отмечена как выполненная в ${date}`,
          createdAt: date,
        },
      });
    }

    await prisma.notification.create({
      data: {
        orderId: order.id,
        type: "Обновление заявки",
        message: `Заявка обновлена данными: Статус - ${status}. ${executorComment ? "Комментарий исполнителя " + executorComment : ""}`,
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
    if (!orders.length) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(orders);
  } catch (error) {

    res.status(500).json({ message: `An error occurred while fetching the order ${error.message}` });
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
    res.status(500).json({ message: "An error occurred while fetchingg the order" });
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
                type: "Новая заявка"
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
        type: "Обновление заявки"
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
        type: "Выполненная заявка"
      }
    });

    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching notifications" });
  }
};

const getInfoAboutExecutors = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        executorId: {
          not: null
        },
        dateAccepted: {
          not: null
        },
        dateCompleted: {
          not: null
        }
      }
    });

    const totalOrders = orders.length;
    let totalExecutionTime = 0;

    orders.forEach(order => {
      const dateAccepted = new Date(order.dateAccepted);
      const dateCompleted = new Date(order.dateCompleted);
      const executionTime = dateCompleted - dateAccepted;
      totalExecutionTime += executionTime;
    });

    const averageExecutionTime = totalExecutionTime / totalOrders;

    res.status(200).json({
      averageExecutionTime,
      totalCompletedOrders: totalOrders
    });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching executor information" });
  }
};
const getMyOrder = async (req, res) => {
  try {
    const orderId = parseInt(req.params.id);
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        client: true,
      },
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.client.id !== req.user.id) {
      return res.status(403).json({ message: "You are not authorized to access this order" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching the order" });
  }
};
module.exports = {
  addOrder,
  updateOrder,
  getOrders,
  getOrder,
  getNotifications,
  getNotificationsNew,
  getNotificationsUpdates,
  getNotificationsCompleted,
  getInfoAboutExecutors,
  getMyOrder,
  getMyOrders,
};