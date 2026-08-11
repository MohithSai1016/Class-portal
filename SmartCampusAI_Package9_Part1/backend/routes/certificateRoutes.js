const express = require("express");
const router = express.Router();

const {
    authenticateToken,
    authorizeRoles
} = require("../middleware/authMiddleware");

const controller =
    require("../controllers/certificateController");

router.get(
    "/mine",
    authenticateToken,
    authorizeRoles("student"),
    controller.myCertificates
);

router.get(
    "/verify/:code",
    controller.verify
);

router.get(
    "/:id",
    authenticateToken,
    controller.getById
);

router.get(
    "/",
    authenticateToken,
    authorizeRoles("admin", "faculty"),
    controller.list
);

router.post(
    "/",
    authenticateToken,
    authorizeRoles("admin", "faculty"),
    controller.create
);

router.patch(
    "/:id/revoke",
    authenticateToken,
    authorizeRoles("admin"),
    controller.revoke
);

module.exports = router;
