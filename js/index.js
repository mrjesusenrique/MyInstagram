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
      const reader = new FileReader();

      reader.onloadend = () => {
        const image = new Image();

        image.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          canvas.width = image.width;
          canvas.height = image.height;
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

          let quality = 0.3;
          let compressedDataUrl = canvas.toDataURL("image/webp", quality);

          while (getImageSizeInKB(compressedDataUrl) > 200 && quality > 0.1) {
            quality -= 0.1;
            compressedDataUrl = canvas.toDataURL("image/webp", quality);
          }

          sessionStorage.setItem("selectedImage", compressedDataUrl);
          window.location.href = "camera.html";
        };

        image.src = reader.result;
      };

      reader.readAsDataURL(file);
    }
  });

  function getImageSizeInKB(dataURL) {
    const base64String = dataURL.split(",")[1];
    const binaryString = atob(base64String);
    return Math.round(binaryString.length / 1024);
  }
});
