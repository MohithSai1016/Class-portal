const express=require("express");
const router=express.Router();

const {
    authenticateToken,
    authorizeRoles
}=require("../middleware/authMiddleware");

const controller=require("../controllers/announcementController");

router.get("/",authenticateToken,controller.list);

router.post(
    "/",
    authenticateToken,
    authorizeRoles("admin"),
    controller.create
);

router.patch(
    "/:id/archive",
    authenticateToken,
    authorizeRoles("admin"),
    controller.archive
);

module.exports=router;
