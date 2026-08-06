const express=require("express");

const router=express.Router();

const controller=
require("../controllers/resultController");

const{

authenticateToken,

authorizeRoles

}=
require("../middleware/authMiddleware");

router.post(

"/generate",

authenticateToken,

authorizeRoles(

"admin",

"faculty"

),

controller.generate

);

module.exports=router;