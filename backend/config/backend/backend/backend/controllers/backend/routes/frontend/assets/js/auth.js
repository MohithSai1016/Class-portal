function logout(){

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.href="../../index.html";

}

function isLoggedIn(){

    return localStorage.getItem("token")!==null;

}

function getUser(){

    const user=
        localStorage.getItem("user");

    return user?JSON.parse(user):null;

}