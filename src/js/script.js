document.addEventListener("DOMContentLoaded", () => {
  const staticText = {
    pt: {
      "header-title":
        "Richard Gabriel | Analista em Testes e Desenvolvimento de Software",
      "nav-sobre": "Sobre Mim",
      "nav-exp": "Habilidades / Currículo",
      "nav-proj": "Projetos Pessoais",
      "nav-contato": "Contato",
      "about-title": "SOBRE MIM",
      "about-text-pt-1":
        "Olá! Sou Richard Gabriel, 20 anos. Formado em Análise e Desenvolvimento de Sistemas, com pós-graduações em andamento em Inteligência Artificial e Desenvolvimento e Testes de Software.",
      "about-text-pt-2":
        "Atuo como Analista de Testes e Desenvolvimento de Software, com expertise em: testes (funcionais, integração, regressão), automação, desenvolvimento Java, JUnit, Mockito e SCRUM. Possuo vivência em bancos de dados SQL, administração de sistemas (Windows/Linux) e boas práticas de QA.",
      "about-text-pt-3":
        "Profissional proativo e analítico, focado na entrega de valor e excelência em qualidade de software, automação e análise de dados. Busco consolidar minha carreira na tecnologia, promovendo o crescimento mútuo.",
      "skills-title": "HABILIDADES",
      "skill-java": "Java",
      "skill-junit": "Junit 5",
      "skill-mockito": "Mockito",
      "skill-sql": "SQL",
      "skill-docker": "Docker",
      "skill-robot": "Robot Framework",
      "download-title": "DOWNLOAD - CURRÍCULO",
      "download-pt": "PORTUGUÊS",
      "download-en": "ENGLISH",
      "projects-title": "PROJETOS PESSOAIS",
      "proj-financeiro": "Aplicativo Financeiro",
      "proj-financeiro-desc":
        "Descrição detalhada do Aplicativo Financeiro (Adaptada)",
      "proj-guess-game": "Jogo de adivinhação",
      "proj-guess-game-desc":
        "Um jogo interativo em JavaScript onde o jogador tenta adivinhar um número entre 1 e 100, recebendo dicas se o valor é maior ou menor, com contador de tentativas e recorde pessoal.",
      "proj-kanban": "Kanban",
      "proj-kanban-desc": "Descrição detalhada do Kanban (Adaptada)",
      "proj-memory-game": "Jogo da Memória",
      "proj-memory-game-desc":
        "Descrição detalhada do Jogo da Memória (Adaptada)",
      "proj-doce-encanto": "Doce Encanto",
      "proj-doce-encanto-desc":
        "Descrição detalhada do Doce Encanto (Adaptada)",
      "proj-futebol": "Onde Assistir Futebol",
      "proj-futebol-desc":
        "Descrição detalhada do Onde Assistir Futebol (Adaptada)",
      "btn-ver-projeto": "Ver Projeto",
      "btn-ver-github": "Ver GitHub",
      "contact-title": "CONTATO",
      "contact-message":
        "Entre em contato comigo pelo WhatsApp clicando abaixo",
      "whatsapp-btn": "Fale comigo no WhatsApp",
    },
    en: {
      "header-title":
        "Richard Gabriel | Software Testing and Development Analyst",
      "nav-sobre": "About Me",
      "nav-exp": "Skills / Resume",
      "nav-proj": "Personal Projects",
      "nav-contato": "Contact",
      "about-title": "ABOUT ME",
      "about-text-en-1":
        "Hello! My name is Richard Gabriel, I am 20 years old, I have a degree in Systems Analysis and Development and I am currently pursuing post-graduate studies in Artificial Intelligence, and in Software Development and Testing.",
      "about-text-en-2":
        "I work as a Software Testing and Development Analyst, with experience in functional, integration and regression testing, automation, development in Java, JUnit, Mockito and agile methodologies (SCRUM). I also have experience with SQL databases, Windows and Linux system administration and good QA practices.",
      "about-text-en-3":
        "With an analytical view and focus on results, I seek to consolidate my career in the area of technology, combining software quality, automation and data analysis, always with the objective of delivering value, ensuring excellence and promoting mutual growth between team and company.",
      "skills-title": "SKILLS",
      "skill-java": "Java",
      "skill-junit": "Junit 5",
      "skill-mockito": "Mockito",
      "skill-sql": "SQL",
      "skill-docker": "Docker",
      "skill-robot": "Robot Framework",
      "download-title": "RESUME - DOWNLOAD",
      "download-pt": "PORTUGUÊS",
      "download-en": "ENGLISH",
      "projects-title": "PERSONAL PROJECTS",
      "proj-financeiro": "Financial App",
      "proj-financeiro-desc":
        "Detailed description of the Financial App (Adapted)",
      "proj-guess-game": "Guess Game",
      "proj-guess-game-desc":
        "An interactive JavaScript game where the player tries to guess a number between 1 and 100, receiving hints if the value is higher or lower, with attempt counter and personal record.",
      "proj-kanban": "Kanban",
      "proj-kanban-desc": "Detailed description of Kanban (Adapted)",
      "proj-memory-game": "Memory Game",
      "proj-memory-game-desc":
        "Detailed description of the Memory Game (Adapted)",
      "proj-doce-encanto": "Doce Encanto",
      "proj-doce-encanto-desc":
        "Detailed description of Doce Encanto (Adapted)",
      "proj-futebol": "Where to Watch Football",
      "proj-futebol-desc":
        "Detailed description of Where to Watch Football (Adapted)",
      "btn-ver-projeto": "View Project",
      "btn-ver-github": "View GitHub",
      "contact-title": "CONTACT",
      "contact-message": "Contact me on WhatsApp by clicking below",
      "whatsapp-btn": "Chat with me on WhatsApp",
    },
  };
  function updateLanguage(lang) {
    const aboutContentPt = document.querySelector(
      '.about-text[data-content="pt"]'
    );
    const aboutContentEn = document.querySelector(
      '.about-text[data-content="en"]'
    );

    if (aboutContentPt)
      aboutContentPt.classList.toggle("hidden", lang !== "pt");
    if (aboutContentEn)
      aboutContentEn.classList.toggle("hidden", lang !== "en");

    document.querySelectorAll("[data-i18n-key]").forEach((el) => {
      const key = el.getAttribute("data-i18n-key");
      const translatedText = staticText[lang][key];

      if (translatedText) {
        if (
          el.tagName === "SPAN" &&
          el.parentElement.classList.contains("download-item")
        ) {
          el.textContent = translatedText;
        } else if (
          el.tagName === "SPAN" &&
          el.parentElement.classList.contains("whatsapp-button")
        ) {
          el.textContent = translatedText;
        } else {
          el.textContent = translatedText;
        }
      }
    });

    const flags = document.querySelectorAll(".language-switcher .flag");
    flags.forEach((f) => f.classList.remove("active"));
    document
      .querySelector(`.language-switcher .flag[data-lang="${lang}"]`)
      .classList.add("active");
  }

  const flags = document.querySelectorAll(".language-switcher .flag");
  flags.forEach((flag) => {
    flag.addEventListener("click", () => {
      const selectedLang = flag.getAttribute("data-lang");
      updateLanguage(selectedLang);
    });
  });

  const initialLang =
    document
      .querySelector(".language-switcher .flag.active")
      ?.getAttribute("data-lang") || "pt";
  updateLanguage(initialLang);

  function setupProjectsCarousel() {
    const projectsSection = document.getElementById("projetos");
    if (!projectsSection) return;

    const track = projectsSection.querySelector(".carousel-track");
    const container = projectsSection.querySelector(".carousel-container");
    const allCards = Array.from(
      projectsSection.querySelectorAll(".project-card")
    );
    const nextButton = projectsSection.querySelector(".next-btn");
    const prevButton = projectsSection.querySelector(".prev-btn");

    if (
      !track ||
      allCards.length === 0 ||
      !container ||
      !prevButton ||
      !nextButton
    ) {
      if (allCards.length <= 3) {
        if (prevButton) prevButton.style.display = "none";
        if (nextButton) nextButton.style.display = "none";
      }
      return;
    }

    let currentIndex = 0;

    function getGapPx() {
      const styles = getComputedStyle(track);
      const gap = parseFloat(styles.gap || styles.columnGap || "0");
      return isNaN(gap) ? 0 : gap;
    }

    function getCardWidth() {
      return allCards[0].getBoundingClientRect().width;
    }

    function getCardsPerView() {
      const gap = getGapPx();
      const cardW = getCardWidth();
      const visible = Math.max(
        1,
        Math.floor((container.clientWidth + gap) / (cardW + gap))
      );
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
      prevButton.style.display = needNav ? "" : "none";
      nextButton.style.display = needNav ? "" : "none";

      currentIndex = clampIndex(currentIndex);

      const offset = -(currentIndex * (cardW + gap));
      track.style.transform = `translateX(${offset}px)`;

      prevButton.disabled = currentIndex === 0;
      prevButton.style.opacity = currentIndex === 0 ? 0.4 : 1;

      nextButton.disabled = currentIndex >= maxIndex;
      nextButton.style.opacity = currentIndex >= maxIndex ? 0.4 : 1;
    }

    prevButton.addEventListener("click", () => {
      currentIndex = clampIndex(currentIndex - 1);
      updateCarousel();
    });

    nextButton.addEventListener("click", () => {
      currentIndex = clampIndex(currentIndex + 1);
      updateCarousel();
    });

    window.addEventListener("resize", updateCarousel);

    updateCarousel();
  }

  setupProjectsCarousel();
});
