const express=require("express");
const router=express.Router();

const {
    authenticateToken,
    authorizeRoles
}=require("../middleware/authMiddleware");

const controller =
    require("../controllers/studentPlacementProfileController");

router.get(
    "/mine",
    authenticateToken,
    authorizeRoles("student"),
    controller.mine
);

router.put(
    "/mine",
    authenticateToken,
    authorizeRoles("student"),
    controller.save
);

router.get(
    "/mine/readiness",
    authenticateToken,
    authorizeRoles("student"),
    controller.calculateReadiness
);

module.exports=router;
