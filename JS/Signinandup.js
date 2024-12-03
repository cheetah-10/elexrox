const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

// Form inputs
const signupUsername = document.querySelector("#signup-username");
const signupEmail = document.querySelector("#signup-email");
const signupPassword = document.querySelector("#signup-password");

const signinUsername = document.querySelector("#signin-username");
const signinPassword = document.querySelector("#signin-password");

const logoutBtn = document.querySelector("#logout-btn");

const ProfileBtn = document.querySelector("#Profile-btn");

const CheckoutBtn = document.querySelector("#CheckOut-btn");

// Toggle Sign-Up and Sign-In modes
sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
  localStorage.setItem("mode", "signup"); // Save mode in local storage
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
  localStorage.setItem("mode", "signin"); // Save mode in local storage
});

// Load the correct mode from local storage
window.addEventListener("load", () => {
  const mode = localStorage.getItem("mode");
  if (mode === "signup") {
    container.classList.add("sign-up-mode");
  } else {
    container.classList.remove("sign-up-mode");
  }
});

// Store user data in local storage
function saveUserData(username, email, password) {
  const user = { username, email, password };
  localStorage.setItem("user", JSON.stringify(user));
}

// Check user data for sign-in
function authenticateUser(username, password) {
  const user = JSON.parse(localStorage.getItem("user"));
  return user && user.username === username && user.password === password;
}

// Sign-Up Function
document.querySelector(".sign-up-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (
    signupUsername.value.trim() &&
    signupEmail.value.trim() &&
    signupPassword.value.trim()
  ) {
    // Email validation
    if (!emailPattern.test(signupEmail.value)) {
      alert("Please enter a valid email address.");
      return;
    }

    saveUserData(signupUsername.value, signupEmail.value, signupPassword.value);
    alert("Sign-Up Successful! You can now log in.");
    container.classList.remove("sign-up-mode"); // Switch to sign-in mode
    localStorage.setItem("mode", "signin");
  } else {
    alert("Please fill all fields!");
  }
});

// Sign-In Function
document.querySelector(".sign-in-form").addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    signinUsername.value.trim() &&
    signinPassword.value.trim() &&
    authenticateUser(signinUsername.value, signinPassword.value)
  ) {
    alert("Login Successful!");
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "index.html"; // Redirect to home page
  } else {
    alert("Invalid credentials. Please try again.");
  }
});

// Logout Function
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.setItem("mode", "signin"); // Reset to login mode
  window.location.href = "Signinandup.html"; // Redirect to login page
});

// Redirect if not logged in
if (!localStorage.getItem("isLoggedIn") && window.location.pathname.includes("index.html")) {
  alert("You need to log in first!");
  window.location.href = "Signinandup.html";
}

ProfileBtn.addEventListener("click", ()=> {
  window.location.href = "Profile.html";
});

CheckoutBtn.addEventListener("click", ()=> {
  window.location.href = "Checkout.html";
});


function swapStyle() {
  const body = document.body;
  const icon = document.querySelector(".fa-solid");

  // Toggle the dark theme class
  body.classList.toggle("darktheme");

  // Toggle the icon class between moon and sun
  if (icon.classList.contains("fa-moon")) {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  } else {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  }
}
