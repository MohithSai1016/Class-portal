const express=require("express");
const router=express.Router();

const {
    authenticateToken,
    authorizeRoles
}=require("../middleware/authMiddleware");

const controller=
    require("../controllers/placementDriveController");

router.get(
    "/open",
    authenticateToken,
    authorizeRoles("student"),
    controller.listOpen
);

router.get(
    "/open/:id",
    authenticateToken,
    authorizeRoles("student"),
    controller.getDrive
);

router.post(
    "/:id/apply",
    authenticateToken,
    authorizeRoles("student"),
    controller.apply
);

router.get(
    "/mine/applications",
    authenticateToken,
    authorizeRoles("student"),
    controller.myApplications
);

/*
 * This endpoint is intended for HOD/admin
 * integration. If your existing project uses
 * "admin" rather than "hod", change the role
 * in authorizeRoles accordingly.
 */
router.post(
    "/admin",
    authenticateToken,
    authorizeRoles("admin","hod"),
    controller.createDrive
);

module.exports=router;
