const express=require("express");

const router=express.Router();

const controller=

require("../controllers/facultySubjectController");

const {

authenticateToken,

authorizeRoles

}=

require("../middleware/authMiddleware");

router.get(

"/",

authenticateToken,

controller.list

);

router.post(

"/",

authenticateToken,

authorizeRoles("admin"),

controller.create

);

module.exports=router;
