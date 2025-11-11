// Typing Animation
const typingText = document.querySelector('.typing');
const words = ["Frontend Developer", "Web Designer", "Creative Coder"];
let i = 0, j = 0, currentWord = '', isDeleting = false;

function type() {
  currentWord = words[i];
  typingText.textContent = currentWord.substring(0, j);

  if (!isDeleting && j < currentWord.length) {
    j++;
    setTimeout(type, 120);
  } else if (isDeleting && j > 0) {
    j--;
    setTimeout(type, 60);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) i = (i + 1) % words.length;
    setTimeout(type, 1000);
  }
}
type();
