const express=require("express");
const router=express.Router();

const {
    authenticateToken,
    authorizeRoles
}=require("../middleware/authMiddleware");

const controller =
    require("../controllers/finalPlacementReportController");

router.post(
    "/generate",
    authenticateToken,
    authorizeRoles("admin","hod"),
    controller.generate
);

router.get(
    "/",
    authenticateToken,
    authorizeRoles("admin","hod"),
    controller.list
);

module.exports=router;
