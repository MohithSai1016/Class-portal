const form =
    document.getElementById("uploadForm");

const status =
    document.getElementById("status");

form.addEventListener(
    "submit",
    async event => {
        event.preventDefault();

        const token =
            localStorage.getItem("token");

        const certificateId =
            document.getElementById(
                "certificateId"
            ).value;

        const file =
            document.getElementById(
                "certificate"
            ).files[0];

        if (!file) {
            status.textContent =
                "Please select a PDF file.";
            return;
        }

        if (
            file.type !==
            "application/pdf"
        ) {
            status.textContent =
                "Only PDF files are allowed.";
            return;
        }

        if (
            file.size >
            5 * 1024 * 1024
        ) {
            status.textContent =
                "File must be 5 MB or smaller.";
            return;
        }

        const formData =
            new FormData();

        formData.append(
            "certificate",
            file
        );

        try {
            const response =
                await fetch(
                    `http://localhost:5000/api/certificate-files/${certificateId}/file`,
                    {
                        method: "POST",
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        },
                        body: formData
                    }
                );

            const data =
                await response.json();

            status.textContent =
                data.success
                    ? "Certificate uploaded successfully."
                    : data.message;
        } catch (error) {
            status.textContent =
                "Unable to upload certificate.";
        }
    }
);
