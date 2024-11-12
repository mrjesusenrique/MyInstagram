import getCurrentDate from "../utils/getCurrentDate.js";

window.addEventListener("load", () => {
  const cancelBack = document.querySelector("#cancel-back");

  cancelBack.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  const base64Image = sessionStorage.getItem("selectedImage");

  if (!base64Image) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Por favor, selecciona una imagen.",
    }).then(() => {
      window.location.href = "index.html";
    });
    return;
  }

  const imageElement = document.querySelector("img");
  imageElement.src = base64Image;

  const spinner = document.querySelector("#spinner");

  document.querySelector("#reelForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    spinner.classList.remove("hidden");

    const imageTitle = document.querySelector("#input-text").value;
    const currentDate = getCurrentDate();

    const data = {
      titulo: imageTitle,
      fecha: currentDate,
      imagen: base64Image,
    };

    fetch(
      "https://6707d80a8e86a8d9e42d284d.mockapi.io/istea/api/v1/reels",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => response.json())
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Reel enviado con éxito",
        }).then(() => {
          window.location.href = "index.html";
        });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un error al enviar el reel",
        }).then(() => {
          window.location.href = "index.html";
        });
      })
      .finally(() => {
        spinner.classList.add("hidden");
      });
  });
});
