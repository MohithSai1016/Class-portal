const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDirectory =
    path.join(__dirname, "../../storage/certificates");

fs.mkdirSync(uploadDirectory, {
    recursive: true
});

const allowedExtensions = new Set([
    ".pdf"
]);

const allowedMimeTypes = new Set([
    "application/pdf"
]);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory);
    },

    filename: (req, file, cb) => {
        const safeName =
            `${Date.now()}-${Math.round(
                Math.random() * 1e9
            )}.pdf`;

        cb(null, safeName);
    }
});

const fileFilter = (req, file, cb) => {
    const extension =
        path.extname(file.originalname)
            .toLowerCase();

    if (
        !allowedExtensions.has(extension) ||
        !allowedMimeTypes.has(file.mimetype)
    ) {
        return cb(
            new Error(
                "Only PDF certificate files are allowed"
            )
        );
    }

    cb(null, true);
};

const certificateUpload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

module.exports = {
    certificateUpload,
    uploadDirectory
};
