const express = require("express");
const router = express.Router();
const { auth } = require("./middleware/auth");
const {
  getAllEmployees,
  addEmployee,
  removeEmployee,
  editEmployee,
  getSingleEmployee,
} = require("./controllers/employees");

// /api/employees
router.get("/", auth, getAllEmployees);
// /api/employees/:id
router.get("/:id", auth, getSingleEmployee);
// /api/employees/add
router.post("/add", auth, addEmployee);
// /api/employees/remove:id
router.post("/remove/:id", auth, removeEmployee);
// /api/employees/remove:id
router.put("/edit/:id", auth, editEmployee);
module.exports = router;
