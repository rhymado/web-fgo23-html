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
  if (!validateInput(email, "email")) {
    console.log("Email Salah Format");
    return;
  }
  if (!validateInput(password, "password")) {
    console.log("Password Minimum 6 Karater");
    return;
  }
  //  JSON
  const bodyJSON = {
    email,
    password,
    gender,
    domisili,
  };
  console.log(bodyJSON);
  //   formdata
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  formData.append("gender", gender);
  formData.append("domisili", domisili);
  formData.forEach((value, key) => {
    console.log(`${key}: ${value}`);
  });
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
