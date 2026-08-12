const fs = require("fs");
const path = require("path");

const profileRepository =
    require("../models/StudentPlacementProfileRepository");

const {
    uploadDirectory
} = require("../config/uploadConfig");

async function uploadResume(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({
                success:false,
                message:"Resume file is required."
            });
        }

        const existing =
            await profileRepository.findByStudent(
                req.user.id
            );

        if (
            existing?.resume_file_path &&
            fs.existsSync(existing.resume_file_path)
        ) {
            try {
                fs.unlinkSync(
                    existing.resume_file_path
                );
            } catch (_) {}
        }

        const profile =
            await profileRepository.upsert(
                req.user.id,
                {
                    resumeFileName:
                        req.file.originalname,
                    resumeFilePath:
                        req.file.path,
                    resumeUploadedAt:
                        new Date()
                }
            );

        res.status(201).json({
            success:true,
            message:"Resume uploaded successfully.",
            profile
        });
    } catch(error) {
        if (req.file?.path) {
            try {
                fs.unlinkSync(req.file.path);
            } catch (_) {}
        }

        res.status(400).json({
            success:false,
            message:error.message
        });
    }
}

async function downloadMine(req, res) {
    try {
        const profile =
            await profileRepository.findByStudent(
                req.user.id
            );

        if (
            !profile?.resume_file_path ||
            !fs.existsSync(profile.resume_file_path)
        ) {
            return res.status(404).json({
                success:false,
                message:"Resume not found."
            });
        }

        const resolved =
            path.resolve(
                profile.resume_file_path
            );

        const base =
            path.resolve(uploadDirectory);

        if (
            !resolved.startsWith(base + path.sep)
        ) {
            return res.status(403).json({
                success:false,
                message:"Invalid resume path."
            });
        }

        return res.download(
            resolved,
            profile.resume_file_name ||
            "resume"
        );
    } catch(error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

module.exports = {
    uploadResume,
    downloadMine
};
