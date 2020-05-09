
'use strict'

// Объявление переменных
const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');
const cardsRestaurants = document.querySelector('.cards-restaurants');
const conteinerPromo = document.querySelector('.container-promo');
const restaurants = document.querySelector('.restaurants');
const menu = document.querySelector('.menu');
const logo = document.querySelector('.logo');
const cardsMenu = document.querySelector('.cards-menu');
const restaurantTitle = document.querySelector('.restaurant-title');
const rating = document.querySelector('.rating');
const minPrice = document.querySelector('.price');
const category = document.querySelector('.category');
const modalBody = document.querySelector('.modal-body');
const modalPrice = document.querySelector('.modal-pricetag');
const buttonClearCart = document.querySelector('.clear-cart')



let login = localStorage.getItem('gloDelivery'); // Записывает значение из localStorage в переменную для хранения логина

// Корзина
const cart = [];
// ФУНКЦИИ

// Функция, привязывающая товары в корзине к логину 
const loadCart = function() {
    if(localStorage.getItem(login)) {
      JSON.parse(localStorage.getItem(login)).forEach(function(item) {
          cart.push(item);
      })
    }
  }

  
const saveCart = function() {
    localStorage.setItem(login, JSON.stringify(cart));
}

// Функция, осуществляющая запрос к json-файлу 
// async - делает функцию асинхронной, т.е. на время выполнения запроса работа сайта не останавливается  
// К подобной функции, записанной в переменную, нельзя обратиться до их объявления
const getData = async function(url) {
  const response = await fetch(url) //fetch делает запрос

  if(!response.ok) {
    throw new Error(`Ошибка по адресу ${url}, статус ошибки ${responce.status}!`); //throw - создаёт ощибку, которую можно описать самому
  };

  return await response.json(); //Возвращает данные json в место вызова функции 
}

// Функция валидации с использованием регулярного выражения
const valid = function(str) {
  const nameReg = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/;
  return nameReg.test(str);
}

function toggleModal() {
  modal.classList.toggle("is-open");
}

// Функция 'toogleModalAuth' навешивает метод 'toggle', который добавляет или убирает клас 'is-open'
function toogleModalAuth() {                            
  modalAuth.classList.toggle('is-open'); 
  loginInput.style.borderColor = ''; // Возвращает рамку в нормальное состояние 
}

/* classList.toggle - добавляет класс, если его нет и удаляет, если есть
   classList.add - добавляет класс
   classList.remove - удаляет класс
*/ 


function autorized() {
  // Функция logOut записывает в переменную login пустую строку, проверяет авторизацию с помощью checkAuth(), и возвращает исходные сss значения для кнопки 'Выйти', 
  // span, в который записывается логин, к возвращает кнопку 'Войти'  
  function logOut() {
    login = null;
    localStorage.removeItem('gloDelivery'); // Удаляет данные авторизации из localStorage при выходе из аккаунта
    buttonAuth.style.display = '';
    userName.style.display = '';
    buttonOut.style.display = '';
    cartButton.style.display = '';
    buttonOut.removeEventListener('click', logOut); //Удаляем событие, чтобы оно не навешивалось многократно 

    checkAuth();
    // returnMain();
    cart.length = 0;
  }

  console.log('Авторилован');

  userName.textContent = login; // Добавляет в изначально скрытый блок текст, который ввели в поле для логина
  cartButton.style.display = 'flex'; //Отображает кнопку корзины при авторизации
  buttonAuth.style.display = "none"; // Скрывает кнопку 'Войти'
  userName.style.display = 'inline'; // Отображает на странице в виде inline-блока span, в который записавыется введенный пользователем логин
  buttonOut.style.display = 'flex'; // заменяет значение display: none у button-out на block, чтобы отобразить кнопку 'Выйти'
  buttonOut.addEventListener('click', logOut); // На кнопку "Выйти" навешиваем событие по клику, которое запускает функцию logOut
  loadCart();
};

function notAuthorized() {
  console.log('Не авторизован');

  function logIn(event) {
    event.preventDefault();
    
    //Проверка на факт ввода логина в поле, если ничего не введено в поле ввода, то условие выдает false
    //Метод 'trim' удаляет пробелы слева и справа 
    if (valid(loginInput.value)) {
      login = loginInput.value; //получаем введенные в поле для ввода логина данные и выводим их в консоль
      localStorage.setItem('gloDelivery', login); //Добавляет в localStorage в браузере пользователя данные о авторизации 

      toogleModalAuth(); // Функция, которая закрывает модальное окно удаляя класс 'is-open' 
      buttonAuth.removeEventListener('click', toogleModalAuth); //Удаляем событие, чтобы оно не навещивалось многократно 
      closeAuth.removeEventListener('click', toogleModalAuth); //Удаляем событие, чтобы оно не навещивалось многократно 
      logInForm.removeEventListener('submit', logIn); //Удаляем событие, чтобы оно не навещивалось многократно 
      
      logInForm.reset() // Удаляет из поля ввода логина все данные

      checkAuth(); // Функция проверяет авторизацию
    } else {
      loginInput.style.borderColor = 'red'; // Выкрашивает рамку поля ввода логина в красный цвет, если не введен логин
      loginInput.value = '';
    }
    
  }

  buttonAuth.addEventListener('click', toogleModalAuth); //Добавляем на кнопку "Войти" по нажатию класс "is-open" - в результате всплывает модальное окно
  closeAuth.addEventListener('click', toogleModalAuth);  //На крестик в модальном окне навешивается 'toogle', который уберает имеющийся класс 'is-open' и модальное окно закрывается. 
  logInForm.addEventListener('submit', logIn);
} 

