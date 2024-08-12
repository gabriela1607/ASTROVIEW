let currentSlide = 0;
const slides = document.querySelectorAll('.carrossel-de-imagens div');
const totalSlides = slides.length;

document.querySelector('.next').addEventListener('click', () => {
    slides[currentSlide].style.transform = 'translateX(-100%)';
    currentSlide = (currentSlide + 1) % totalSlides;
    slides[currentSlide].style.transform = 'translateX(0)';
});

document.querySelector('.prev').addEventListener('click', () => {
    slides[currentSlide].style.transform = 'translateX(100%)';
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    slides[currentSlide].style.transform = 'translateX(0)';
});