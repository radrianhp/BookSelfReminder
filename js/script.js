document.addEventListener("DOMContentLoaded", () => {
  const submitForm = document.getElementById("formBook");
  const buttonAdd = document.getElementById("addItem");
  const modalAdd = document.getElementById("modalItem");
  const span = document.getElementsByClassName("close")[0];

  submitForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addBook();
    modalAdd.style.display = "none";
  });

  // When the user clicks the button, open the modal
  buttonAdd.onclick = () => {
    modalAdd.style.display = "block";
  };

  // When the user clicks on <span> (x), close the modal
  span.onclick = () => {
    modalAdd.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = (event) => {
    if (event.target === modalAdd) {
      modalAdd.style.display = "none";
    }
  };
});
