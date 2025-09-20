document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.project-carousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Verifica se os elementos do carrossel existem na página
    if (!carousel || !prevBtn || !nextBtn) {
        return;
    }

    const cards = document.querySelectorAll('.project-card');
    let currentIndex = 0;
    
    // Função para atualizar a posição do carrossel
    function updateCarousel() {
    const card = cards[currentIndex];
    if (!card) return;

    const cardWidth = card.offsetWidth;
    const gap = 40; // mesmo valor do CSS
    const containerWidth = document.querySelector('.carousel-container').offsetWidth;

    // Calcula o deslocamento para centralizar o card atual
    const offset = 
        (containerWidth / 2) - (cardWidth / 2) - (currentIndex * (cardWidth + gap));

    carousel.style.transform = `translateX(${offset}px)`;

    updateButtons();
}


    // Função para habilitar/desabilitar os botões de navegação
    function updateButtons() {
        // Desabilita o botão 'prev' se estiver no início
        prevBtn.disabled = currentIndex === 0;

        // Desabilita o botão 'next' se estiver no final
        // A lógica considera quantos cards cabem na tela para determinar o "fim"
        const containerWidth = document.querySelector('.carousel-container').offsetWidth;
        const totalCarouselWidth = carousel.scrollWidth;
        const currentPosition = Math.abs(parseInt(carousel.style.transform.split('(')[1])) || 0;
        
        nextBtn.disabled = currentPosition + containerWidth >= totalCarouselWidth;
    }

    // Event listener para o botão 'next'
    nextBtn.addEventListener('click', () => {
        currentIndex++;
        updateCarousel();
    });

    // Event listener para o botão 'prev'
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    // Atualiza o carrossel quando a janela é redimensionada
    window.addEventListener('resize', updateCarousel);
    
    // Inicializa o carrossel
    updateCarousel();
});