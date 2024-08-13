let currentSlide = 0;
const slides = document.querySelectorAll('.carrossel .slide a');
const totalSlides = slides.length;

document.querySelector('.next').addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlidePosition();
});

document.querySelector('.prev').addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlidePosition();
});

function updateSlidePosition() {
    const slideWidth = slides[0].clientWidth;
    document.querySelector('.carrossel .slide').style.transform = `translateX(${-slideWidth * currentSlide}px)`;
}