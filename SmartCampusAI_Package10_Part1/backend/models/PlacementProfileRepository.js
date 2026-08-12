const { getPool } = require("../config/db");

async function findByStudent(studentUserId) {
    const pool = getPool();
    const [rows] = await pool.execute(
        "SELECT * FROM placement_profiles WHERE student_user_id=? LIMIT 1",
        [studentUserId]
    );
    return rows[0] || null;
}

async function upsert(studentUserId, data) {
    const pool = getPool();
    await pool.execute(
        `INSERT INTO placement_profiles
        (student_user_id,career_goal,resume_path,linkedin_url,github_url,
         portfolio_url,preferred_role,preferred_location,placement_status)
        VALUES (?,?,?,?,?,?,?,?,?)
        ON DUPLICATE KEY UPDATE
        career_goal=VALUES(career_goal),
        resume_path=COALESCE(VALUES(resume_path),resume_path),
        linkedin_url=VALUES(linkedin_url),
        github_url=VALUES(github_url),
        portfolio_url=VALUES(portfolio_url),
        preferred_role=VALUES(preferred_role),
        preferred_location=VALUES(preferred_location),
        placement_status=VALUES(placement_status)`,
        [
            studentUserId,
            data.careerGoal || null,
            data.resumePath || null,
            data.linkedinUrl || null,
            data.githubUrl || null,
            data.portfolioUrl || null,
            data.preferredRole || null,
            data.preferredLocation || null,
            data.placementStatus || "Not Started"
        ]
    );
    return findByStudent(studentUserId);
}

module.exports = { findByStudent, upsert };
