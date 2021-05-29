const UNCOMPLETED_LIST_TODO_ID = "todos";

const addBook = () => {
  const uncompletedTODOList = document.getElementById(UNCOMPLETED_LIST_TODO_ID);

  const titleBook = document.getElementById("title").value;
  const authorBook = document.getElementById("author").value;
  const dateBook = document.getElementById("date").value;
  // const isRead = document.getElementById("read").value;

  const todo = makeBook(titleBook, authorBook, dateBook, false);
  uncompletedTODOList.append(todo);

  // const todo = makeBook(titleBook, authorBook, dateBook, isRead);
  //   const todoObject = composeTodoObject(textTodo, timestamp, false);

  //   todo[TODO_ITEMID] = todoObject.id;
  //   todos.push(todoObject);

  // uncompletedTODOList.append(todo);
  //   updateDataToStorage();
};

const COMPLETED_LIST_TODO_ID = "completed-todos";
function createButton(buttonTypeClass, eventListener) {
  const button = document.createElement("button");
  button.classList.add(buttonTypeClass);
  button.addEventListener("click", function (event) {
    eventListener(event);
  });
  return button;
}

// Checklist button
function createCheckButton() {
  return createButton("check-button", function (event) {
    addTaskToCompleted(event.target.parentElement);
  });
}

//remove button
function createTrashButton() {
  return createButton("trash-button", function (event) {
    removeTaskFromCompleted(event.target.parentElement);
  });
}
// Undo Checlist
function createUndoButton() {
  return createButton("undo-button", function (event) {
    undoTaskFromCompleted(event.target.parentElement);
  });
}

function addTaskToCompleted(taskElement) {
  const taskTitle = taskElement.querySelector(".inner > h2").innerText;
  const textAuthor = taskElement.querySelector(".inner > p").innerText;
  const textDate = taskElement.querySelector(".inner > span").innerText;

  const newTodo = makeBook(taskTitle, textAuthor, textDate, true);
  const listCompleted = document.getElementById(COMPLETED_LIST_TODO_ID);
  listCompleted.append(newTodo);

  taskElement.remove();
}

function undoTaskFromCompleted(taskElement) {
  const listUncompleted = document.getElementById(UNCOMPLETED_LIST_TODO_ID);

  const taskTitle = taskElement.querySelector(".inner > h2").innerText;
  const textAuthor = taskElement.querySelector(".inner > p").innerText;
  const textDate = taskElement.querySelector(".inner > span").innerText;

  const newTodo = makeBook(taskTitle, textAuthor, textDate, false);

  listUncompleted.append(newTodo);
  taskElement.remove();
}

function removeTaskFromCompleted(taskElement) {
  taskElement.remove();
}

const makeBook = (title, author, date, isRead) => {
  const textTitle = document.createElement("h2");
  textTitle.innerText = title;

  const textAuthor = document.createElement("p");
  textAuthor.innerText = author;

  const textDate = document.createElement("span");
  textDate.innerText = date;

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
