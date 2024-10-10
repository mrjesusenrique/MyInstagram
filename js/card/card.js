import { getReels } from "../api/api.js";

const cardContainer = document.querySelector("#section-container");

const cardReel = (reel) => {
  const { id, imagen, titulo, fecha } = reel;

  const card = document.createElement("article");
  card.setAttribute("key", id);

  card.innerHTML = `
    <div class="flex flex-col justify-center w-full p-5">
      <div class="text-gray-900 py-3"><p>myusername</p></div>
      <div class="flex flex-col">
        <img class="w-full" src="${imagen}" alt="${titulo}" />
        <div class="flex flex-row justify-between mt-6">
          <div>
            <h5 class="text-gray-900 font-bold" >${titulo}</h5>
          </div>
          <div>
            <p class="text-gray-500">${fecha}</p>
          </div>
        </div>
      </div>
    </div>
  `;
  return card;
};

export const createCardReels = () => {
  getReels()
    .then((reels) => {
      reels.forEach((reel) => {
        const cardElement = cardReel(reel);
        cardContainer.appendChild(cardElement);
      });
    })
    .catch((error) => {
      console.warn(`Error al obtener los reels ${error}`);
    });
};
