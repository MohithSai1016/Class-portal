router.get(
    "/list",
    authenticateToken,
    authorizeRoles("admin"),
    studentController.listStudents
);