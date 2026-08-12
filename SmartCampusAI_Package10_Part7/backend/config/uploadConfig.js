const path = require("path");
const fs = require("fs");
const multer = require("multer");

const uploadDirectory =
    process.env.RESUME_UPLOAD_DIR ||
    path.join(process.cwd(), "storage", "resumes");

fs.mkdirSync(uploadDirectory, {
    recursive: true
});

const allowedExtensions =
    new Set([".pdf", ".doc", ".docx"]);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory);
    },

    filename: (req, file, cb) => {
        const extension =
            path.extname(file.originalname)
                .toLowerCase();

        const safeName =
            `${req.user.id}-${Date.now()}${extension}`;

        cb(null, safeName);
    }
});

const fileFilter =
    (req, file, cb) => {
        const extension =
            path.extname(file.originalname)
                .toLowerCase();

        if (!allowedExtensions.has(extension)) {
            return cb(
                new Error(
                    "Only PDF, DOC and DOCX resumes are allowed."
                )
            );
        }

        cb(null, true);
    };

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize:
            Number(
                process.env.RESUME_MAX_BYTES ||
                5 * 1024 * 1024
            )
    }
});

module.exports = {
    upload,
    uploadDirectory
};
