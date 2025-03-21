let count = 0;
let bd = document.querySelector("body");
let theme = document.querySelector(".theme");
let heading = document.querySelector("h1");
let posts = document.querySelectorAll(".post");
let users = document.querySelectorAll(".user");

// Function to apply the theme
function applyTheme(themeMode) {
    if (themeMode === "light") {
        bd.style.backgroundColor = `#FFEDFA`;
        heading.style.color = `#EC7FA9`;
        posts.forEach(post => post.style.backgroundColor= `#FFB8E0`);
        users.forEach(user => user.style.backgroundColor= `#BE5985`);
    } else {
        bd.style.backgroundColor = '#D1F8EF';
        heading.style.color = `#3674B5`;
        posts.forEach(post => post.style.backgroundColor= `#A1E3F9`);
        users.forEach(user => user.style.backgroundColor= `#578FCA`);
    }
}

// Load theme from localStorage when page loads
let savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    applyTheme(savedTheme);
} else {
    applyTheme("dark"); // Default theme
}

// Theme button click event
theme.addEventListener("click", function () {
    count++;
    
    let newTheme = count % 2 === 0 ? "light" : "dark";
    localStorage.setItem("theme", newTheme); // Save theme choice
    applyTheme(newTheme); // Apply the new theme
});
