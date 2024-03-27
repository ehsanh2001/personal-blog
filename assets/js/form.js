"use strict";

const usernameEl = document.getElementById("username");
const usernameLabelEl = document.getElementById("username-label");
const titleEl = document.getElementById("title");
const titleLabelEl = document.getElementById("title-label");
const contentEl = document.getElementById("content");
const contentLabelEl = document.getElementById("content-label");

document.getElementById("blog-form").addEventListener("submit", formSubmit);
document.getElementById("blog-form").addEventListener("keydown", clearError);

function formSubmit(event) {
    event.preventDefault();

    if (allInputsExist()) {
        storePost();
        clearInputs();
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
