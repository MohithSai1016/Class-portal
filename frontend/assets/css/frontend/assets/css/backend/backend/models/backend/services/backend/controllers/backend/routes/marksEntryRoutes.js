const express=require("express");

const router=express.Router();

const controller=
require("../controllers/marksEntryController");

const {

authenticateToken,

authorizeRoles

}=
require("../middleware/authMiddleware");

router.get(

"/:assessmentId",

authenticateToken,

authorizeRoles("faculty","admin"),

controller.students

);

module.exports=router;