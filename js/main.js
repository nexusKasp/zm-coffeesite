document.addEventListener('DOMContentLoaded', function() {
  // Управление loader'ом
  const loader = document.querySelector('.loader');

  // Функция для скрытия loader'а с анимацией
  function hideLoader() {
    if (loader) {
      loader.style.opacity = '0'; // Плавное исчезновение
      setTimeout(() => {
        loader.style.display = 'none'; // Полностью скрываем после анимации
      }, 500); // Длительность анимации должна совпадать с transition в CSS
    }
  }

  // Скрываем loader через 4 секунды
  setTimeout(() => {
    hideLoader();
  }, 4000);

  // Mobile menu toggle
  const burger = document.getElementById('burger');
  const nav = document.querySelector('.nav');
  
  burger.addEventListener('click', function() {
    this.classList.toggle('active');
    nav.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  });

  // Header scroll effect
  const header = document.querySelector('.header');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Animate elements on scroll
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.classList.add('animate-slide-up');
      }
    });
  };
  
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Run once on load

  // Counter animation
  const counters = document.querySelectorAll('.stat-number');
  const speed = 200;
  
  function animateCounters() {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-count');
      const count = +counter.innerText;
      const increment = target / speed;
      
      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(animateCounters, 1);
      } else {
        counter.innerText = target;
      }
    });
  }
  const aboutSection = document.querySelector('.about');
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateCounters();
      observer.unobserve(aboutSection);
    }
  }, { threshold: 0.5 });
  
  observer.observe(aboutSection);

  const loginBtn = document.getElementById('login-btn');
  const registerBtn = document.getElementById('register-btn');
  const loginModal = document.getElementById('auth-modal');
  const registerModal = document.getElementById('reg-modal');
  const closeButtons = document.querySelectorAll('.modal__close');
  const switchToRegister = document.querySelector('.switch-to-register');
  const switchToLogin = document.querySelector('.switch-to-login');
  
  function openModal(modal) {
    modal.style.display = 'block';
    setTimeout(() => {
      modal.classList.add('show');
    }, 10);
    document.body.classList.add('no-scroll');
  }
  
  function closeModal(modal) {
    modal.classList.remove('show');
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.classList.remove('no-scroll');
    }, 300);
  }
  
  loginBtn.addEventListener('click', () => openModal(loginModal));
  registerBtn.addEventListener('click', () => openModal(registerModal));
  
  closeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const modal = this.closest('.modal');
      closeModal(modal);
    });
  });
  
  switchToRegister.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(loginModal);
    openModal(registerModal);
  });
  
  switchToLogin.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(registerModal);
    openModal(loginModal);
  });
  
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
      closeModal(e.target);
    }
  });

  // Form validation
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    const inputs = form.querySelectorAll('input, textarea');
    
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      
      inputs.forEach(input => {
        const formGroup = input.closest('.form-group');
        formGroup.classList.remove('error');
        formGroup.querySelector('.form-error').textContent = '';

        // Email validation
        if (input.type === 'email' && !validateEmail(input.value.trim())) {
          isValid = false;
          formGroup.classList.add('error');
          formGroup.querySelector('.form-error').textContent = 'Введите корректный email';
        }
        
        // Phone validation
        if (input.id === 'reg-phone' && !validatePhone(input.value.trim())) {
          isValid = false;
          formGroup.classList.add('error');
          formGroup.querySelector('.form-error').textContent = 'Введите корректный телефон';
        }
        
        // Password validation
        if (input.id === 'reg-password' || input.id === 'login-password') {
          if (input.value.trim().length < 6) {
            isValid = false;
            formGroup.classList.add('error');
            formGroup.querySelector('.form-error').textContent = 'Пароль должен содержать не менее 6 символов';
          }
        }
        
        // Password confirmation
        if (input.id === 'reg-confirm' && input.value.trim() !== document.getElementById('reg-password').value.trim()) {
          isValid = false;
          formGroup.classList.add('error');
          formGroup.querySelector('.form-error').textContent = 'Пароли не совпадают';
        }
      });
      
      if (isValid) {
        console.log('Form submitted');
        this.reset();
        const successMessage = document.createElement('div');
        successMessage.textContent = 'Форма успешно отправлена!';
        successMessage.style.color = '#2ecc71';
        successMessage.style.marginTop = '20px';
        successMessage.style.textAlign = 'center';
        this.appendChild(successMessage);
        
        setTimeout(() => {
          successMessage.remove();
          closeModal(this.closest('.modal'));
        }, 2000);
      }
    });

    inputs.forEach(input => {
      input.addEventListener('input', function() {
        const formGroup = this.closest('.form-group');
        formGroup.classList.remove('error');
        formGroup.querySelector('.form-error').textContent = '';
      });
    });
  });

  // Email validation function
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  // Phone validation and formatting
  const phoneInput = document.getElementById('reg-phone');
  
  if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
      const x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
      e.target.value = !x[2] ? x[1] : '+7 (' + x[2] + (x[3] ? ') ' + x[3] : '') + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
    });
  }
  
  function validatePhone(phone) {
    const re = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
    return re.test(phone);
  }


  // Add ripple effect to buttons
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.classList.add('btn-hover-effect');
  });
  
  // Initialize animations for elements already in view
  const animatedElements = document.querySelectorAll('.menu-item, .review-card, .blog-post, .coffee-card');
  
  animatedElements.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.1}s`;
    element.classList.add('animate-on-scroll');
  });
  
  // Check if elements are already in view on load
  setTimeout(() => {
    animateOnScroll();
  }, 500);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      const burger = document.getElementById('burger');
      const nav = document.querySelector('.nav');
      
      if (burger.classList.contains('active')) {
        burger.classList.remove('active');
        nav.classList.remove('active');
        document.body.classList.remove('no-scroll');
      }
    }
  });
});

// В main.js добавьте:
const animateElements = function() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  const windowHeight = window.innerHeight;
  
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 100;
    
    if (elementTop < windowHeight - elementVisible) {
      element.classList.add('active');
    }
  });
};

window.addEventListener('scroll', animateElements);
animateElements();

const passwordToggles = document.querySelectorAll('.password-toggle');

passwordToggles.forEach(toggle => {
  toggle.addEventListener('click', function() {
    const targetId = this.getAttribute('data-target');
    const passwordInput = document.getElementById(targetId);

    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      this.classList.add('active');
    } else {
      passwordInput.type = 'password';
      this.classList.remove('active');
    }
  });
});

const marqueeElements = document.querySelectorAll('.marquee');

marqueeElements.forEach(marquee => {
  // Создаем копию контента
  const content = marquee.innerHTML;
  marquee.innerHTML = content + content + content + content; // Дублируем несколько раз
  
  // Настраиваем анимацию
  const duration = 15000; // Время анимации в мс (меньше = быстрее)
  const startPosition = 0;
  const contentWidth = marquee.scrollWidth / 4; // Ширина оригинального контента
  
  function animateMarquee(timestamp) {
    if (!marquee.startTime) marquee.startTime = timestamp;
    const progress = timestamp - marquee.startTime;
    const progressRatio = progress / duration;
    
    // Сброс позиции, когда анимация завершена
    if (progressRatio >= 1) {
      marquee.startTime = timestamp;
      marquee.style.transform = `translateX(${startPosition}px)`;
      requestAnimationFrame(animateMarquee);
      return;
    }
    
    const translateX = -contentWidth * progressRatio;
    marquee.style.transform = `translateX(${translateX}px)`;
    requestAnimationFrame(animateMarquee);
  }
  
  // Запуск анимации
  requestAnimationFrame(animateMarquee);
  
  // Стили для скрытия переполнения
  const container = marquee.closest('.marquee-container');
  if (container) {
    container.style.overflow = 'hidden';
  }
});