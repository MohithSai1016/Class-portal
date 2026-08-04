canvas.toBlob(async (blob) => {

    const form = new FormData();

    form.append(
        "student_id",
        studentId
    );

    form.append(
        "files",
        blob,
        `${count}.jpg`
    );

    const response = await fetch(
        "http://localhost:8000/register/",
        {
            method: "POST",
            body: form
        }
    );

    const result = await response.json();

    if (result.saved === 0) {

        console.log(
            "Frame rejected",
            result.rejected
        );

    }

});