document.addEventListener('DOMContentLoaded', function() {
    const coffeeCards = document.querySelectorAll('.coffee-card');
    const modalTemplate = `
      <div class="modal coffee-modal" id="coffee-modal">
        <div class="modal__content">
          <span class="modal__close">&times;</span>
          <div class="coffee-modal__content">
            <div class="coffee-modal__image">
              <img src="" alt="" id="modal-coffee-image">
            </div>
            <div class="coffee-modal__info">
              <h2 class="coffee-modal__title" id="modal-coffee-title"></h2>
              <p class="coffee-modal__price" id="modal-coffee-price"></p>
              <p class="coffee-modal__description" id="modal-coffee-description"></p>
              <div class="coffee-modal__composition">
                <h3 class="coffee-modal__composition-title">Состав:</h3>
                <ul class="coffee-modal__composition-list" id="modal-coffee-composition"></ul>
              </div>
              <div class="coffee-modal__actions">
                <button class="btn btn--primary" id="add-to-cart">В корзину</button>
                <button class="btn btn--outline" id="close-modal">Закрыть</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalTemplate);
    const coffeeModal = document.getElementById('coffee-modal');
    const closeModalBtn = coffeeModal.querySelector('.modal__close');
    const closeBtn = coffeeModal.querySelector('#close-modal');
    
    // Coffee data
    const coffeeData = {
      espresso: {
        title: 'Эспрессо',
        price: '150 ₽',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_-uOO3NT5EsLFxarJ8vb4jS1-hS7SkhxJeg&s',
        description: 'Классический эспрессо из отборных зерен арабики. Насыщенный вкус с нотками шоколада и карамели, с плотной кремастой пенкой.',
        composition: ['100% арабика', 'Эфиопия Иргачеффе', 'Средняя обжарка', 'Объем: 30 мл']
      },
      cappuccino: {
        title: 'Капучино',
        price: '220 ₽',
        image: 'https://cdn.prod.website-files.com/5f92b98ef775e43402afe27f/632845fd4a30f55ce6011c1d_Polyakovfoto_Simple%20Coffee17803.jpg',
        description: 'Идеальный баланс эспрессо, молока и молочной пены. Нежный вкус с бархатистой текстурой.',
        composition: ['Эспрессо 30 мл', 'Молоко 150 мл', 'Пена 20 мл', 'Можно с корицей или какао']
      },
      latte: {
        title: 'Латте',
        price: '240 ₽',
        image: 'https://101kofemashina.ru/wp-content/uploads/2021/06/billy-kwok-vfiA7rRtjWo-unsplash-e1637677562131.jpg',
        description: 'Мягкий кофейный напиток с преобладанием молока. Идеален для тех, кто любит нежный вкус кофе.',
        composition: ['Эспрессо 30 мл', 'Молоко 200 мл', 'Тонкий слой пены', 'Ванильный или карамельный сироп по желанию']
      },
      americano: {
        title: 'Американо',
        price: '180 ₽',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtOs5jMlB8lLHizwwA-DEsvcINyJynNzkIaA&s',
        description: 'Эспрессо, разбавленный горячей водой. Сохраняет насыщенный вкус, но менее концентрированный.',
        composition: ['Эспрессо 30 мл', 'Горячая вода 120 мл', 'По желанию: молоко, сахар']
      },
      raf: {
        title: 'Раф кофе',
        price: '260 ₽',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeYMcuckqT8-2wUlj2ggkIuaBCyw-G9L_93A&s',
        description: 'Авторский напиток, созданный в России. Готовится из эспрессо, сливок и ванильного сахара, взбитых вместе.',
        composition: ['Эспрессо 30 мл', 'Сливки 100 мл', 'Ванильный сахар', 'Взбивается в капучинаторе']
      }
    };
    
    // Open modal with coffee details
    coffeeCards.forEach(card => {
      card.addEventListener('click', function() {
        const coffeeId = this.id;
        const coffee = coffeeData[coffeeId];
        
        if (coffee) {
          document.getElementById('modal-coffee-image').src = coffee.image;
          document.getElementById('modal-coffee-image').alt = coffee.title;
          document.getElementById('modal-coffee-title').textContent = coffee.title;
          document.getElementById('modal-coffee-price').textContent = coffee.price;
          document.getElementById('modal-coffee-description').textContent = coffee.description;
          
          const compositionList = document.getElementById('modal-coffee-composition');
          compositionList.innerHTML = '';
          
          coffee.composition.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            compositionList.appendChild(li);
          });
          
          coffeeModal.style.display = 'block';
          setTimeout(() => {
            coffeeModal.classList.add('show');
          }, 10);
          document.body.classList.add('no-scroll');
        }
      });
    });
    
    // Close modal
    function closeCoffeeModal() {
      coffeeModal.classList.remove('show');
      setTimeout(() => {
        coffeeModal.style.display = 'none';
        document.body.classList.remove('no-scroll');
      }, 300);
    }
    
    closeModalBtn.addEventListener('click', closeCoffeeModal);
    closeBtn.addEventListener('click', closeCoffeeModal);
    
    window.addEventListener('click', (e) => {
      if (e.target === coffeeModal) {
        closeCoffeeModal();
      }
    });
    
    // Add to cart functionality
    const addToCartBtn = document.getElementById('add-to-cart');
    
    addToCartBtn.addEventListener('click', function() {
      const title = document.getElementById('modal-coffee-title').textContent;
      const price = document.getElementById('modal-coffee-price').textContent;
      
      // Here you would normally add to cart
      console.log(`Added to cart: ${title} - ${price}`);
      
      // Show success message
      const successMsg = document.createElement('div');
      successMsg.textContent = 'Добавлено в корзину!';
      successMsg.style.color = '#2ecc71';
      successMsg.style.marginTop = '20px';
      successMsg.style.textAlign = 'center';
      successMsg.style.fontWeight = '500';
      
      this.parentNode.appendChild(successMsg);
      
      setTimeout(() => {
        successMsg.remove();
        closeCoffeeModal();
      }, 1500);
    });
    
    // Filter functionality
    const typeFilter = document.getElementById('coffee-type');
    const originFilter = document.getElementById('coffee-origin');
    const roastFilter = document.getElementById('coffee-roast');
    const resetBtn = document.querySelector('.filter-reset');
    const coffeeItems = document.querySelectorAll('.coffee-card');
    
    function filterCoffee() {
      const typeValue = typeFilter.value;
      const originValue = originFilter.value;
      const roastValue = roastFilter.value;
      
      coffeeItems.forEach(item => {
        const itemType = item.dataset.type;
        const itemOrigin = item.dataset.origin;
        const itemRoast = item.dataset.roast;
        
        const typeMatch = typeValue === 'all' || itemType === typeValue;
        const originMatch = originValue === 'all' || itemOrigin === originValue;
        const roastMatch = roastValue === 'all' || itemRoast === roastValue;
        
        if (typeMatch && originMatch && roastMatch) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    }
    
    typeFilter.addEventListener('change', filterCoffee);
    originFilter.addEventListener('change', filterCoffee);
    roastFilter.addEventListener('change', filterCoffee);
    
    resetBtn.addEventListener('click', function() {
      typeFilter.value = 'all';
      originFilter.value = 'all';
      roastFilter.value = 'all';
      filterCoffee();
    });
    
    // Animate coffee cards on scroll
    const animateOnScroll = function() {
      const elements = document.querySelectorAll('.coffee-card');
      
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
  });
  
  // Smooth scrolling for anchor links (same as in main.js)
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