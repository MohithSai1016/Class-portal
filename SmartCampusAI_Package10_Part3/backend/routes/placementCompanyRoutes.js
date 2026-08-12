const express=require("express");
const router=express.Router();

const {
    authenticateToken,
    authorizeRoles
}=require("../middleware/authMiddleware");

const controller=
    require("../models/PlacementCompanyController");

router.get(
    "/",
    authenticateToken,
    authorizeRoles("student","admin","hod"),
    controller.list
);

router.post(
    "/",
    authenticateToken,
    authorizeRoles("admin","hod"),
    controller.create
);

module.exports=router;
