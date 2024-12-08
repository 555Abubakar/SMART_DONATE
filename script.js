// Simulate a simple signup/login system using local storage

// Handle user sign up
document.getElementById("signup-form")?.addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const user = { username, email, password };

    // Store user info in localStorage (simulating a backend)
    localStorage.setItem("user", JSON.stringify(user));

    // Redirect to login
    alert("Account created successfully! Please log in.");
    window.location.href = "login.html";
});

// Handle user login
document.getElementById("login-form")?.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.email === email && user.password === password) {
        alert("Login successful!");
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid credentials.");
    }
});

// Donation form handling
document.getElementById("donate-form")?.addEventListener("submit", function(event) {
    event.preventDefault();

    const item = document.getElementById("item").value;
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value;
    const quantity = document.getElementById("quantity").value;

    const donation = { item, category, description, quantity };
    
    let donations = JSON.parse(localStorage.getItem("donations")) || [];
    donations.push(donation);
    localStorage.setItem("donations", JSON.stringify(donations));

    window.location.href = "dashboard.html";
});

// Populate donation history in dashboard
document.addEventListener("DOMContentLoaded", function() {
    const donations = JSON.parse(localStorage.getItem("donations")) || [];
    const donationsList = document.getElementById("donations-list");

    if (donations.length === 0) {
        donationsList.innerHTML = "<p>No donations yet. Please donate!</p>";
    } else {
        donations.forEach(donation => {
            const div = document.createElement("div");
            div.innerHTML = `<strong>Item:</strong> ${donation.item} <br> <strong>Category:</strong> ${donation.category} <br> <strong>Description:</strong> ${donation.description} <br> <strong>Quantity:</strong> ${donation.quantity}`;
            donationsList.appendChild(div);
        });
    }
});
