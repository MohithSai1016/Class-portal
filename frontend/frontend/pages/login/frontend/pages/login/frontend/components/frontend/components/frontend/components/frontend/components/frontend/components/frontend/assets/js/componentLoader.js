async function loadComponent(id, file) {

    const response = await fetch(file);

    const html = await response.text();

    document.getElementById(id).innerHTML = html;

}

async function initializeComponents(role) {

    await loadComponent(
        "header",
        "../../components/header.html"
    );

    if (role === "student") {

        await loadComponent(
            "sidebar",
            "../../components/sidebar-student.html"
        );

    } else {

        await loadComponent(
            "sidebar",
            "../../components/sidebar-admin.html"
        );

    }

    await loadComponent(
        "footer",
        "../../components/footer.html"
    );

    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {

        document.getElementById("loggedUser").innerText =
            `Welcome, ${user.fullName}`;

    }

}