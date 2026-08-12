const { getPool } = require("../config/db");

async function findByStudent(
    studentUserId
) {
    const pool = getPool();

    const [rows] = await pool.execute(
        `SELECT *
         FROM student_placement_profiles
         WHERE student_user_id=?
         LIMIT 1`,
        [studentUserId]
    );

    return rows[0] || null;
}

async function upsert(
    studentUserId,
    data
) {
    const pool = getPool();

    await pool.execute(
        `INSERT INTO student_placement_profiles
        (
            student_user_id,
            resume_file_name,
            resume_file_path,
            resume_uploaded_at,
            linkedin_url,
            github_url,
            portfolio_url,
            skills,
            certifications,
            projects_count,
            internships_count
        )
        VALUES (?,?,?,?,?,?,?,?,?,?,?)
        ON DUPLICATE KEY UPDATE
            resume_file_name=VALUES(resume_file_name),
            resume_file_path=VALUES(resume_file_path),
            resume_uploaded_at=VALUES(resume_uploaded_at),
            linkedin_url=VALUES(linkedin_url),
            github_url=VALUES(github_url),
            portfolio_url=VALUES(portfolio_url),
            skills=VALUES(skills),
            certifications=VALUES(certifications),
            projects_count=VALUES(projects_count),
            internships_count=VALUES(internships_count)`,
        [
            studentUserId,
            data.resumeFileName || null,
            data.resumeFilePath || null,
            data.resumeUploadedAt || null,
            data.linkedinUrl || null,
            data.githubUrl || null,
            data.portfolioUrl || null,
            data.skills || null,
            data.certifications || null,
            Number(data.projectsCount || 0),
            Number(data.internshipsCount || 0)
        ]
    );

    return findByStudent(studentUserId);
}

async function updateReadiness(
    studentUserId,
    score,
    ready
) {
    const pool = getPool();

    await pool.execute(
        `UPDATE student_placement_profiles
         SET readiness_score=?,
             placement_ready=?
         WHERE student_user_id=?`,
        [
            score,
            ready,
            studentUserId
        ]
    );

    return findByStudent(studentUserId);
}

module.exports = {
    findByStudent,
    upsert,
    updateReadiness
};
