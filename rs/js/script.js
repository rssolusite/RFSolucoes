/* ==========================================================================
   RS SOLUÇÕES - INTERATIVIDADE PREMIUM (ES6)
   Desenvolvido de forma modular e limpa para máxima performance.
   Sem dependências de terceiros.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Inicialização de Componentes
  initLoader();
  initNavbar();
  initScrollReveal();
  initServiceModals();
  initForms();
  initScrollEffects();
});

/* 1. TELA DE CARREGAMENTO (PRELOADER)
   ========================================================================== */
function initLoader() {
  const loader = document.getElementById('loader-screen');
  const hero = document.getElementById('hero');
  const scrollIndicator = document.querySelector('.hero-scroll-indicator');

  window.addEventListener('load', () => {
    // Pequeno atraso para suavizar a transição visual
    setTimeout(() => {
      if (loader) {
        loader.style.opacity = '0';
        loader.style.transform = 'scale(1.05)';
        setTimeout(() => {
          loader.style.display = 'none';
          
          // Dispara animações da seção Hero
          if (hero) {
            hero.classList.add('loaded');
          }
          if (scrollIndicator) {
            scrollIndicator.classList.add('visible');
          }
        }, 600);
      }
    }, 400);
  });
  
  // Garantia: se o evento load demorar demais, remove o loader em 3s
  setTimeout(() => {
    if (loader && loader.style.display !== 'none') {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = 'none';
        if (hero) hero.classList.add('loaded');
        if (scrollIndicator) scrollIndicator.classList.add('visible');
      }, 600);
    }
  }, 3000);
}

/* 2. MENU E CABEÇALHO (NAVBAR)
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.header-nav');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('nav-menu-mobile');
  const menuOverlay = document.getElementById('menu-overlay');
  const mobileLinks = document.querySelectorAll('.nav-link-mobile');
  const desktopLinks = document.querySelectorAll('.nav-link-desktop');
  
  let lastScrollY = window.scrollY;

  // Toggle do Menu Mobile
  function toggleMobileMenu() {
    mobileToggle.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    menuOverlay.classList.toggle('open');
    
    // Previne scroll do body com menu mobile aberto
    if (mobileMenu.classList.contains('open')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', toggleMobileMenu);
  }

  if (menuOverlay) {
    menuOverlay.addEventListener('click', toggleMobileMenu);
  }

  // Fecha menu mobile ao clicar em algum link
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu.classList.contains('open')) {
        toggleMobileMenu();
      }
    });
  });

  // Controle de Scroll da Navbar (Transparência + Inteligente)
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // 1. Transparência / Cor Preta
    if (currentScrollY > 50) {
      header.classList.remove('transparent');
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
      header.classList.add('transparent');
    }

    // 2. Navbar Inteligente (Esconde ao descer, aparece ao subir)
    if (currentScrollY > 150) {
      if (currentScrollY > lastScrollY && !mobileMenu.classList.contains('open')) {
        // Scroll para baixo: esconde
        header.classList.add('nav-hidden');
      } else {
        // Scroll para cima: mostra
        header.classList.remove('nav-hidden');
      }
    } else {
      header.classList.remove('nav-hidden');
    }

    lastScrollY = currentScrollY;
    
    // Atualiza Scroll Spy
    updateScrollSpy();
  });

  // Scroll Spy: Atualiza link ativo com base na seção visível
  const sections = document.querySelectorAll('section[id]');
  
  function updateScrollSpy() {
    const scrollPosition = window.scrollY + 120; // offset correspondente ao header

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Desktop link
        desktopLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
        // Mobile link
        mobileLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
    
    // Especial para o topo
    if (window.scrollY < 100) {
      desktopLinks.forEach(link => link.classList.remove('active'));
      mobileLinks.forEach(link => link.classList.remove('active'));
      const homeLinks = document.querySelectorAll('a[href="#home"]');
      homeLinks.forEach(link => link.classList.add('active'));
    }
  }
}

/* 3. EFEITOS DE REVELAÇÃO NO SCROLL (SCROLL REVEAL)
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-fade, .reveal-slide-up, .reveal-slide-left, .reveal-slide-right');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Adiciona classe de animação e para de observar o elemento
        entry.target.classList.add('reveal-active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12, // Executa quando 12% do elemento entra na tela
    rootMargin: '0px 0px -50px 0px' // Margem na parte inferior para ativar um pouco antes
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });
}

/* 4. DADOS E CONTROLE DO MODAL DE SERVIÇOS
   ========================================================================== */
