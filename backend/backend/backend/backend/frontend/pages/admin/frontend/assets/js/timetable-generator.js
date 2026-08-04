const token =
localStorage.getItem("token");

document
.getElementById("generateButton")
.addEventListener("click", async () => {

    const response =
        await fetch(

            "http://localhost:5000/api/timetable-generator",

            {

                method: "POST",

                headers: {

                    "Content-Type":
                    "application/json",

                    Authorization:
                    `Bearer ${token}`

                },

                body: JSON.stringify({

                    entries: []

                })

            }

        );

    const data =
        await response.json();

    document
    .getElementById("output")
    .textContent =
    JSON.stringify(
        data,
        null,
        2
    );

});