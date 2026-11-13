function showError(inputId, errorId, message) {
  document.getElementById(errorId).textContent = message;
  document.getElementById(inputId).style.border = "2px solid red";
}

function clearError(inputId, errorId) {
  document.getElementById(errorId).textContent = "";
  document.getElementById(inputId).style.border = "2px solid green";
}

function isKauEmail(email) {
  const parts = email.toLowerCase().split("@");

  if (parts.length !== 2 || parts[0].length === 0) {
    return false;
  }
  return parts[1] === "stu.kau.edu.sa" || parts[1] === "kau.edu.sa";
}

function hasNumber(text) {
  for (let i = 0; i < text.length; i++) {
    if (text[i] >= "0" && text[i] <= "9") {
      return true;
    }
  }
  return false;
}

function hasLetter(text) {
  let i = 0;
  while (i < text.length) {
    const ch = text[i].toLowerCase();
    if (ch >= "a" && ch <= "z") {
      return true;
    }
    i++;
  }
  return false;
}

function hasSpecial(text) {
  const specials = "!@#$%^&*()-_=+.,?";
  for (let i = 0; i < text.length; i++) {
    if (specials.indexOf(text[i]) !== -1) {
      return true;
    }
  }
  return false;
}

function showSuccess(form, text) {
  const old = document.getElementById("successMsg");
  if (old) {
    old.remove();
  }
  const msg = document.createElement("p");
  msg.id = "successMsg";
  msg.textContent = text;
  msg.style.color = "green";
  msg.style.fontWeight = "bold";
  form.appendChild(msg);
}

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // stop sending the form before validation
    let valid = true;

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (email === "") {
      showError("email", "emailError", "Please enter your email");
      valid = false;
    } else if (!isKauEmail(email)) {
      showError("email", "emailError", "Use your KAU email (@stu.kau.edu.sa)");
      valid = false;
    } else {
      clearError("email", "emailError");
    }

    if (password === "") {
      showError("password", "passwordError", "Please enter your password");
      valid = false;
    } else if (password.length < 8) {
      showError("password", "passwordError", "Password must be at least 8 characters");
      valid = false;
    } else {
      clearError("password", "passwordError");
    }

    if (valid) {
      showSuccess(loginForm, "Login successful! Welcome back.");
    }
  });
}

const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let valid = true;

    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const course = document.getElementById("course").value;
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirmPassword").value;

    if (name.length < 3) {
      showError("fullName", "nameError", "Name must be at least 3 characters");
      valid = false;
    } else if (hasNumber(name)) {
      showError("fullName", "nameError", "Name cannot contain numbers");
      valid = false;
    } else {
      clearError("fullName", "nameError");
    }

    if (email === "") {
      showError("email", "emailError", "Please enter your email");
      valid = false;
    } else if (!isKauEmail(email)) {
      showError("email", "emailError", "Use your KAU email (@stu.kau.edu.sa)");
      valid = false;
    } else {
      clearError("email", "emailError");
    }

    if (course === "") {
      showError("course", "courseError", "Please select a course");
      valid = false;
    } else {
      clearError("course", "courseError");
    }

    if (password.length < 8) {
      showError("password", "passwordError", "Password must be at least 8 characters");
      valid = false;
    } else if (!hasLetter(password)) {
      showError("password", "passwordError", "Password must contain at least one letter");
      valid = false;
    } else if (!hasNumber(password)) {
      showError("password", "passwordError", "Password must contain at least one number");
      valid = false;
    } else {
      clearError("password", "passwordError");
    }

    if (confirm === "") {
      showError("confirmPassword", "confirmError", "Please confirm your password");
      valid = false;
    } else if (confirm !== password) {
      showError("confirmPassword", "confirmError", "Passwords do not match");
      valid = false;
    } else {
      clearError("confirmPassword", "confirmError");
    }

    if (valid) {
      showSuccess(signupForm, "Account created successfully, " + name + "!");
    }
  });
}

const courseSelect = document.getElementById("course");

if (courseSelect) {
  const courseMessages = {
    CPIS358: "Find partners to study Internet Applications & Web Programming.",
    CPIS354: "Find partners to study Human-Computer Interaction (HCI).",
    CPIS357: "Find partners to study Quality."
  };

  courseSelect.addEventListener("change", function () {
    const info = document.getElementById("courseInfo");
    const value = courseSelect.value;

    if (value === "") {
      info.style.display = "none";
    } else {
      info.textContent = courseMessages[value];
      info.style.display = "block";
      info.style.backgroundColor = "#e8f4fd";
      info.style.padding = "8px";
      info.style.borderRadius = "6px";
    }
  });
}

const strengthPassword = document.getElementById("password");
const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");

if (signupForm && strengthPassword && strengthBar && strengthText) {
  strengthPassword.addEventListener("input", function () {
    const pass = strengthPassword.value;
    let score = 0;

    if (pass.length >= 8) { score++; }
    if (hasNumber(pass)) { score++; }
    if (hasLetter(pass)) { score++; }
    if (hasSpecial(pass)) { score++; }

    if (pass === "") {
      strengthBar.style.width = "0";
      strengthText.textContent = "";
    } else if (score <= 2) {
      strengthBar.style.width = "30%";
      strengthBar.style.background = "#c0392b";
      strengthText.textContent = "Strength: Weak";
      strengthText.style.color = "#c0392b";
    } else if (score === 3) {
      strengthBar.style.width = "65%";
      strengthBar.style.background = "#e67e22";
      strengthText.textContent = "Strength: Medium";
      strengthText.style.color = "#e67e22";
    } else {
      strengthBar.style.width = "100%";
      strengthBar.style.background = "#0b6e4f";
      strengthText.textContent = "Strength: Strong";
      strengthText.style.color = "#0b6e4f";
    }
  });
}

const bannerTitle = document.getElementById("bannerTitle");
const bannerText = document.getElementById("bannerText");

if (bannerTitle && bannerText) {
  
  const hour = new Date().getHours();
  let greeting;

  if (hour < 12) {
    greeting = "Good morning! ";
  } else if (hour < 18) {
    greeting = "Good afternoon! ";
  } else {
    greeting = "Good evening! ";
  }

  const messages = [
    "Stop studying alone. Match with classmates in your course.",
    "Share notes and explain hard points together.",
    "Keep each other motivated before every exam.",
    "Join a study group in minutes, not days."
  ];

  let current = 0;
  bannerText.textContent = greeting + messages[current];

  setInterval(function () {
    current = (current + 1) % messages.length;
    bannerText.textContent = greeting + messages[current];
  }, 4000);
}


const logoImg = document.querySelector(".site-header img");
const logoArea = document.querySelector("area");

function enlargeLogo() {
  logoImg.style.transform = "scale(1.08)";
  logoImg.style.opacity = "0.85";
  logoImg.style.transition = "transform 0.3s, opacity 0.3s";
}

function resetLogo() {
  logoImg.style.transform = "scale(1)";
  logoImg.style.opacity = "1";
}

if (logoImg) {
  logoImg.addEventListener("mouseover", enlargeLogo);
  logoImg.addEventListener("mouseout", resetLogo);

  if (logoArea) {
    logoArea.addEventListener("mouseover", enlargeLogo);
    logoArea.addEventListener("mouseout", resetLogo);
  }
}