document.addEventListener('DOMContentLoaded', function() {
    const reviewForm = document.getElementById('review-form');
    const reviewsList = document.getElementById('reviews-list');
    const stars = document.querySelectorAll('.custom-star');
    const ratingInput = document.getElementById('review-rating');
  
    // Функция для создания карточки отзыва
    function createReviewCard(review) {
      const reviewCard = document.createElement('div');
      reviewCard.classList.add('custom-review-item');
      reviewCard.innerHTML = `
        <div class="custom-review-header">
          <div class="custom-review-info">
            <h3 class="custom-review-name">${review.name}</h3>
            <span class="custom-review-date">${review.date}</span>
          </div>
        </div>
        <div class="custom-review-rating">
          ${Array.from({ length: 5 }, (_, i) => `
            <span class="custom-star ${i < review.rating ? 'active' : ''}">★</span>
          `).join('')}
        </div>
        <p class="custom-review-text">${review.text}</p>
      `;
      return reviewCard;
    }
  
    // Загрузка отзывов из localStorage при загрузке страницы
    function loadReviews() {
      const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
      reviewsList.innerHTML = ''; // Очищаем список, чтобы избежать дублирования
      reviews.forEach(review => {
        const reviewCard = createReviewCard(review);
        reviewsList.insertBefore(reviewCard, reviewsList.firstChild);
      });
  
      // Добавляем начальные отзывы, если localStorage пуст
      if (reviews.length === 0) {
        const initialReviews = [
          {
            name: 'Марина',
            date: '20.03.2023',
            rating: 4,
            text: 'Замечательное место, интересный интерьер. Мне в целом понравилось, только могли бы добавить побольше десертов. Спасибо!'
          },
          {
            name: 'Екатерина',
            date: '15.02.2023',
            rating: 5,
            text: 'Очень атмосферное место, отличная музыка, вкусный кофе. Обязательно вернусь сюда снова! Рекомендую всем!'
          }
        ];
        initialReviews.forEach(review => {
          const reviewCard = createReviewCard(review);
          reviewsList.insertBefore(reviewCard, reviewsList.firstChild);
        });
        localStorage.setItem('reviews', JSON.stringify(initialReviews));
      }
    }
  
    // Сохранение отзыва в localStorage
    function saveReview(review) {
      const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
      reviews.unshift(review); // Добавляем новый отзыв в начало
      localStorage.setItem('reviews', JSON.stringify(reviews));
    }
  
    // Загружаем отзывы при загрузке страницы
    loadReviews();
  
    // Обработка выбора рейтинга
    stars.forEach(star => {
      star.addEventListener('click', function() {
        const value = this.getAttribute('data-value');
        ratingInput.value = value;
  
        stars.forEach(s => {
          if (s.getAttribute('data-value') <= value) {
            s.classList.add('active');
          } else {
            s.classList.remove('active');
          }
        });
      });
    });
  
    // Обработка отправки формы
    reviewForm.addEventListener('submit', function(e) {
      e.preventDefault();
  
      const name = document.getElementById('review-name').value.trim();
      const rating = ratingInput.value;
      const text = document.getElementById('review-text').value.trim();
  
      // Валидация
      let isValid = true;
  
      // Проверка имени
      if (!name) {
        isValid = false;
        const formGroup = document.getElementById('review-name').closest('.custom-form-group');
        formGroup.classList.add('error');
        formGroup.querySelector('.custom-form-error').textContent = 'Это поле обязательно';
      } else {
        const formGroup = document.getElementById('review-name').closest('.custom-form-group');
        formGroup.classList.remove('error');
        formGroup.querySelector('.custom-form-error').textContent = '';
      }
  
      // Проверка рейтинга
      if (rating === '0') {
        isValid = false;
        const formGroup = document.querySelector('.custom-rating').closest('.custom-form-group');
        formGroup.classList.add('error');
        formGroup.querySelector('.custom-form-error').textContent = 'Пожалуйста, выберите рейтинг';
      } else {
        const formGroup = document.querySelector('.custom-rating').closest('.custom-form-group');
        formGroup.classList.remove('error');
        formGroup.querySelector('.custom-form-error').textContent = '';
      }
  
      // Проверка текста отзыва
      if (!text) {
        isValid = false;
        const formGroup = document.getElementById('review-text').closest('.custom-form-group');
        formGroup.classList.add('error');
        formGroup.querySelector('.custom-form-error').textContent = 'Это поле обязательно';
      } else {
        const formGroup = document.getElementById('review-text').closest('.custom-form-group');
        formGroup.classList.remove('error');
        formGroup.querySelector('.custom-form-error').textContent = '';
      }
  
      if (isValid) {
        // Создаём новый отзыв
        const newReview = {
          name,
          date: new Date().toLocaleDateString('ru-RU'),
          rating: parseInt(rating),
          text
        };
  
        // Сохраняем в localStorage
        saveReview(newReview);
  
        // Добавляем отзыв в список
        const reviewCard = createReviewCard(newReview);
        reviewsList.insertBefore(reviewCard, reviewsList.firstChild);
  
        // Сбрасываем форму
        reviewForm.reset();
        ratingInput.value = '0';
        stars.forEach(star => star.classList.remove('active'));
  
        // Показываем сообщение об успехе
        const successMessage = document.createElement('div');
        successMessage.textContent = 'Отзыв успешно добавлен!';
        successMessage.style.color = '#00b894';
        successMessage.style.textAlign = 'center';
        successMessage.style.marginTop = '20px';
        successMessage.style.fontWeight = '500';
        reviewForm.appendChild(successMessage);
  
        setTimeout(() => {
          successMessage.remove();
        }, 2000);
      }
    });
  });