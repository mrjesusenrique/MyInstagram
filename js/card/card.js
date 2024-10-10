import { getReels } from "../api/api.js";
const profile = '../../assets/icons/usuario.png';

const cardContainer = document.querySelector("#section-container");

const cardReel = (reel) => {
  const { id, imagen, titulo, fecha } = reel;

  const card = document.createElement("article");
  card.setAttribute("key", id);

  card.innerHTML = `
    <div class="flex flex-col justify-center w-full p-5">
      <div class="flex flex-row text-gray-900 py-3 items-center">
        <img class="w-8 h-8" src="${profile}" alt="profile"/>
        <p class="ml-3">myusername</p>
      </div>
      <div class="flex flex-col">
        <img class="w-full h-[15rem]" src="${imagen}" alt="${titulo}" />
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
  const spinner = document.querySelector("#spinner");
  spinner.style.display = "flex";

  getReels()
    .then((reels) => {
      spinner.style.display = "none";
      reels.forEach((reel) => {
        const cardElement = cardReel(reel);
        cardContainer.appendChild(cardElement);
      });
    })
    .catch((error) => {
      spinner.style.display = "none";
      console.warn(`Error al obtener los reels ${error}`);
    });
};
