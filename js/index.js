import { createCardReels } from "./card/card.js";
import updateFileInputState from "./utils/disabledButton.js";

createCardReels();

window.addEventListener("load", () => {
  const fileInput = document.querySelector("#file-input");

  updateFileInputState();

  window.addEventListener("offline", () => {
    updateFileInputState();
  });

  window.addEventListener("online", () => {
    updateFileInputState();
  });

  fileInput.addEventListener("change", () => {
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];

      new Compressor(file, {
        success(compressedFile) {
          const reader = new FileReader();

          reader.onloadend = () => {
            sessionStorage.setItem("selectedImage", reader.result);
            window.location.href = "camera.html";
          };
          reader.readAsDataURL(compressedFile);
        },
        error(err) {
          console.error("Error al comprimir la imagen:", err);
        },
      });
    }
  });
});
