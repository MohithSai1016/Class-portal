const express=require("express");
const router=express.Router();

const {
    authenticateToken,
    authorizeRoles
}=require("../middleware/authMiddleware");

const controller=
    require("../controllers/notificationTemplateController");

router.get(
    "/",
    authenticateToken,
    authorizeRoles("admin"),
    controller.list
);

router.post(
    "/",
    authenticateToken,
    authorizeRoles("admin"),
    controller.create
);

module.exports=router;
