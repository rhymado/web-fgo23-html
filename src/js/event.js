// HTML onevent
function changeFontSize(by) {
  if (typeof by !== "number") return console.log("invalid input");
  const el = document.querySelector("section:nth-of-type(1) > div > p");
  //   console.log(el);
  const size = parseInt(el.getAttribute("data-size"));
  //   console.log(size);
  const newSize = size + by;
  el.setAttribute("data-size", newSize);
  //   console.log(el.style);
  el.style.fontSize = `${newSize}px`;
  //   console.log("success");
}

// DOM event listener
const buttons = document.querySelectorAll("section:nth-of-type(1) > div > p:nth-of-type(2) ~ button");
for (const button of buttons.values()) {
  let by = 1;
  if (button.textContent.toLowerCase().includes("decrease")) by = -1;
  button.addEventListener("click", (e) => {
    e.stopPropagation();
    changeFontSize(by);
  });
}

const form = document.querySelector("section > form");

form.addEventListener("submit", onSubmitHandler);

function onSubmitHandler(event) {
  event.preventDefault();
  const email = event.target["email"].value;
  const password = event.target["password"].value;
  const gender = event.target.gender.value;
  const domisili = event.target.domisili.value;
  //   validasi
  let error = 0;
  if (!validateInput(email, "email")) {
    // console.log("Email Salah Format");
    // emailWrapper.dispatchEvent(new CustomEvent("error", { detail: { message: "Email Salah Format" } }));
    emailWrapper.dispatchEvent(new Event("error"));
    // return;
    error++;
  }
  if (!validateInput(password, "password")) {
    // console.log("Password Minimum 6 Karater");
    // passwordWrapper.dispatchEvent(new CustomEvent("error", { detail: { message: "Password Minimum 6 Karakter" } }));
    passwordWrapper.dispatchEvent(new Event("error"));
    // return;
    error++;
  }
  if (error > 0) return;
  //  JSON
  const bodyJSON = {
    email,
    password,
    gender,
    domisili,
  };
  console.log(JSON.stringify(bodyJSON));
  //   formdata
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  formData.append("gender", gender);
  formData.append("domisili", domisili);
  formData.forEach((value, key) => {
    console.log(`${key}: ${value}`);
  });
  // url encoded
  const bodyUrl = new URLSearchParams({
    email,
    password,
    gender,
    domisili,
  });
  console.log(bodyUrl.toString());
  // menggunakan input element secara manual
  const inputs = event.target.querySelectorAll("input");
  const selects = event.target.querySelectorAll("select");
  // tangani input
  const bodyManual = {};
  for (const input of inputs) {
    if (input.type === "radio") {
      if (input.checked) Object.assign(bodyManual, { [input.name]: input.value });
      continue;
    }
    Object.assign(bodyManual, { [input.name]: input.value });
  }
  for (const select of selects) {
    Object.assign(bodyManual, { [select.name]: select.value });
  }
  const url = [];
  for (const key in bodyManual) {
    const encodedKey = encodeURIComponent(key);
    const encodedValue = encodeURIComponent(bodyManual[key]);
    url.push(`${encodedKey}=${encodedValue}`);
  }
  console.log(url.join("&"));
}

function validateInput(value, type) {
  // empty validation
  if (value.length == 0) {
    return false;
  }
  // format validation
  switch (type) {
    case "email":
      // harus ada symbol @
      //   if (!value.includes("@")) return false;
      //   if (value.indexOf("@") == 0) return false;
      // pattern menggunakan regex
      const emailRe = /^[a-zA-Z0-9_\-]+@[a-z0-9]+\.(com|gov|net)/;
      return emailRe.test(value);
    // break;
    case "password":
      // panjang minimum 6 karakter
      if (value.length < 6) return false;
      break;
    // const passRe = /()/
    default:
      return false;
  }
  return true;
}

// create event
// const errorEvent = new Event("error");

const emailWrapper = document.querySelector("form div:nth-of-type(1)");
const passwordWrapper = document.querySelector("form div:nth-of-type(2)");

emailWrapper.addEventListener("error", function (event) {
  // const p = document.createElement("p");
  // p.textContent = event.detail.message;
  // p.style.color = "red";
  // p.style.margin = 0;
  // p.style.fontStyle = "italic";
  // p.style.fontSize = ".6rem";
  // this.append(p);
  this.querySelector("p").style.visibility = "visible";
});
passwordWrapper.addEventListener("error", function (event) {
  // const p = document.createElement("p");
  // p.textContent = event.detail.message;
  // p.style.color = "red";
  // p.style.margin = 0;
  // p.style.fontStyle = "italic";
  // p.style.fontSize = ".6rem";
  // this.append(p);
  this.querySelector("p").style.visibility = "visible";
});
