const express = require("express");

const router = express.Router();

const departmentController =
require("../controllers/departmentController");

const {
authenticateToken,
authorizeRoles
} =
require("../middleware/authMiddleware");

router.get(
"/",
authenticateToken,
departmentController.list
);

router.post(
"/",
authenticateToken,
authorizeRoles("admin"),
departmentController.create
);

router.put(
"/:id",
authenticateToken,
authorizeRoles("admin"),
departmentController.update
);

router.delete(
"/:id",
authenticateToken,
authorizeRoles("admin"),
departmentController.remove
);

module.exports = router;