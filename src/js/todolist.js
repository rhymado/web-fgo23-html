const addNewTodoBtn = document.querySelector("header button");

addNewTodoBtn.addEventListener("click", () => {
  const modal = document.querySelector(".modal-wrapper");
  modal.style.display = "block";
});

function closeModal() {
  const modal = document.querySelector(".modal-wrapper");
  modal.style.display = "none";
}

const closeModalBtn = document.querySelector(".modal .close");
// const submitNewTodoBtn = document.querySelector(".modal form button");

closeModalBtn.addEventListener("click", closeModal);
// submitNewTodoBtn.addEventListener("click", closeModal);

const todos = JSON.parse(localStorage.getItem("fgo23:todos") || "[]");

const todolist = document.querySelector(".todolist");
function showTodos() {
  if (todos.length < 1) return;
  while (todolist.firstChild) {
    todolist.removeChild(todolist.firstChild);
  }
  todos.forEach((todo) => {
    const card = document.createElement("div");
    const title = document.createElement("div");
    const body = document.createElement("div");
    const titleText = document.createElement("p");
    const bodyText = document.createElement("p");
    titleText.textContent = todo.title;
    bodyText.textContent = todo.body;
    title.append(titleText);
    title.classList.add("title");
    body.append(bodyText);
    body.className = "body";
    card.append(title, body);
    card.classList.add("card");
    todolist.append(card);
  });
}
showTodos();
todolist.addEventListener("new-todo", showTodos);

const submitNewTodoForm = document.querySelector(".modal form");
submitNewTodoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = e.target.title.value;
  const body = e.target.body.value;
  const obj = {
    title,
    body,
  };
  todos.push(obj);
  e.target.title.value = ""
  e.target.body.value = ""
  localStorage.setItem("fgo23:todos", JSON.stringify(todos));
  closeModal();
  todolist.dispatchEvent(new Event("new-todo"));
});