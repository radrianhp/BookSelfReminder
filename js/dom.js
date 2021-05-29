const UNCOMPLETED_BOOK_ID = "todos";
const COMPLETED_BOOK_ID = "completed-todos";
const TODO_ITEMID = "itemId";

const addBook = () => {
  const titleBook = document.getElementById("title").value;
  const authorBook = document.getElementById("author").value;
  const dateBook = document.getElementById("date").value;
  const isRead = document.getElementById("read").checked;

  const todo = makeBook(titleBook, authorBook, dateBook, isRead);
  const todoObject = composeTodoObject(titleBook, authorBook, dateBook, isRead);

  todo[TODO_ITEMID] = todoObject.id;
  todos.push(todoObject);

  let target;
  if (isRead) {
    target = COMPLETED_BOOK_ID;
  } else {
    target = UNCOMPLETED_BOOK_ID;
  }

  document.getElementById(target).appendChild(todo);
  updateDataToStorage();
};

const getSearchBook = () => {
  let search = document.getElementById("search").value;
  let itemBook = document.getElementsByClassName("item");
  for (itemSearch of itemBook) {
    let textItem = itemSearch.innerText.toUpperCase();
    let checkItem = textItem.search(search.toUpperCase());

    if (checkItem == -1) {
      console.log(itemSearch.style);
      itemSearch.style.display = "none";
    } else {
      console.log(checkItem);
      itemSearch.style.display = "";
    }
  }
};

function createButton(buttonTypeClass, buttonId, eventListener) {
  const button = document.createElement("button");
  button.classList.add(buttonTypeClass);
  button.id = buttonId;
  button.addEventListener("click", function (event) {
    eventListener(event);
  });
  return button;

  // buttonRemove.onclick = () => {
  //   modalDelete.style.display = "block";
  // };
}

// Checklist button
function createCheckButton() {
  return createButton("check-button", "checked", function (event) {
    addTaskToCompleted(event.target.parentElement);
  });
}

//remove button
function createTrashButton() {
  return createButton("trash-button", "remove", function (event) {
    removeTaskFromCompleted(event.target.parentElement);
  });
}
// Undo Checlist
function createUndoButton() {
  return createButton("undo-button", "unchecked", function (event) {
    undoTaskFromCompleted(event.target.parentElement);
  });
}

function addTaskToCompleted(taskElement) {
  const taskTitle = taskElement.querySelector(".inner > h2").innerText;
  const textAuthor = taskElement.querySelector(".inner > p").innerText;
  const textDate = taskElement.querySelector(".inner > span").innerText;

  const newTodo = makeBook(taskTitle, textAuthor, textDate, true);
  const todo = findTodo(taskElement[TODO_ITEMID]);
  todo.isRead = true;
  newTodo[TODO_ITEMID] = todo.id;

  const listCompleted = document.getElementById(COMPLETED_BOOK_ID);
  listCompleted.append(newTodo);

  taskElement.remove();

  updateDataToStorage();
}

function undoTaskFromCompleted(taskElement) {
  const listUncompleted = document.getElementById(UNCOMPLETED_BOOK_ID);

  const taskTitle = taskElement.querySelector(".inner > h2").innerText;
  const textAuthor = taskElement.querySelector(".inner > p").innerText;
  const textDate = taskElement.querySelector(".inner > span").innerText;

  const newTodo = makeBook(taskTitle, textAuthor, textDate, false);

  const todo = findTodo(taskElement[TODO_ITEMID]);
  todo.isRead = false;
  newTodo[TODO_ITEMID] = todo.id;

  listUncompleted.append(newTodo);
  taskElement.remove();

  updateDataToStorage();
}

function removeTaskFromCompleted(taskElement) {
  const todoPosition = findTodoIndex(taskElement[TODO_ITEMID]);
  todos.splice(todoPosition, 1);

  taskElement.remove();

  updateDataToStorage();
}

const makeBook = (title, author, date, isRead) => {
  const textTitle = document.createElement("h2");
  textTitle.innerText = title;

  const textAuthor = document.createElement("p");
  textAuthor.innerText = "Author: " + author;

  const textDate = document.createElement("span");
  textDate.innerText = "Date: " + date;

  const textContainer = document.createElement("div");
  textContainer.classList.add("inner");
  textContainer.append(textTitle, textAuthor, textDate);

  const container = document.createElement("div");
  container.classList.add("item", "shadow");
  container.append(textContainer);

  if (isRead) {
    container.append(createUndoButton(), createTrashButton());
  } else {
    container.append(createCheckButton());
  }

  return container;
};
