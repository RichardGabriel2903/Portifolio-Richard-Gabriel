// script.js

document.addEventListener('DOMContentLoaded', () => {

    // ====================================================
    // 1. DADOS DE TRADUÇÃO (i18n)
    // ====================================================
    const staticText = {
        'pt': {
            'header-title': 'Richard Gabriel | Analista em Testes e Desenvolvimento de Software',
            'nav-sobre': 'Sobre Mim',
            'nav-exp': 'Habilidades / Currículo',
            'nav-proj': 'Projetos Pessoais',
            'nav-contato': 'Contato',
            'about-title': 'SOBRE MIM',
            'skills-title': 'HABILIDADES',
            'download-title': 'DOWNLOAD - CURRÍCULO',
            'download-pt': 'PORTUGUÊS',
            'download-en': 'ENGLISH',
            'projects-title': 'PROJETOS PESSOAIS',
            'contact-title': 'CONTATO',
            'contact-message': 'Entre em contato comigo pelo WhatsApp clicando abaixo',
            'whatsapp-btn': 'Fale comigo no WhatsApp',
        },
        'en': {
            'header-title': 'Richard Gabriel | Software Testing and Development Analyst',
            'nav-sobre': 'About Me',
            'nav-exp': 'Skills / Resume',
            'nav-proj': 'Personal Projects',
            'nav-contato': 'Contact',
            'about-title': 'ABOUT ME',
            'skills-title': 'SKILLS',
            'download-title': 'RESUME - DOWNLOAD',
            'download-pt': 'PORTUGUÊS',
            'download-en': 'ENGLISH',
            'projects-title': 'PERSONAL PROJECTS',
            'contact-title': 'CONTACT',
            'contact-message': 'Contact me on WhatsApp by clicking below',
            'whatsapp-btn': 'Chat with me on WhatsApp',
        }
    };
    
    // ====================================================
    // 2. FUNÇÃO CENTRAL DE TRADUÇÃO
    // ====================================================
    
    function updateLanguage(lang) {
        // A. Tradução de Conteúdo Dinâmico (Seção Sobre Mim)
        const aboutContentPt = document.querySelector('.about-text[data-content="pt"]');
        const aboutContentEn = document.querySelector('.about-text[data-content="en"]');
        
        if (aboutContentPt) aboutContentPt.classList.toggle('hidden', lang !== 'pt');
        if (aboutContentEn) aboutContentEn.classList.toggle('hidden', lang !== 'en');

        // B. Tradução de Textos Estáticos (Usando data-i18n-key)
        document.querySelectorAll('[data-i18n-key]').forEach(el => {
            const key = el.getAttribute('data-i18n-key');
            const translatedText = staticText[lang][key];

            if (translatedText) {
                // Caso especial: o botão do WhatsApp tem um ícone <i> e o texto está em um <span>
                if (el.tagName === 'SPAN' && el.parentElement.classList.contains('download-item')) {
                    // Texto do link de download
                    el.textContent = translatedText;
                } else if (el.tagName === 'SPAN' && el.parentElement.classList.contains('whatsapp-button')) {
                    // Texto do botão do WhatsApp
                    el.textContent = translatedText;
                } else {
                    // Todos os outros elementos (Logo, Títulos, Nav links, etc.)
                    el.textContent = translatedText;
                }
            }
        });

        // C. Atualiza o estado 'active' das bandeiras
        const flags = document.querySelectorAll('.language-switcher .flag');
        flags.forEach(f => f.classList.remove('active'));
        document.querySelector(`.language-switcher .flag[data-lang="${lang}"]`).classList.add('active');
    }

    // ====================================================
    // 3. SWITCHER DE IDIOMA - Event Listeners
    // ====================================================
    const flags = document.querySelectorAll('.language-switcher .flag');
    flags.forEach(flag => {
        flag.addEventListener('click', () => {
            const selectedLang = flag.getAttribute('data-lang');
            updateLanguage(selectedLang);
        });
    });

    // Inicia a página com o idioma 'pt' ou o que estiver ativo por padrão
    const initialLang = document.querySelector('.language-switcher .flag.active')?.getAttribute('data-lang') || 'pt';
    updateLanguage(initialLang);

    // ====================================================
    // 4. MODO ESCURO/CLARO (Tema)
    // ====================================================
    const themeToggle = document.getElementById('themeToggle');

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const icon = themeToggle.querySelector('i');
            
            // Lógica de ícone
            icon.classList.toggle('fa-moon');
            icon.classList.toggle('fa-sun');
            
            // Lógica de classe no corpo (você deve definir o CSS de .light-mode)
            document.body.classList.toggle('light-mode');
        });
    }

// ====================================================
    // 5. CARROSSEL DE PROJETOS (CORRIGIDO PARA ROLAR 1 CARD)
    // ====================================================

    function setupProjectsCarousel() {
        const projectsSection = document.getElementById('projetos');
        
        if (!projectsSection) return; 

        // Seletores
        const track = projectsSection.querySelector('.carousel-track');
        const container = projectsSection.querySelector('.carousel-container'); 
        
        // CORREÇÃO: Pegamos TODOS os cards individuais
        const allCards = Array.from(projectsSection.querySelectorAll('.project-card'));
        
        const nextButton = projectsSection.querySelector('.next-btn');
        const prevButton = projectsSection.querySelector('.prev-btn');

        if (!track || allCards.length === 0 || !container || !prevButton || !nextButton) {
             // Esconde botões se não houver carrossel ou cards insuficientes
             if (allCards.length <= 3) { // Se houver 3 ou menos, não precisa de carrossel
                 if (prevButton) prevButton.style.display = 'none';
                 if (nextButton) nextButton.style.display = 'none';
             }
             return;
        }

        // Usaremos o currentIndex para rastrear a posição do PRIMEIRO card visível
        let currentIndex = 0; 
        
        // Define quantos cards são visíveis por tela (ajuste se mudar o CSS)
        const cardsPerView = 3; 
        // O número máximo de rolagem será o total de cards menos os que estão visíveis
        const maxScrollIndex = allCards.length - cardsPerView;

        function updateCarousel() {
            // CORREÇÃO CRÍTICA: Pega a largura de um único card
            // Nota: Isso funcionará se todos os cards tiverem o mesmo tamanho.
            const cardWidth = allCards[0].offsetWidth; 
            
            // O deslocamento é baseado na largura de UM card
            const offset = -currentIndex * (cardWidth); // Multiplica pela largura de um card
            
            // Se o seu CSS usa margem/gap entre os cards, você precisará adicionar esse valor ao cardWidth para um cálculo perfeito do offset.
            
            track.style.transform = `translateX(${offset}px)`;
            
            // Atualiza o estado visual dos botões de navegação
            
            prevButton.disabled = currentIndex === 0;
            prevButton.style.opacity = currentIndex === 0 ? 0.4 : 1;
            
            nextButton.disabled = currentIndex >= maxScrollIndex;
            nextButton.style.opacity = currentIndex >= maxScrollIndex ? 0.4 : 1;
        }

        // Listener para Anterior
        prevButton.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--; 
                updateCarousel();
            }
        });

        // Listener para Próximo
        nextButton.addEventListener('click', () => {
            if (currentIndex < maxScrollIndex) {
                currentIndex++; 
                updateCarousel();
            }
        });
        
        // Inicializa o carrossel
        updateCarousel();
        
        // Recalcula a posição no redimensionamento (o cardWidth pode mudar)
        window.addEventListener('resize', updateCarousel);
    }
    
    // Inicia o carrossel de projetos
    setupProjectsCarousel();

});