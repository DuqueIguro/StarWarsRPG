document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.module-card');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    let currentIndex = 0;

    function updateCarousel() {
        cards.forEach((card, index) => {
            // Limpa todas as classes de posição anteriores
            card.classList.remove('card-center', 'card-left', 'card-right', 'card-far-left', 'card-far-right', 'card-hidden');

            const offset = index - currentIndex;

            // Define a classe com base na posição relativa ao card atual
            if (offset === 0) {
                card.classList.add('card-center');
            } else if (offset === 1) {
                card.classList.add('card-right');
            } else if (offset === -1) {
                card.classList.add('card-left');
            } else if (offset === 2) {
                card.classList.add('card-far-right');
            } else if (offset === -2) {
                card.classList.add('card-far-left');
            } else {
                // Esconde cards que estão muito distantes
                 card.classList.add('card-hidden');
            }
        });
    }

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCarousel();
    });

    // Inicia o carrossel na posição correta
    updateCarousel();
});