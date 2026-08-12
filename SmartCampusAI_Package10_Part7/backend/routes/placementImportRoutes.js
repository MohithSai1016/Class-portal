const express=require("express");
const router=express.Router();

const multer=require("multer");
const os=require("os");
const path=require("path");

const {
    authenticateToken,
    authorizeRoles
}=require("../middleware/authMiddleware");

const controller=
    require("../controllers/placementImportController");

const upload=multer({
    dest:path.join(
        os.tmpdir(),
        "smart-campus-placement-imports"
    ),
    limits:{
        fileSize:2*1024*1024
    },
    fileFilter:(req,file,cb)=>{
        if (
            path.extname(file.originalname)
                .toLowerCase() !== ".csv"
        ) {
            return cb(
                new Error(
                    "Only CSV files are allowed."
                )
            );
        }

        cb(null,true);
    }
});

router.post(
    "/drives/csv",
    authenticateToken,
    authorizeRoles("admin","hod"),
    upload.single("file"),
    controller.importCsv
);

module.exports=router;
