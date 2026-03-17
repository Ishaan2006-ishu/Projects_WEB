async function register() {
    const firstName = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const res = await fetch("/user/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ firstName, email, password })
        });

        const data = await res.json();

        if (!res.ok) {
            alert("Registration failed: " + data.msg);
            return;
        }

        alert("User Registered");
        window.location.href = "login.html";
    } catch (err) {
        alert("Network error: " + err.message);
    }
}

async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const res = await fetch("/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (!res.ok) {
            alert("Login failed: " + data.msg);
            return;
        }

        localStorage.setItem("token", data.token);
        window.location.href = "dashboard.html";
    } catch (err) {
        alert("Network error: " + err.message);
    }
}

async function loadUsers() {
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "login.html";
        return;
    }

    try {
        const res = await fetch("/user", {
            headers: { Authorization: "Bearer " + token }
        });

        if (res.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "login.html";
            return;
        }

        const users = await res.json();
        const div = document.getElementById("users");

        users.forEach(u => {
            const p = document.createElement("p");
            p.textContent = `${u.firstName} - ${u.email}`;
            div.appendChild(p);
        });
    } catch (err) {
        alert("Failed to load users: " + err.message);
    }
}


function logout(){
    localStorage.removeItem("token");
    window.location.href="login.html";
}