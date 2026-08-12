const express=require("express");
const router=express.Router();

const {
    authenticateToken,
    authorizeRoles
}=require("../middleware/authMiddleware");

const controller=
    require("../controllers/placementNotificationController");

router.get(
    "/mine",
    authenticateToken,
    authorizeRoles("student"),
    controller.listMine
);

router.get(
    "/mine/unread-count",
    authenticateToken,
    authorizeRoles("student"),
    controller.unreadMine
);

router.patch(
    "/mine/:id/read",
    authenticateToken,
    authorizeRoles("student"),
    controller.markRead
);

router.patch(
    "/mine/read-all",
    authenticateToken,
    authorizeRoles("student"),
    controller.markAllRead
);

router.post(
    "/admin",
    authenticateToken,
    authorizeRoles("admin","hod"),
    controller.create
);

module.exports=router;
