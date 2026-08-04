const express = require("express");

const router = express.Router();

const studentController =
require("../controllers/studentController");

const {
authenticateToken,
authorizeRoles
} =
require("../middleware/authMiddleware");

router.get(

"/dashboard",

authenticateToken,

authorizeRoles("student"),

studentController.dashboard

);

module.exports = router;
router.post(
    "/",
    authenticateToken,
    authorizeRoles("admin"),
    studentController.create
);

router.put(
    "/:id",
    authenticateToken,
    authorizeRoles("admin"),
    studentController.update
);

router.delete(
    "/:id",
    authenticateToken,
    authorizeRoles("admin"),
    studentController.remove
);