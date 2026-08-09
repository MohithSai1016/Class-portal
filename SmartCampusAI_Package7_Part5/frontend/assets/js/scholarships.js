const token = localStorage.getItem("token");
const studentId = localStorage.getItem("studentId");

document.getElementById("apply").addEventListener("click", async () => {
    const scholarshipId =
        Number(document.getElementById("scholarshipId").value);

    const applicationNote =
        document.getElementById("note").value;

    const message =
        document.getElementById("message");

    if (!studentId || !scholarshipId) {
        message.textContent =
            "Student ID and scholarship ID are required.";
        return;
    }

    try {
        const response = await fetch(
            "http://localhost:5000/api/scholarship-applications",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    studentId,
                    scholarshipId,
                    applicationNote
                })
            }
        );

        const data = await response.json();

        message.textContent =
            data.success
                ? `Application submitted: ${data.applicationId}`
                : data.message;
    } catch (error) {
        message.textContent =
            "Unable to submit application.";
    }
});
