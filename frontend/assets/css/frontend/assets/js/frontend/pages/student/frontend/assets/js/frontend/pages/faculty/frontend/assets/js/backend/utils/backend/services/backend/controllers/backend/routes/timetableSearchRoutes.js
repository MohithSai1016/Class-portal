const express=require("express");

const router=express.Router();

const controller=

require("../controllers/timetableSearchController");

const {

authenticateToken

}=

require("../middleware/authMiddleware");

router.get(

"/",

authenticateToken,

controller.search

);

module.exports=router;