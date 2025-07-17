const floatingHeartsContainer = document.getElementById("floatingHearts");
const hearts = document.querySelectorAll(".gray-heart, .red-heart");
const message1 = document.getElementById("message1");
const message2 = document.getElementById("message2");
const message3 = document.getElementById("message3");

let currentMessageIndex = 0;
const messages = [message1, message2, message3];

function createFloatingHeart() {
  const heart = document.createElement("div");
  heart.className = "floating-heart";
  heart.style.left = Math.random() * 100 + "%";
  heart.style.animationDelay = Math.random() * 2 + "s";
  heart.style.animationDuration = Math.random() * 3 + 2 + "s";
  floatingHeartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 5000);
}

function showNextMessage() {
  const currentMessage = messages[currentMessageIndex];

  // Hiện tin nhắn hiện tại
  currentMessage.classList.add("show");

  // Ẩn tin nhắn sau 3 giây
  setTimeout(() => {
    currentMessage.classList.remove("show");

    // Chuyển sang tin nhắn tiếp theo
    currentMessageIndex = (currentMessageIndex + 1) % messages.length;

    // Nếu chưa hết tin nhắn, hiện tin nhắn tiếp theo sau 1 giây
    if (currentMessageIndex !== 0) {
      setTimeout(() => {
        showNextMessage();
      }, 1000);
    } else {
      // Reset về tin nhắn đầu tiên cho lần click tiếp theo
      currentMessageIndex = 0;
    }
  }, 3000);
}

hearts.forEach((heart) => {
  heart.addEventListener("click", () => {
    // Reset về tin nhắn đầu tiên
    currentMessageIndex = 0;

    // Ẩn tất cả tin nhắn trước khi bắt đầu
    messages.forEach((msg) => msg.classList.remove("show"));

    // Bắt đầu chuỗi tin nhắn
    showNextMessage();

    // Tạo floating hearts
    for (let i = 0; i < 5; i++) {
      setTimeout(() => createFloatingHeart(), i * 200);
    }
  });
});

// Create occasional floating hearts
setInterval(createFloatingHeart, 2000);
