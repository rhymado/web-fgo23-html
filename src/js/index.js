console.log("Hello World");

const symbol = document.getElementById("symbol");
// console.log(symbol);
const btn = document.getElementsByClassName("btn");
// console.log(btn);
const divSiblingofAside = document.querySelector("aside + div");
// console.log(divSiblingofAside);
const imgSiblingofForm = document.querySelector("form + img");
// console.log(imgSiblingofForm);
const navLink = document.querySelectorAll("nav > ul > li");
// console.log(navText);

imgSiblingofForm.width = 300;
imgSiblingofForm.height = 400;

const input = document.querySelector('input[type="email"]');
// if (input.getAttribute("type") === "email")
input["type"] = "text";
input.required = false;
input.className = "input";
input.classList.add("cool");
input.className = "cool input";

const headingTitle = document.querySelector("h1");
headingTitle.style["color"] = "white";

const navTitle = document.querySelector("aside > div > p");
navTitle.style["color"] = "white";
navTitle.style["font-family"] = "monospace";

const desc = document.querySelector("main > div");
console.log(desc.textContent);
console.log(desc.innerHTML);

// desc.textContent = "Materi <b>DOM</b> Modification";
// desc.innerHTML = "Materi <b>DOM</b> Modification"

const li = document.createElement("li");

const a = document.createElement("a");
a.href = "http://www.google.com/";
a.textContent = "New Link";

li.append(a);

// console.log(li)
const ul = document.querySelector("nav > ul");
// ul.prepend(li);
// ul.insertAdjacentElement("afterbegin", li);
// ul.append(li);
ul.insertAdjacentElement("beforeend", li);
// ul.appendChild(li);

console.log(navLink);
console.log(ul.children);

const newImg = document.createElement("img");
newImg.src = imgSiblingofForm.getAttribute("src");
newImg.alt = "Gambar Spiderman Kedua";
newImg.width = 200;
newImg.height = 200;
// console.log(newImg)
imgSiblingofForm.insertAdjacentElement("afterend", newImg);

// const imgLinks = [""]

// imgLinks.forEach