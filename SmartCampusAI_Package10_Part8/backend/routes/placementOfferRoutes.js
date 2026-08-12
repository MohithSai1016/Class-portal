const express=require("express");
const router=express.Router();

const {
    authenticateToken,
    authorizeRoles
}=require("../middleware/authMiddleware");

const controller =
    require("../controllers/placementOfferController");

router.get(
    "/mine",
    authenticateToken,
    authorizeRoles("student"),
    controller.mine
);

router.get(
    "/all",
    authenticateToken,
    authorizeRoles("admin","hod"),
    controller.all
);

router.post(
    "/",
    authenticateToken,
    authorizeRoles("admin","hod"),
    controller.create
);

router.patch(
    "/:id",
    authenticateToken,
    authorizeRoles("admin","hod"),
    controller.update
);

module.exports=router;
