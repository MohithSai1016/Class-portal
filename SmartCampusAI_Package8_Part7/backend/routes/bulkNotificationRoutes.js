const express=require("express");
const router=express.Router();

const {
    authenticateToken,
    authorizeRoles
}=require("../middleware/authMiddleware");

const controller=
    require("../controllers/bulkNotificationController");

router.post(
    "/",
    authenticateToken,
    authorizeRoles("admin","faculty"),
    controller.send
);

module.exports=router;
