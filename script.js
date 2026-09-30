
/* ================= LOGIN STATUS ================= */

function updateLoginButton() {

    const token = localStorage.getItem("token");

    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");

    if (!loginBtn || !logoutBtn) {
        return;
    }

    if (token) {

        loginBtn.style.display = "none";
        logoutBtn.style.display = "block";

    } else {

        loginBtn.style.display = "block";
        logoutBtn.style.display = "none";

    }
}


/* ================= UPLOAD ================= */

function goToUpload() {

    const token = localStorage.getItem("token");

    if (!token) {

        alert(
            "Please login first to upload a document."
        );

        window.location.href = "login.html";

        return;
    }

    window.location.href = "upload.html";
}


/* ================= SAMPLE ================= */

function trySample() {

    const sample = document.getElementById("sample");

    if (sample) {

        sample.scrollIntoView({
            behavior: "smooth"
        });

    }
}


/* ================= VIEW SAMPLE ================= */

function viewSample() {

    alert(

        "Sample Contract Agreement\n\n" +

        "Summary:\n" +

        "This agreement is between the service provider " +
        "and client and defines the terms of service.\n\n" +

        "Key Points:\n" +

        "• Service timeline\n" +
        "• Payment in installments\n" +
        "• Confidentiality requirements\n\n" +

        "This is a sample explanation only."

    );
}


/* ================= LOGOUT ================= */

function logout() {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert(
        "You have been logged out successfully."
    );

    window.location.href = "index.html";
}


/* ================= ACTIVE NAVBAR ================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateLoginButton();

        const navLinks =
            document.querySelectorAll("nav a");

        navLinks.forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    navLinks.forEach(function (item) {
                        item.classList.remove("active");
                    });

                    this.classList.add("active");

                }
            );

        });

    }
);
```
