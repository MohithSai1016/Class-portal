const express=require("express");
const router=express.Router();

const {
    authenticateToken,
    authorizeRoles
}=require("../middleware/authMiddleware");

const controller=
    require("../controllers/placementEligibilityController");

router.get(
    "/mine/:driveId",
    authenticateToken,
    authorizeRoles("student"),
    controller.checkMine
);

module.exports=router;
