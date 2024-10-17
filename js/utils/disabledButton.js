const fileInput = document.querySelector("#file-input");
const fileLabel = document.querySelector("label[for='file-input']");

const updateFileInputState = () => {
  if (!navigator.onLine) {
    fileInput.disabled = true;
    fileLabel.classList.add("bg-gray-500", "cursor-not-allowed");
    fileLabel.classList.remove(
      "bg-blue-500",
      "hover:bg-blue-600",
      "cursor-pointer"
    );
  } else {
    fileInput.disabled = false;
    fileLabel.classList.remove("bg-gray-500", "cursor-not-allowed");
    fileLabel.classList.add(
      "bg-blue-500",
      "hover:bg-blue-600",
      "cursor-pointer"
    );
  }
};

export default updateFileInputState;