function checkAuth() {
    if (login) {
    autorized();
  } else {
    notAuthorized();
  }
}


function createCardRestaurant(restaurant) {

  const { image, 
          kitchen, 
          name, 
          price, 
          stars, 
          products, 
          time_of_delivery: timeOfDelivery } = restaurant;//Деструктуризация. В результате получаем переменные с этими именами, данные для которых буруться из json 

  // Записываем верстку карточки в переменную
  const card = `
      <a class="card card-restaurant" data-products="${products}" data-info="${[name, price, stars, kitchen]}">
        <img src="${image}" alt="image" class="card-image"/>
        <div class="card-text">
          <div class="card-heading">
            <h3 class="card-title">${name}</h3>
            <span class="card-tag tag">${timeOfDelivery}</span>
          </div>
          <div class="card-info">
            <div class="rating">
              ${stars}
            </div>
            <div class="price">От ${price} ₽</div>
            <div class="category">${kitchen}</div>
          </div>
        </div>
      </a>
  `;

  cardsRestaurants.insertAdjacentHTML('beforeend', card); // Вставляем HTML код, который записан в переменную Card с помощью метода insertAdjacentHTML 
  
}

// Функция createCardGoods создает элемент меню и добавляет его на страницу
function createCardGoods({ description, id, image, name, price }) {

  const card = document.createElement('div'); // Создает элемент div на странице 
  card.className = 'card'; // Добавляет класс 'card' элементу, созданному с помошью метода createElement выше
  // Вставляем верстку в созданный элементы 
  card.insertAdjacentHTML('afterbegin', `
            <img src="${image}" alt="image" class="card-image"/>
            <div class="card-text">
              <div class="card-heading">
                <h3 class="card-title card-title-reg">${name}</h3>
              </div>
              <div class="card-info">
                <div class="ingredients">${description}
                </div>
              </div>
              <div class="card-buttons">
                <button class="button button-primary button-add-cart" id="${id}">
                  <span class="button-card-text">В корзину</span>
                  <span class="button-cart-svg"></span>
                </button>
                <strong class="card-price">${price} ₽</strong>
              </div>
            </div>
      `);

  cardsMenu.insertAdjacentElement('beforeend' ,card); // добавляет элемент card на страницу
};



// event - это объект-события, который создается во время события, допустим, клика 
function openGoods(event) {
  const target = event.target; // Свойство target объекта event определяет на каком элементе произошло событие. Допустим, на какой элемент верстки кликнул пользователь: div, img, span и т.д.
  
  
  // Так-как при нажатии мимо блока .card-restaurant мы получаем hull, то можно написать условие, которое будет проверять наличие restaurant после собития клика 
  // Условие сначала проверяющее булевое значение переменной 'restaurant', затем проверяет логин
  if (login) {
    const restaurant = target.closest('.card-restaurant'); // Метод closest поднимается выше во вложенности пока не найдет эдемент с заданных селектором 

    if(restaurant) {

      const info = restaurant.dataset.info.split(',');

      const [ name, price, stars, kitchen ] = info;

      cardsMenu.textContent = ''; // очищает блок с классом card-menu от ненужного дублирующегося контента (хотя у меня ничего не дублировалось)
      conteinerPromo.classList.add('hide'); // Добавляем класс hide блоку, записанному в переменную, чтобы скрыть его при условии
      restaurants.classList.add('hide'); // Добавляем класс hide блоку, записанному в переменную, чтобы скрыть его при условии
      menu.classList.remove('hide'); // Удаляем класс hide блоку, записанному в переменную, чтобы отобразить его при условии
      
      restaurantTitle.textContent = name;
      rating.textContent = stars;
      minPrice.textContent = `От ${price} ₽`;
      category.textContent = kitchen;
      
      getData(`./db/${restaurant.dataset.products}`).then(function(data) {
        console.log(data);
        data.forEach(createCardGoods);
      });



    } else {
      // Вызов функции, которая создает элемент div с классом card и версткой карточки внутри и добавляет его на страницу
      toogleModalAuth();
    };


  };
};

