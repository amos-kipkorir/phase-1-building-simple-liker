// Provided function (you already have this)
function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}

// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
  const errorModal = document.getElementById("modal");
  const hearts = document.querySelectorAll(".like-glyph");

  // Initially hide the error modal
  errorModal.classList.add("hidden");

  hearts.forEach((heart) => {
    heart.addEventListener("click", () => {
      mimicServerCall()
        .then(() => {
          if (heart.innerText === "♡") {
            heart.innerText = "♥";
            heart.classList.add("activated-heart");
          } else {
            heart.innerText = "♡";
            heart.classList.remove("activated-heart");
          }
        })
        .catch((error) => {
          // Show error modal with message
          errorModal.classList.remove("hidden");
          const modalMessage = document.getElementById("modal-message");
          if (modalMessage) {
            modalMessage.innerText = error;
          }

          // Hide modal after 3 seconds
          setTimeout(() => {
            errorModal.classList.add("hidden");
          }, 3000);
        });
    });
  });
});
