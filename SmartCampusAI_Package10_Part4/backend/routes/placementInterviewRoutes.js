const express=require("express");
const router=express.Router();

const {
    authenticateToken,
    authorizeRoles
}=require("../middleware/authMiddleware");

const controller=
    require("../controllers/placementInterviewController");

router.get(
    "/mine",
    authenticateToken,
    authorizeRoles("student"),
    controller.listMine
);

router.get(
    "/mine/upcoming",
    authenticateToken,
    authorizeRoles("student"),
    controller.upcomingMine
);

router.get(
    "/mine/:id",
    authenticateToken,
    authorizeRoles("student"),
    controller.getMine
);

router.post(
    "/admin",
    authenticateToken,
    authorizeRoles("admin","hod"),
    controller.create
);

module.exports=router;
