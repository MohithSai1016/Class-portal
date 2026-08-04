const token =
localStorage.getItem("token");

document
.getElementById("generateBtn")
.addEventListener("click", async () => {

    const response =
        await fetch(

            "http://localhost:5000/api/ai-scheduler/generate",

            {

                method: "POST",

                headers: {

                    "Content-Type":
                    "application/json",

                    Authorization:
                    `Bearer ${token}`

                },

                body: JSON.stringify({

                    assignments: [],

                    classrooms: []

                })

            }

        );

    const data =
        await response.json();

    document
        .getElementById("result")
        .textContent =
        JSON.stringify(
            data,
            null,
            2
        );

});