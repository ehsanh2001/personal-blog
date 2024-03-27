"use strict";

const SUN_EMOJI = "☀️";
const MOON_EMOJI = "🌙";

const btnTheme = document.getElementById("btn-theme");
btnTheme.addEventListener("click", changeTheme);

document.addEventListener("DOMContentLoaded", createPage);
document
    .getElementById("btnBack")
    .addEventListener("click", () => (location.href = "./index.html"));

function createPage() {
    loadTheme();
    loadData();
}

function loadTheme() {
    const theme = localStorage.getItem("theme") || "SUN";

    //  the changeTheme() toggles the theme, so if the theme is stored as SUN we change the btnTheme to MOON_EMOJI and
    // then call changeTheme() and vice versa for MOON
    if (theme === "SUN") {
        btnTheme.textContent = MOON_EMOJI;
    } else {
        btnTheme.textContent = SUN_EMOJI;
    }
    changeTheme();
}

function loadData() {
    const blogData = JSON.parse(localStorage.getItem("blogData")) || [];
    const mainEl = document.getElementById("main");

    for (let blogPost of blogData) {
        const cardDiv = createCard(blogPost);
        mainEl.appendChild(cardDiv);
    }
}

//each card is a container for one blog post
function createCard(blogPost) {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");

    const usernameDiv = document.createElement("div");
    usernameDiv.classList.add("username");
    usernameDiv.textContent = blogPost.username;
    cardDiv.appendChild(usernameDiv);

    const titleDiv = document.createElement("div");
    titleDiv.classList.add("title");
    titleDiv.textContent = blogPost.title;
    cardDiv.appendChild(titleDiv);

    const contentEl = document.createElement("pre");
    contentEl.classList.add("content");
    contentEl.innerHTML = blogPost.content;
    cardDiv.appendChild(contentEl);
    return cardDiv;
}

function changeTheme() {
    const root = document.documentElement;

    if (btnTheme.textContent === SUN_EMOJI) {
        btnTheme.textContent = MOON_EMOJI;
        localStorage.setItem("theme", "MOON");

        root.style.setProperty("--body-bg-color", "rgb(21,17,17)");
        root.style.setProperty("--body-color", "white");
        root.style.setProperty("--border-color", "rgb(155,155,155)");
        root.style.setProperty("--card-bg-color", "rgb(17,17,17)");
        root.style.setProperty("--card-border-color", "white");
        root.style.setProperty("--link-color", "rgb(255,255,0)");
    } else {
        btnTheme.textContent = SUN_EMOJI;
        localStorage.setItem("theme", "SUN");

        root.style.setProperty("--body-bg-color", "rgb(234, 238, 238)");
        root.style.setProperty("--body-color", "black");
        root.style.setProperty("--border-color", "rgb(100, 100, 100)");
        root.style.setProperty("--card-bg-color", "rgb(238, 238, 238)");
        root.style.setProperty("--card-border-color", "black");
        root.style.setProperty("--link-color", "rgb(0,0,255)");
    }
}