const servicesData = {
  vigilancia: {
    icon: 'fa-shield-halved',
    title: 'Vigilância Patrimonial',
    intro: 'A segurança é um dos pilares fundamentais para o bom funcionamento de qualquer ambiente corporativo, comercial, industrial ou residencial. A RS Soluções oferece serviços de vigilância voltados à proteção patrimonial, prevenção de riscos e apoio à segurança operacional, sempre com responsabilidade, discrição e comprometimento.',
    details: 'Nossa equipe atua de forma preventiva, auxiliando no monitoramento do ambiente, controle de movimentações e suporte à manutenção da ordem e segurança do local, contribuindo para um ambiente mais protegido e organizado.<br><br>O serviço é desenhado sob medida para cada cliente, analisando-se o fluxo de pessoas, as particularidades estruturais do imóvel e a rotina operacional do local.',
    whyTitle: 'Por que escolher a RS Soluções?',
    whyDesc: 'Na RS Soluções, entendemos que segurança exige máxima confiança. Trabalhamos com profissionais rigorosamente selecionados e treinados, atendimento operacional próximo e supervisão contínua, oferecendo um suporte eficiente e alinhado à realidade de cada cliente.'
  },
  portaria: {
    icon: 'fa-door-open',
    title: 'Portaria e Controle de Acesso',
    intro: 'O serviço de portaria é essencial para manter a organização, segurança e controle do fluxo de pessoas em empresas, condomínios residenciais e instituições. A RS Soluções disponibiliza profissionais altamente preparados para atuar no controle de acessos físico e de veículos.',
    details: 'Nossos colaboradores efetuam recepção de visitantes, cadastro e registro sistemático de entradas e saídas, atendimento telefônico associado à triagem rápida, triagem e recebimento de encomendas, além de apoio e reporte imediato a qualquer incidente operacional.<br><br>Uma portaria eficiente e cordial é o primeiro cartão de visitas da sua empresa, garantindo seriedade e profissionalismo logo no primeiro contato.',
    whyTitle: 'Por que escolher a RS Soluções?',
    whyDesc: 'Mais do que simplesmente controlar acessos, nossa equipe atua com foco em cordialidade, responsabilidade e atenção constante. Nossos porteiros passam por capacitação comportamental e técnica para lidar com diferentes fluxos e protocolos de segurança personalizados.'
  },
  limpeza: {
    icon: 'fa-broom',
    title: 'Limpeza e Zeladoria',
    intro: 'Manter um ambiente higienizado, organizado e bem conservado é indispensável para zelar pelo bem-estar de colaboradores, clientes e moradores, além de valorizar o patrimônio físico. A RS Soluções oferece serviços integrados de limpeza comercial, industrial e condominial.',
    details: 'Nossos profissionais cobrem desde a limpeza diária geral até rotinas mais específicas de conservação e higienização profunda. Atuamos também com a figura do zelador, que acompanha de perto as demandas de manutenção predial corretiva e preventiva simples, gerenciando o uso de insumos, a coleta de resíduos e a inspeção diária das instalações.',
    whyTitle: 'Por que escolher a RS Soluções?',
    whyDesc: 'Entendemos que um ambiente limpo impacta na produtividade, saúde e imagem corporativa. Trabalhamos com processos estruturados, cronogramas de limpeza planejados de acordo com a movimentação do local, e supervisores que avaliam periodicamente a qualidade de entrega de nossos colaboradores.'
  },
  jardinagem: {
    icon: 'fa-leaf',
    title: 'Jardinagem e Conservação de Áreas Verdes',
    intro: 'Áreas verdes bem cuidadas e harmoniosas transformam a estética de condomínios, sedes corporativas e hotéis, transmitindo cuidado, leveza e profissionalismo. A RS Soluções oferece manutenção e revitalização completa de jardins e gramados.',
    details: 'Os serviços englobam poda de árvores de pequeno porte, corte e contenção de gramados, adubação periódica, irrigação orientada, controle básico de pragas do solo, limpeza de canteiros e plantio de novas mudas e forrações conforme projeto paisagístico.<br><br>Nossos profissionais entendem o manejo correto de cada espécie para manter a saúde e beleza das plantas durante o ano todo.',
    whyTitle: 'Por que escolher a RS Soluções?',
    whyDesc: 'Nossa equipe atua com as ferramentas adequadas, equipamentos de proteção individual (EPIs) corretos e profunda dedicação aos detalhes. ZELAMOS por cada folha para que seus espaços externos tornem-se verdadeiros pontos de orgulho visual para quem frequenta.'
  },
  terceirizacao: {
    icon: 'fa-users-gear',
    title: 'Terceirização e Soluções Sob Medida',
    intro: 'Cada organização apresenta desafios operacionais muito específicos. Para suprir demandas que fogem dos escopos tradicionais, a RS Soluções disponibiliza profissionais qualificados e mão de obra terceirizada para diversas áreas de suporte e infraestrutura.',
    details: 'Atendemos demandas de contratação contínua ou temporária (como cobertura de férias, licenças médicas, aumentos sazonais de produção ou projetos pontuais). Podemos fornecer profissionais para apoio administrativo, recepção bilíngue, copeiragem premium, motoristas operacionais, carga/descarga e almoxarifado.<br><br>Com nossa solução, sua empresa elimina burocracias trabalhistas e de seleção, mantendo o foco integral no Core Business.',
    whyTitle: 'Por que escolher a RS Soluções?',
    whyDesc: 'Nosso grande diferencial é a flexibilidade contratual e a agilidade na reposição e mobilização de profissionais. Analisamos rigorosamente o perfil técnico e cultural exigido pela sua empresa para entregar um profissional pronto para somar no seu dia a dia.'
  }
};

