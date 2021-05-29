const STORAGE_KEY = "BOOK_SELF_REMINDER";

let todos = [];

function isStorageExist() /* boolean */ {
  if (typeof Storage === undefined) {
    alert("Browser kamu tidak mendukung local storage");
    return false;
  }
  return true;
}

function saveData() {
  const parsed = JSON.stringify(todos);
  localStorage.setItem(STORAGE_KEY, parsed);
  document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);

  let data = JSON.parse(serializedData);

  if (data !== null) todos = data;

  document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
  if (isStorageExist()) saveData();
}

function composeTodoObject(title, author, date, isRead) {
  return {
    id: +new Date(),
    title,
    author,
    date,
    isRead,
  };
}

function findTodo(todoId) {
  for (todo of todos) {
    if (todo.id === todoId) return todo;
  }
  return null;
}

function findTodoIndex(todoId) {
  let index = 0;
  for (todo of todos) {
    if (todo.id === todoId) return index;

    index++;
  }

  return -1;
}

function refreshDataFromTodos() {
  const listUncompleted = document.getElementById(UNCOMPLETED_BOOK_ID);
  let listCompleted = document.getElementById(COMPLETED_BOOK_ID);

  for (todo of todos) {
    const newTodo = makeBook(todo.title, todo.author, todo.date, todo.isRead);
    newTodo[TODO_ITEMID] = todo.id;

    if (todo.isRead) {
      listCompleted.append(newTodo);
    } else {
      listUncompleted.append(newTodo);
    }
  }
}
