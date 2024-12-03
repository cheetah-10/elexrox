document.addEventListener("DOMContentLoaded", () => {
  // Load profile picture from localStorage
  const profilePic = localStorage.getItem("profilePic");
  const profilePicElement = document.getElementById("profile-pic");
  if (profilePic) profilePicElement.src = profilePic;

  // Handle profile picture upload
  document.getElementById("upload-button").addEventListener("click", () => {
    document.getElementById("file-input").click();
  });

  document.getElementById("file-input").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        profilePicElement.src = e.target.result;
        localStorage.setItem("profilePic", e.target.result);
        alert("Profile picture updated successfully!");
      };
      reader.readAsDataURL(file);
    }
  });

  // Load user data from localStorage
  const userData = JSON.parse(localStorage.getItem("user"));
  if (userData) {
    document.getElementById("username").value = userData.username || "";
    document.getElementById("email").value = userData.email || "";
    document.getElementById("phone").value = userData.phone || "";
  } else {
    alert("User data not found. Please log in.");
    window.location.href = "Signinandup.html";
  }

  // Save changes and validate
  document.getElementById("profile-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    const oldPassword = document.getElementById("old-password").value;
    const newPassword = document.getElementById("password").value;

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^.{8,}$/; // At least 8 characters

    // Validate email
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Validate phone number
    phone = phone.replace(/\D/g, ''); // Removes everything that is not a digit
    if (!/^\d{11}$/.test(phone)) {
      alert("Please enter a valid 11-digit phone number.");
      return;
    }

    // Check if password is being updated (optional)
    let isPasswordUpdated = false;
    if (newPassword && passwordPattern.test(newPassword)) {
      if (userData && oldPassword === userData.password) {
        userData.password = newPassword;
        isPasswordUpdated = true;
      } else {
        alert("Old password is incorrect. Please try again.");
        return;
      }
    }

    // Update user data
    userData.phone = phone;
    if (isPasswordUpdated) {
      // Update the password only if changed
      localStorage.setItem("user", JSON.stringify(userData));
      alert("Profile updated successfully!");
    } else {
      localStorage.setItem("user", JSON.stringify(userData));
      alert("Phone number updated successfully!");
    }
  });
});

// jQuery for phone mask
$(document).ready(function() {
  $('#phone').mask('000-0000-0000');
});
