function createTask() {
  const newBlock = document.getElementById("new");
  const blur = document.querySelector(".container");

  if (newBlock.style.display === "none" || newBlock.style.display === "") {
    newBlock.style.display = "flex";
    blur.classList.add("blur");
  } else {
    newBlock.style.display = "none";
    blur.classList.remove("blur");
  }
}
