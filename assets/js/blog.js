"use strict";

const SUN_EMOJI = "☀️";
const MOON_EMOJI = "🌙";

const btnTheme = document.getElementById("btn-theme");
btnTheme.addEventListener("click", changeTheme);

document.addEventListener("DOMContentLoaded", loadData);
document
    .getElementById("btnBack")
    .addEventListener("click", () => (location.href = "./index.html"));

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
    if (btnTheme.textContent === SUN_EMOJI) btnTheme.textContent = MOON_EMOJI;
    else btnTheme.textContent = SUN_EMOJI;
}
