document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuButton && navLinks) {
        mobileMenuButton.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuButton.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuButton.classList.remove('active');
                }
            });
        });
    }

    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

});

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]'); 
    const navLi = document.querySelectorAll('.nav-links li a');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        // Ajuste o offsetTop se o header tiver altura diferente ou se houver outros elementos fixos
        const headerHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : 70;
        if (pageYOffset >= (sectionTop - sectionHeight / 3 - headerHeight)) {
            current = section.getAttribute('id');
        }
    });

    navLi.forEach(a => {
        a.classList.remove('active');
        // Verifica se o href do link (removendo o '#') está contido no 'current' id da seção
        if (a.getAttribute('href') && a.getAttribute('href').substring(1) === current) {
            a.classList.add('active');
        }
    });

    const headerHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : 70;
    // Caso especial para o topo da página (seção 'inicio')
    // Se não houver seções (ex: página muito curta) ou se o scroll estiver acima da primeira seção
    if (sections.length === 0 || pageYOffset < sections[0].offsetTop - headerHeight) {
        navLi.forEach(a => a.classList.remove('active')); // Remove de todos
        const homeLink = document.querySelector('.nav-links a[href="#inicio"]');
        if (homeLink) {
            homeLink.classList.add('active'); // Ativa o 'Início'
        }
    } else if (!current && sections.length > 0 && pageYOffset >= sections[sections.length-1].offsetTop + sections[sections.length-1].offsetHeight - window.innerHeight) {
        // Se estiver no final da página e 'current' estiver vazio (nenhuma seção ativa pela lógica anterior)
        // pode ser útil ativar o último link do menu se a página for longa e o scroll parar após a última seção
        // (Esta parte é opcional e pode precisar de ajuste fino)
    }

});