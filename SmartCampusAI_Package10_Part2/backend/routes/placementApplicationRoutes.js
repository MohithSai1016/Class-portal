const express = require("express");
const router = express.Router();

const {
    authenticateToken,
    authorizeRoles
} = require("../middleware/authMiddleware");

const controller =
    require("../controllers/placementApplicationController");

router.get(
    "/mine",
    authenticateToken,
    authorizeRoles("student"),
    controller.listMine
);

router.get(
    "/mine/summary",
    authenticateToken,
    authorizeRoles("student"),
    controller.summaryMine
);

router.get(
    "/mine/:id",
    authenticateToken,
    authorizeRoles("student"),
    controller.getMine
);

router.post(
    "/mine",
    authenticateToken,
    authorizeRoles("student"),
    controller.createMine
);

router.put(
    "/mine/:id",
    authenticateToken,
    authorizeRoles("student"),
    controller.updateMine
);

router.delete(
    "/mine/:id",
    authenticateToken,
    authorizeRoles("student"),
    controller.deleteMine
);

module.exports = router;