function initServiceModals() {
  const modalOverlay = document.getElementById('service-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const openButtons = document.querySelectorAll('.service-card-link, .service-card');
  
  // Elementos do Modal a serem povoados
  const mIcon = document.getElementById('modal-service-icon');
  const mTitle = document.getElementById('modal-service-title');
  const mIntro = document.getElementById('modal-service-intro');
  const mDetails = document.getElementById('modal-service-details');
  const mWhyTitle = document.getElementById('modal-service-why-title');
  const mWhyDesc = document.getElementById('modal-service-why-desc');
  
  let previouslyFocusedElement = null;

  function openModal(serviceKey) {
    const data = servicesData[serviceKey];
    if (!data) return;

    // Salva elemento focado para acessibilidade
    previouslyFocusedElement = document.activeElement;

    // Popula o Modal com os dados
    mIcon.innerHTML = `<i class="fa-solid ${data.icon}"></i>`;
    mTitle.textContent = data.title;
    mIntro.innerHTML = data.intro;
    mDetails.innerHTML = data.details;
    mWhyTitle.textContent = data.whyTitle;
    mWhyDesc.textContent = data.whyDesc;

    // Exibe o modal
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Foca no botão fechar para acessibilidade
    setTimeout(() => {
      modalCloseBtn.focus();
    }, 100);

    // Adiciona listener de teclado para acessibilidade (Focus Trap e ESC)
    document.addEventListener('keydown', handleKeyDown);
  }

  function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
    
    // Remove listener de teclado
    document.remove('keydown', handleKeyDown);

    // Devolve o foco
    if (previouslyFocusedElement) {
      previouslyFocusedElement.focus();
    }
  }

  // Lógica dos botões de abrir
  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Evita disparar duas vezes se clicar no link que está dentro do card
      e.stopPropagation();
      
      let serviceKey = btn.getAttribute('data-service');
      if (!serviceKey && btn.closest('.service-card')) {
        serviceKey = btn.closest('.service-card').getAttribute('data-service');
      }
      
      if (serviceKey) {
        openModal(serviceKey);
      }
    });
  });

  // Fechar ao clicar no botão ou na área externa
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }
  
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }

  // Teclado (ESC e Focus Trap)
  function handleKeyDown(e) {
    if (e.key === 'Escape') {
      closeModal();
    }

    if (e.key === 'Tab') {
      // Focus Trap rudimentar dentro do modal
      const focusableElements = modalOverlay.querySelectorAll('button, [href], input, select, textarea, [tabindex="0"]');
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) { // Shift + Tab
        if (document.activeElement === firstFocusable) {
          lastFocusable.focus();
          e.preventDefault();
        }
      } else { // Tab
        if (document.activeElement === lastFocusable) {
          firstFocusable.focus();
          e.preventDefault();
        }
      }
    }
  }
}

/* 5. VALIDAÇÃO DE FORMULÁRIOS E TOASTS DE RETORNO
   ========================================================================== */
