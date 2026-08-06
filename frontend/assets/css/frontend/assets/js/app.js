const API = "http://localhost:5000/api";

async function login(url, formId, dashboard) {

    const form = document.getElementById(formId);

    if (!form) return;

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const username =
            form.querySelector("#username").value;

        const password =
            form.querySelector("#password").value;

        const response = await fetch(API + url, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                username,

                password

            })

        });

        const data = await response.json();

        const message =
            document.getElementById("message");

        if (data.success) {

            localStorage.setItem(
                "token",
                data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            message.style.color = "green";

            message.innerText = "Login Successful";

            setTimeout(() => {

                location.href = dashboard;

            }, 800);

        } else {

            message.style.color = "red";

            message.innerText =
                data.message;

        }

    });

}

login(
"/auth/student/login",
"studentLogin",
"../student/dashboard.html"
);

login(
"/auth/admin/login",
"adminLogin",
"../admin/dashboard.html"
);
app.use(
    "/api/timetable-portal",
    require("./routes/timetablePortalRoutes")
);