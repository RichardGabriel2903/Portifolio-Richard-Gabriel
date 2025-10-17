document.addEventListener('DOMContentLoaded', () => {

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

    
    function updateLanguage(lang) {
        const aboutContentPt = document.querySelector('.about-text[data-content="pt"]');
        const aboutContentEn = document.querySelector('.about-text[data-content="en"]');
        
        if (aboutContentPt) aboutContentPt.classList.toggle('hidden', lang !== 'pt');
        if (aboutContentEn) aboutContentEn.classList.toggle('hidden', lang !== 'en');

        document.querySelectorAll('[data-i18n-key]').forEach(el => {
            const key = el.getAttribute('data-i18n-key');
            const translatedText = staticText[lang][key];

            if (translatedText) {
                if (el.tagName === 'SPAN' && el.parentElement.classList.contains('download-item')) {
                    el.textContent = translatedText;
                } else if (el.tagName === 'SPAN' && el.parentElement.classList.contains('whatsapp-button')) {
                    el.textContent = translatedText;
                } else {
                    el.textContent = translatedText;
                }
            }
        });

        const flags = document.querySelectorAll('.language-switcher .flag');
        flags.forEach(f => f.classList.remove('active'));
        document.querySelector(`.language-switcher .flag[data-lang="${lang}"]`).classList.add('active');
    }

    const flags = document.querySelectorAll('.language-switcher .flag');
    flags.forEach(flag => {
        flag.addEventListener('click', () => {
            const selectedLang = flag.getAttribute('data-lang');
            updateLanguage(selectedLang);
        });
    });

    const initialLang = document.querySelector('.language-switcher .flag.active')?.getAttribute('data-lang') || 'pt';
    updateLanguage(initialLang);

    function setupProjectsCarousel() {
        const projectsSection = document.getElementById('projetos');
        if (!projectsSection) return;

        const track = projectsSection.querySelector('.carousel-track');
        const container = projectsSection.querySelector('.carousel-container');
        const allCards = Array.from(projectsSection.querySelectorAll('.project-card'));
        const nextButton = projectsSection.querySelector('.next-btn');
        const prevButton = projectsSection.querySelector('.prev-btn');

        if (!track || allCards.length === 0 || !container || !prevButton || !nextButton) {
            if (allCards.length <= 3) {
            if (prevButton) prevButton.style.display = 'none';
            if (nextButton) nextButton.style.display = 'none';
            }
            return;
        }

        let currentIndex = 0;

        function getGapPx() {
            const styles = getComputedStyle(track);
            const gap = parseFloat(styles.gap || styles.columnGap || '0');
            return isNaN(gap) ? 0 : gap;
        }

        function getCardWidth() {
            return allCards[0].getBoundingClientRect().width;
        }

        function getCardsPerView() {
            const gap = getGapPx();
            const cardW = getCardWidth();
            const visible = Math.max(1, Math.floor((container.clientWidth + gap) / (cardW + gap)));
            return visible;
        }

        function clampIndex(idx) {
            const visible = getCardsPerView();
            const maxIndex = Math.max(0, allCards.length - visible);
            return Math.min(Math.max(idx, 0), maxIndex);
        }

        function updateCarousel() {
            const gap = getGapPx();
            const cardW = getCardWidth();
            const visible = getCardsPerView();

            const maxIndex = Math.max(0, allCards.length - visible);
            const needNav = maxIndex > 0;
            prevButton.style.display = needNav ? '' : 'none';
            nextButton.style.display = needNav ? '' : 'none';

            currentIndex = clampIndex(currentIndex);

            const offset = -(currentIndex * (cardW + gap));
            track.style.transform = `translateX(${offset}px)`;

            prevButton.disabled = currentIndex === 0;
            prevButton.style.opacity = currentIndex === 0 ? 0.4 : 1;

            nextButton.disabled = currentIndex >= maxIndex;
            nextButton.style.opacity = currentIndex >= maxIndex ? 0.4 : 1;
        }

        prevButton.addEventListener('click', () => {
            currentIndex = clampIndex(currentIndex - 1);
            updateCarousel();
        });

        nextButton.addEventListener('click', () => {
            currentIndex = clampIndex(currentIndex + 1);
            updateCarousel();
        });

        window.addEventListener('resize', updateCarousel);

        updateCarousel();
        }
    
    setupProjectsCarousel();

});