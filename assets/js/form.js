"use strict";

const SUN_EMOJI = "☀️";
const MOON_EMOJI = "🌙";

const usernameEl = document.getElementById("username");
const usernameLabelEl = document.getElementById("username-label");
const titleEl = document.getElementById("title");
const titleLabelEl = document.getElementById("title-label");
const contentEl = document.getElementById("content");
const contentLabelEl = document.getElementById("content-label");

const btnTheme = document.getElementById("btn-theme");

document.getElementById("blog-form").addEventListener("submit", formSubmit);
document.getElementById("blog-form").addEventListener("keydown", clearError);
btnTheme.addEventListener("click", changeTheme);

loadTheme();

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

function formSubmit(event) {
    event.preventDefault();

    if (allInputsExist()) {
        storePost();
        clearInputs();
        location.href = "./blog.html";
    }
}

function clearInputs() {
    usernameEl.value = "";
    titleEl.value = "";
    contentEl.value = "";
    usernameEl.focus();
}

function storePost() {
    //if there is no data then parse() returns null so the value of blogData will be []
    let blogData = JSON.parse(localStorage.getItem("blogData")) || [];

    let newPost = {
        username: usernameEl.value.trim(),
        title: titleEl.value.trim(),
        content: contentEl.value.trim(),
    };

    blogData.push(newPost);
    localStorage.setItem("blogData", JSON.stringify(blogData));
}

function allInputsExist() {
    let result = true;
    if (usernameEl.value.trim() === "") {
        usernameLabelEl.classList.add("error");
        result = false;
    }
    if (titleEl.value.trim() === "") {
        titleLabelEl.classList.add("error");
        result = false;
    }
    if (contentEl.value.trim() === "") {
        contentLabelEl.classList.add("error");
        result = false;
    }
    return result;
}

function clearError(event) {
    if (
        (event.target.tagName === "INPUT" && event.target.type === "text") ||
        event.target.tagName === "TEXTAREA"
    ) {
        document
            .getElementById(event.target.id + "-label")
            .classList.remove("error");
    }
}

// To change the theme we not the rgb value of colors
function changeTheme() {
    const root = document.documentElement;

    if (btnTheme.textContent === SUN_EMOJI) {
        btnTheme.textContent = MOON_EMOJI;
        localStorage.setItem("theme", "MOON");

        root.style.setProperty("--body-bg-color", "black");
        root.style.setProperty("--body-color", "white");
        root.style.setProperty("--link-color", "rgb(255,255,0)");
        root.style.setProperty("--left-div-color1", "rgb(72,200,255)");
        root.style.setProperty("--left-div-color2", "rgb(2,50,226)");
        root.style.setProperty("--left-div-color3", "rgb(3,79,186)");
    } else {
        btnTheme.textContent = SUN_EMOJI;
        localStorage.setItem("theme", "SUN");
        
        root.style.setProperty("--body-bg-color", "white");
        root.style.setProperty("--body-color", "black");
        root.style.setProperty("--link-color", "rgb(0,0,255)");
        root.style.setProperty("--left-div-color1", "rgb(183, 55, 0)");
        root.style.setProperty("--left-div-color2", "rgb(253, 205, 29)");
        root.style.setProperty("--left-div-color3", "rgb(252, 176, 69)");
    }
}
