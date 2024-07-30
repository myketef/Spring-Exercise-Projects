document.addEventListener("DOMContentLoaded", function () {
  let todoForm = document.getElementById("todoForm");
  let todoList = document.getElementById("todoList");

  todoForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let removeButton = document.createElement("button");
    let newTodo = document.createElement("li");

    removeButton.innerText = "X";
    newTodo.innerText = document.getElementById("task").value;

    todoList.appendChild(newTodo);
    newTodo.appendChild(removeButton);

    todoForm.reset();
  });

  todoList.addEventListener("click", function (event) {
    const targetTagToLowerCase = event.target.tagName.toLowerCase();

    if (targetTagToLowerCase === "li") {
      event.target.style.textDecoration = "line-through";
    } else if (targetTagToLowerCase === "button") {
      event.target.parentNode.remove();
    }
  });
});
