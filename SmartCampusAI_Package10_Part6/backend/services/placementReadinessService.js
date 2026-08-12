const profileRepository =
    require("../models/StudentPlacementProfileRepository");

const academicRepository =
    require("../models/StudentAcademicRepository");

function countItems(value) {
    if (!value) return 0;

    return String(value)
        .split(",")
        .map(v => v.trim())
        .filter(Boolean)
        .length;
}

/*
 * Readiness is an internal guidance score, not a hiring decision.
 *
 * Maximum = 100:
 *   Academic performance: 30
 *   Skills: 20
 *   Projects: 20
 *   Internships: 15
 *   Certifications: 10
 *   Professional profile links: 5
 */
async function calculate(
    studentUserId
) {
    const [
        profile,
        academic
    ] = await Promise.all([
        profileRepository.findByStudent(
            studentUserId
        ),
        academicRepository.findByUserId(
            studentUserId
        )
    ]);

    const p = profile || {};

    const cgpa =
        Number(academic?.cgpa || 0);

    const academicScore =
        Math.min(
            Math.max(cgpa / 10, 0) * 30,
            30
        );

    const skillCount =
        countItems(p.skills);

    const skillScore =
        Math.min(
            skillCount / 10 * 20,
            20
        );

    const projectScore =
        Math.min(
            Number(p.projects_count || 0) / 3 * 20,
            20
        );

    const internshipScore =
        Math.min(
            Number(p.internships_count || 0) / 2 * 15,
            15
        );

    const certificationCount =
        countItems(p.certifications);

    const certificationScore =
        Math.min(
            certificationCount / 3 * 10,
            10
        );

    let profileLinks = 0;

    if (p.linkedin_url) profileLinks++;
    if (p.github_url) profileLinks++;
    if (p.portfolio_url) profileLinks++;

    const profileScore =
        profileLinks / 3 * 5;

    const total =
        academicScore +
        skillScore +
        projectScore +
        internshipScore +
        certificationScore +
        profileScore;

    const score =
        Math.round(total * 100) / 100;

    const ready = score >= 70;

    if (profile) {
        await profileRepository.updateReadiness(
            studentUserId,
            score,
            ready
        );
    }

    return {
        score,
        placementReady: ready,
        breakdown: {
            academic: Math.round(
                academicScore * 100
            ) / 100,
            skills: Math.round(
                skillScore * 100
            ) / 100,
            projects: Math.round(
                projectScore * 100
            ) / 100,
            internships: Math.round(
                internshipScore * 100
            ) / 100,
            certifications: Math.round(
                certificationScore * 100
            ) / 100,
            professionalProfiles:
                Math.round(
                    profileScore * 100
                ) / 100
        }
    };
}

module.exports = {
    calculate
};