function initForms() {
  const contactForm = document.getElementById('contact-form');
  const careerForm = document.getElementById('career-form');
  const fileInput = document.getElementById('cv-file');
  const fileLabelText = document.getElementById('cv-file-label');
  const filenameDisplay = document.getElementById('cv-filename');

  // Input de Upload de Currículo - Mostrar nome do arquivo
  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        // Validar extensão do arquivo (apenas PDF é aceito)
        const ext = file.name.split('.').pop().toLowerCase();
        if (ext !== 'pdf') {
          showToast('Por favor, envie seu currículo em formato PDF.', true);
          fileInput.value = '';
          filenameDisplay.textContent = '';
          fileLabelText.textContent = 'Anexar currículo (PDF)';
          return;
        }

        // Limita tamanho a 5MB
        if (file.size > 5 * 1024 * 1024) {
          showToast('O arquivo deve ter no máximo 5MB.', true);
          fileInput.value = '';
          filenameDisplay.textContent = '';
          fileLabelText.textContent = 'Anexar currículo (PDF)';
          return;
        }

        filenameDisplay.textContent = `Selecionado: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`;
        fileLabelText.textContent = 'Alterar arquivo';
      } else {
        filenameDisplay.textContent = '';
        fileLabelText.textContent = 'Anexar currículo (PDF)';
      }
    });
  }

  // Função para validar número de telefone brasileiro
  function validatePhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10 && cleaned.length <= 11;
  }

  // Validação Form Contato
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const phone = document.getElementById('contact-phone').value.trim();
      const subject = document.getElementById('contact-subject').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !phone || !subject || !message) {
        showToast('Por favor, preencha todos os campos obrigatórios.', true);
        return;
      }

      if (!validatePhone(phone)) {
        showToast('Por favor, insira um número de telefone ou celular válido com DDD.', true);
        return;
      }

      // Simula envio assíncrono para o Firebase / backend
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';

      setTimeout(() => {
        showToast('Mensagem enviada com sucesso! Entraremos em contato em breve.', false);
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }, 1500);
    });
  }

  // Validação Form Trabalhe Conosco
  if (careerForm) {
    careerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('career-name').value.trim();
      const email = document.getElementById('career-email').value.trim();
      const phone = document.getElementById('career-phone').value.trim();
      const file = fileInput.files[0];

      if (!name || !email || !phone) {
        showToast('Por favor, preencha todos os campos cadastrais.', true);
        return;
      }

      if (!validatePhone(phone)) {
        showToast('Por favor, insira um celular válido com DDD.', true);
        return;
      }

      if (!file) {
        showToast('Por favor, anexe seu currículo em formato PDF.', true);
        return;
      }

      // Simula envio
      const submitBtn = careerForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';

      setTimeout(() => {
        showToast('Currículo cadastrado com sucesso! Agradecemos pelo interesse.', false);
        careerForm.reset();
        if (filenameDisplay) filenameDisplay.textContent = '';
        if (fileLabelText) fileLabelText.textContent = 'Anexar currículo (PDF)';
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }, 1800);
    });
  }

  // Criar e mostrar Toast dinamicamente
  function showToast(message, isError = false) {
    // Remove toast anterior se existir
    const oldToast = document.querySelector('.toast-notification');
    if (oldToast) oldToast.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    if (isError) {
      toast.innerHTML = `
        <i class="fa-solid fa-circle-exclamation" style="color: #ff3b30;"></i>
        <p style="color: #111111;">${message}</p>
      `;
    } else {
      toast.innerHTML = `
        <i class="fa-solid fa-circle-check"></i>
        <p>${message}</p>
      `;
    }

    document.body.appendChild(toast);
    
    // Dispara a animação de subir
    setTimeout(() => {
      toast.classList.add('show');
    }, 50);

    // Auto-remove após 4.5 segundos
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 400);
    }, 4500);
  }
}

/* 6. EFEITOS GERAIS DE SCROLL (PROCESSO, BACK-TO-TOP, ETC)
   ========================================================================== */
function initScrollEffects() {
  const backToTopBtn = document.getElementById('back-to-top');

  // Controle de visibilidade do Botão Voltar ao Topo
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
    
    // Animação da barra vertical da Timeline conforme scroll
    animateTimelineProgress();
  });

  // Ação de clique para subir ao topo suavemente
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Animação da Timeline Progress
  const timelineProgress = document.getElementById('timeline-progress');
  const timelineItems = document.querySelectorAll('.timeline-item');
  const timelineSection = document.getElementById('processo');

  function animateTimelineProgress() {
    if (!timelineSection || !timelineProgress) return;

    const sectionRect = timelineSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Se a seção estiver visível na janela
    if (sectionRect.top < windowHeight && sectionRect.bottom > 0) {
      const sectionHeight = timelineSection.offsetHeight;
      
      // Calcula quanto o usuário rolou dentro da seção
      // Inicia a contar quando o topo da seção entra no meio da janela
      const scrollStartPoint = windowHeight * 0.75;
      const scrollOffset = scrollStartPoint - sectionRect.top;
      
      let percent = (scrollOffset / (sectionHeight - 150)) * 100;
      percent = Math.min(Math.max(percent, 0), 100); // limita entre 0% e 100%

      timelineProgress.style.height = `${percent}%`;

      // Ativa estados ativos de cada etapa conforme o scroll progride
      timelineItems.forEach((item, index) => {
        const itemRect = item.getBoundingClientRect();
        if (itemRect.top < windowHeight * 0.65) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }
  }
}
