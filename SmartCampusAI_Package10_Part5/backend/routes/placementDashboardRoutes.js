const express=require("express");
const router=express.Router();

const {
    authenticateToken,
    authorizeRoles
}=require("../middleware/authMiddleware");

const controller=
    require("../controllers/placementDashboardController");

router.get(
    "/mine",
    authenticateToken,
    authorizeRoles("student"),
    controller.mine
);

module.exports=router;
