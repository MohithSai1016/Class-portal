const express=require("express");
const router=express.Router();
const {authenticateToken,authorizeRoles}=require("../middleware/authMiddleware");
const controller=require("../controllers/placementSkillController");

router.get("/mine",authenticateToken,authorizeRoles("student"),controller.listMine);
router.post("/mine",authenticateToken,authorizeRoles("student"),controller.addMine);
router.delete("/mine/:skillName",authenticateToken,authorizeRoles("student"),controller.removeMine);

module.exports=router;
