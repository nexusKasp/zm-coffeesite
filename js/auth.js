document.addEventListener('DOMContentLoaded', function () {
    // DOM элементы
    const authPrompt = document.getElementById('auth-prompt');
    const reviewFormContainer = document.getElementById('review-form-container');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const loginModal = document.getElementById('auth-modal');
    const registerModal = document.getElementById('reg-modal');
    const headerAuth = document.querySelector('.header__auth');
  
    let isLoggedIn = false;
    let currentUser = null;
  
    // Проверка авторизации при загрузке страницы
    function checkAuthStatus() {
      const userData = localStorage.getItem('userData');
      if (userData) {
        currentUser = JSON.parse(userData);
        isLoggedIn = true;
        updateUI();
      }
    }
  
    // Обновление интерфейса в зависимости от статуса авторизации
    function updateUI() {
      if (isLoggedIn && currentUser) {
        headerAuth.innerHTML = `
          <div class="nickname-box">
            <span class="user-nickname">${currentUser.name}</span>
            <button class="custom-logout-btn">Выйти</button>
          </div>
        `;
        authPrompt.style.display = 'none';
        reviewFormContainer.style.display = 'block';
  
        document.querySelector('.custom-logout-btn').addEventListener('click', logout);
      } else {
        headerAuth.innerHTML = `
          <button class="btn btn--outline auth-btn btn-hover-effect" id="login-btn">Войти</button>
          <button class="btn btn--primary auth-btn btn-hover-effect" id="register-btn">Регистрация</button>
        `;
        authPrompt.style.display = 'block';
        reviewFormContainer.style.display = 'none';
  
        document.getElementById('login-btn').addEventListener('click', openLoginModal);
        document.getElementById('register-btn').addEventListener('click', openRegisterModal);
      }
    }
  
    // Функция выхода из системы
    function logout() {
      isLoggedIn = false;
      currentUser = null;
      localStorage.removeItem('userData');
      updateUI();
      alert('Вы вышли из системы!');
    }
  
    // Открытие модального окна входа
    function openLoginModal() {
      loginModal.style.display = 'block';
      setTimeout(() => loginModal.classList.add('show'), 10);
      document.body.classList.add('no-scroll');
    }
  
    // Открытие модального окна регистрации
    function openRegisterModal() {
      registerModal.style.display = 'block';
      setTimeout(() => registerModal.classList.add('show'), 10);
      document.body.classList.add('no-scroll');
    }
  
    // Закрытие модального окна
    function closeModal(modal) {
      modal.classList.remove('show');
      setTimeout(() => {
        modal.style.display = 'none';
        document.body.classList.remove('no-scroll');
      }, 300);
    }
  
    // Обработка формы входа
    if (loginForm) {
      loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
  
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value.trim();
  
        // Валидация email
        if (!validateEmail(email)) {
          alert('Пожалуйста, введите корректный email');
          return;
        }
  
        // Валидация пароля
        if (password.length < 6) {
          alert('Пароль должен содержать не менее 6 символов');
          return;
        }
  
        // Успешный вход
        currentUser = {
          name: email.split('@')[0],
          email: email,
          phone: '+7 (123) 456-78-90'
        };
        isLoggedIn = true;
  
        localStorage.setItem('userData', JSON.stringify(currentUser));
        updateUI();
        closeModal(loginModal);
        alert('Вы успешно вошли в систему!');
      });
    }
  
    // Обработка формы регистрации
    if (registerForm) {
      registerForm.addEventListener('submit', function (e) {
        e.preventDefault();
  
        const name = document.getElementById('reg-name').value.trim();
        const phone = document.getElementById('reg-phone').value.trim();
        const email = document.getElementById('reg-email').value.trim();
        const password = document.getElementById('reg-password').value.trim();
        const confirm = document.getElementById('reg-confirm').value.trim();
  
        // Валидация email
        if (!validateEmail(email)) {
          alert('Пожалуйста, введите корректный email');
          return;
        }
  
        // Валидация телефона
        if (!validatePhone(phone)) {
          alert('Пожалуйста, введите корректный номер телефона');
          return;
        }
  
        // Валидация пароля
        if (password.length < 6) {
          alert('Пароль должен содержать не менее 6 символов');
          return;
        }
  
        // Проверка совпадения паролей
        if (password !== confirm) {
          alert('Пароли не совпадают');
          return;
        }
  
        // Успешная регистрация
        currentUser = {
          name: name,
          email: email,
          phone: phone
        };
        isLoggedIn = true;
  
        localStorage.setItem('userData', JSON.stringify(currentUser));
        updateUI();
        closeModal(registerModal);
        alert('Регистрация прошла успешно! Добро пожаловать!');
      });
    }
  
    // Обработчики для кнопок входа и регистрации
    loginBtn.addEventListener('click', openLoginModal);
    registerBtn.addEventListener('click', openRegisterModal);
  
    // Обработчики для ссылок в секции отзывов
    document.querySelectorAll('.login-link').forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        openLoginModal();
      });
    });
  
    document.querySelectorAll('.register-link').forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        openRegisterModal();
      });
    });
  
    // Переключение между формами в модальных окнах
    document.querySelector('.switch-to-register').addEventListener('click', (e) => {
      e.preventDefault();
      closeModal(loginModal);
      setTimeout(openRegisterModal, 300);
    });
  
    document.querySelector('.switch-to-login').addEventListener('click', (e) => {
      e.preventDefault();
      closeModal(registerModal);
      setTimeout(openLoginModal, 300);
    });
  
    // Закрытие модальных окон
    document.querySelectorAll('.modal__close').forEach(btn => {
      btn.addEventListener('click', () => {
        const modal = btn.closest('.modal');
        closeModal(modal);
      });
    });
  
    // Проверка авторизации при загрузке страницы
    checkAuthStatus();
  });
  
  // Функция валидации email
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  // Функция валидации телефона
  function validatePhone(phone) {
    const re = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
    return re.test(phone);
  }