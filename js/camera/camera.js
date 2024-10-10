const fileInput = document.querySelector("#file-input");

fileInput.addEventListener("change", () => {
  if (fileInput.files.length > 0) {
    window.location.href = "camera.html";
  }
});
