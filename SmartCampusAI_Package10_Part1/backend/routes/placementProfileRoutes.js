const express=require("express");
const router=express.Router();
const {authenticateToken,authorizeRoles}=require("../middleware/authMiddleware");
const controller=require("../controllers/placementProfileController");

router.get("/mine",authenticateToken,authorizeRoles("student"),controller.getMine);
router.put("/mine",authenticateToken,authorizeRoles("student"),controller.updateMine);

module.exports=router;
