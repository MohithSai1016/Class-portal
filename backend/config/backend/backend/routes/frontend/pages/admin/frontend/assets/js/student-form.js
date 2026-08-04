const API = "http://localhost:5000/api/student";

document
.getElementById("studentForm")
.addEventListener("submit", async e => {

    e.preventDefault();

    const token =
        localStorage.getItem("token");

    const body = {

        roll_number:
            document.getElementById("roll_number").value,

        first_name:
            document.getElementById("first_name").value,

        last_name:
            document.getElementById("last_name").value,

        email:
            document.getElementById("email").value,

        phone:
            document.getElementById("phone").value,

        semester:
            document.getElementById("semester").value,

        section:
            document.getElementById("section").value

    };

    const response = await fetch(API, {

        method: "POST",

        headers: {

            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`

        },

        body: JSON.stringify(body)

    });

    const result = await response.json();

    if (result.success) {

        alert("Student added successfully.");

        location.href = "students.html";

    } else {

        alert(result.message || "Unable to save student.");

    }

});