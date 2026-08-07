const express=require("express");

const router=express.Router();

const controller=

require("../controllers/paymentController");

const {

authenticateToken

}=

require("../middleware/authMiddleware");

router.post(

"/summary",

authenticateToken,

controller.summary

);

module.exports=router;