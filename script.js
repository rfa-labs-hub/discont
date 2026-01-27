// ============================================
// Плавное появление секций при скролле
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Наблюдаем за всеми секциями
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
});

// ============================================
// Аккордеон для вакансий
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const vacancyHeaders = document.querySelectorAll('.vacancy-header');
    
    vacancyHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const isExpanded = header.getAttribute('aria-expanded') === 'true';
            
            // Закрываем все остальные аккордеоны (опционально)
            // Если нужно, чтобы открытыми могли быть несколько - закомментируйте этот блок
            vacancyHeaders.forEach(otherHeader => {
                if (otherHeader !== header) {
                    otherHeader.setAttribute('aria-expanded', 'false');
                }
            });
            
            // Переключаем текущий аккордеон
            if (isExpanded) {
                header.setAttribute('aria-expanded', 'false');
            } else {
                header.setAttribute('aria-expanded', 'true');
            }
        });
    });
});

// ============================================
// Мобильное меню
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (mobileMenuToggle && navList) {
        mobileMenuToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
            
            // Анимация иконки гамбургера
            const spans = mobileMenuToggle.querySelectorAll('span');
            if (navList.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Закрываем меню при клике на ссылку
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
});

// ============================================
// Плавная прокрутка к якорям
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Пропускаем пустые якоря
            if (href === '#' || href === '') {
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ============================================
// Обработка формы обратной связи
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Получаем данные формы
            const formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                message: document.getElementById('message').value
            };
            
            // В реальном проекте здесь был бы AJAX-запрос к серверу
            // Для демо просто показываем сообщение
            alert('Спасибо за ваше обращение, ' + formData.name + '!\n\nМы свяжемся с вами в ближайшее время по телефону ' + formData.phone + '.');
            
            // Очищаем форму
            contactForm.reset();
        });
    }
});

// ============================================
// Инициализация видимости секций при загрузке
// ============================================

window.addEventListener('load', () => {
    // Проверяем, какие секции уже видны при загрузке
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            section.classList.add('visible');
        }
    });
});
