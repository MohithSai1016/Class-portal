const express=require("express");
const router=express.Router();

const {
    authenticateToken,
    authorizeRoles
}=require("../middleware/authMiddleware");

const controller =
    require("../controllers/placementAnalyticsController");

router.get(
    "/overview",
    authenticateToken,
    authorizeRoles("admin","hod"),
    controller.overview
);

module.exports=router;
