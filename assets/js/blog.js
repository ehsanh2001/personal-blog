"use strict";

document.addEventListener("DOMContentLoaded", loadData);

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
