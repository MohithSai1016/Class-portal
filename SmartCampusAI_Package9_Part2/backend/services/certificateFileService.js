const fs = require("fs");
const path = require("path");

const repository =
    require("../models/CertificateRepository");

const {
    uploadDirectory
} = require("../config/upload");

function getAbsolutePath(filePath) {
    if (!filePath) return null;

    const filename =
        path.basename(filePath);

    return path.join(
        uploadDirectory,
        filename
    );
}

async function attachFile(
    certificateId,
    uploadedFile
) {
    if (!uploadedFile) {
        throw new Error(
            "Certificate PDF file is required"
        );
    }

    const certificate =
        await repository.findById(
            certificateId
        );

    if (!certificate) {
        fs.unlinkSync(uploadedFile.path);

        throw new Error(
            "Certificate not found"
        );
    }

    if (certificate.file_path) {
        const oldPath =
            getAbsolutePath(
                certificate.file_path
            );

        if (
            oldPath &&
            fs.existsSync(oldPath)
        ) {
            fs.unlinkSync(oldPath);
        }
    }

    const relativePath =
        `/storage/certificates/${uploadedFile.filename}`;

    const pool =
        require("../config/db").getPool();

    await pool.execute(
        `UPDATE certificates
         SET file_path = ?
         WHERE id = ?`,
        [
            relativePath,
            certificateId
        ]
    );

    return relativePath;
}

async function removeFile(certificateId) {
    const certificate =
        await repository.findById(
            certificateId
        );

    if (!certificate) {
        throw new Error(
            "Certificate not found"
        );
    }

    const absolutePath =
        getAbsolutePath(
            certificate.file_path
        );

    if (
        absolutePath &&
        fs.existsSync(absolutePath)
    ) {
        fs.unlinkSync(absolutePath);
    }

    const pool =
        require("../config/db").getPool();

    await pool.execute(
        `UPDATE certificates
         SET file_path = NULL
         WHERE id = ?`,
        [certificateId]
    );
}

module.exports = {
    attachFile,
    removeFile,
    getAbsolutePath
};
