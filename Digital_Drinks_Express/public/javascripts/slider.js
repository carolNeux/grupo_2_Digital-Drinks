//toggle nav
const toogle_button = document.getElementsByClassName ('toggle_nav') [0];
const navbar_links = document.getElementsByClassName ('navigation_bar')[0];

toogle_button.addEventListener ('click', ()=>{
    navbar_links.classList.toggle ('active')
});

let slideIndex = 0;
showSlides();
//slider
function showSlides() {
  let i;
  let slides = document.getElementsByClassName("contenido-slider");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "flex";
  setTimeout(showSlides, 5000); // Change image every 2 seconds
} 