document.addEventListener("DOMContentLoaded", () => {
  const submitForm = document.getElementById("formBook");
  const buttonAdd = document.getElementById("addItem");
  const modalAdd = document.getElementById("modalItem");
  const span = document.getElementsByClassName("close")[0];

  const searchForm = document.getElementById("formSearch");

  const spanDelete = document.getElementsByClassName("closeDelete")[0];

  const modalDelete = document.getElementById("modalDelete");

  submitForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addBook();
    modalAdd.style.display = "none";
  });

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    getSearchBook();
  });

  buttonAdd.onclick = () => {
    modalAdd.style.display = "block";
  };

  span.onclick = () => {
    modalAdd.style.display = "none";
  };

  spanDelete.onclick = () => {
    modalDelete.style.display = "none";
  };

  window.onclick = (event) => {
    if (event.target === modalAdd) {
      modalAdd.style.display = "none";
    } else if (event.target === modalDelete) {
      modalDelete.style.display = "none";
    }
  };

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener("ondatasaved", () => {
  console.log("Data berhasil disimpan.");
});
document.addEventListener("ondataloaded", () => {
  refreshDataFromTodos();
});