function addToCart(event) {

  const target = event.target;

  const buttonAddToCart = target.closest('.button-add-cart'); // Ограничевает поле действия собития, которое висит нак кнопке "В корзину", габаритами самой кнопки
  
  if (buttonAddToCart) { 
    const card = target.closest('.card'); // Получаем саму карточку
    const title = card.querySelector('.card-title-reg').textContent; // Ищем необходимые элементы внутри карточки, чтобы передать их в корзину
    const cost = card.querySelector('.card-price').textContent; // Ищем необходимые элементы внутри карточки, чтобы передать их в корзину
    const id = buttonAddToCart.id; // Получаем уникальный id (id хранятся в json) у кнопок

    const food = cart.find(function(item) {
      return item.id === id;
    })


    //Условие, которое следит, чтобы один и тот же тип товара не добавлялся в корзину дважды. Вместо этого увеличивается счетчик.
    if(food) {
      food.count += 1;
    } else { 
      cart.push({
        id, //Современный синтаксис, тоже, что и id: id, создает свойство id со значением переменной id
        title, //Современный синтаксис
        cost, //Современный синтаксис
        count: 1 //добавляем один товар
      }); // Добавляем объект внутрь массива cart
    };
  };
  saveCart();
};

function renderCart() {
  modalBody.textContent = ''; // Очищаем корзину
  cart.forEach(function({ id, title, cost, count }) {
    // Формируем верстку элемента корзины
    const itemCart = `				
    <div class="food-row">
      <span class="food-name">${title}</span>
      <strong class="food-price">${cost}</strong>
      <div class="food-counter">
        <button class="counter-button counter-minus" data-id=${id}>-</button>
        <span class="counter">${count}</span>
        <button class="counter-button counter-plus" data-id=${id}>+</button>
      </div>
    </div>`;

    modalBody.insertAdjacentHTML('afterbegin', itemCart); // Добавляем HTML-код в начало списка заказов в корзине
  });


  // Суммирует цену товаров в корзине с помощью метода reduce, который возвращает результат предыдущего вызова функции (первый параметр)
  const totalPrice = cart.reduce(function(result, item) {
    return result + (parseFloat(item.cost) * item.count); // Функция parseFloat игнорирует всё кроме чисел и точек и возвращает числовое значение. itemm.count - колличество элементов
  }, 0); // При первой итерации, когда result неоткуда брать, приметься второй параметр метода reduce, а именно 0.

  // Выводим общую сумму 
  modalPrice.textContent = totalPrice + ' ₽';

};

// Функция плюс-минус счетчика товара в корзине 
function changeCount(event) {
  const target = event.target;

  if (target.classList.contains('counter-button')) {
    const food = cart.find(function(item) {
      return item.id === target.dataset.id;
    });
    if(target.classList.contains('counter-minus')) {
      food.count--
      if(food.count === 0) {
        cart.splice(cart.indexOf(food), 1)
      }
    };
    if(target.classList.contains('counter-plus')) food.count++;
    renderCart();
  };
  saveCart();
};

// ОБРАБОТЧИКИ СОБЫТИЙ

function init() {

    //Вызываем функцию и спомощью метода then зададим call-back функцию, которая сработает после того, как сработает getData (метод обработки Promis-ов)
    getData(`./db/partners.json`).then(function(data) {
      console.log(data);
      data.forEach(createCardRestaurant);
    });

    cardsRestaurants.addEventListener('click', openGoods); // При клике на cardsRestaurants запускается функция openGoods
    // это действие возвращает обратно скрытые функцией openGoods элементы 

    // Функцию можно записывать прямо внутри метода addEventListener - удобства ;) 
    logo.addEventListener('click', function () {
      conteinerPromo.classList.remove('hide');
      restaurants.classList.remove('hide');
      menu.classList.add('hide');
    });

    modalBody.addEventListener('click', changeCount) // Меняет счетчик товара в корзине

    cardsMenu.addEventListener('click', addToCart) //Обработчик события внутри карточек товара

    cartButton.addEventListener("click", function(){
      renderCart();
      toggleModal();
    });

    // Очищает корзину по нажатию на кнопку "Отмена" в модальном окне
    buttonClearCart.addEventListener('click', function() {
      cart.length = 0;
      renderCart();
    });

    close.addEventListener("click", toggleModal);

    checkAuth() // Функцию необходимо хотя бы один раз вызвать, чтобы она работала в 'logIn' (хрен пойми, почему так)

    new Swiper('.swiper-container', {
      loop: true,   //Настройка бесконечного прокручивания
      autoplay: { 
        delay: 10000,
      },  // Автоматическй запуск свайпера 
      // Здесь перечисляются настройки свайпера, полный перечень на сайте swiper-slider в разделе API
    }); //инициализация свайпера 
  };

  init();