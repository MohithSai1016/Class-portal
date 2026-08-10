const express=require("express");
const router=express.Router();
const {authenticateToken,authorizeRoles}=require("../middleware/authMiddleware");
const controller=require("../controllers/notificationController");

router.get("/",authenticateToken,controller.list);
router.get("/unread-count",authenticateToken,controller.unread);
router.patch("/:id/read",authenticateToken,controller.markRead);
router.patch("/read-all",authenticateToken,controller.markAllRead);
router.post("/",authenticateToken,authorizeRoles("admin"),controller.create);

module.exports=router;
