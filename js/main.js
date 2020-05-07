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


let login = localStorage.getItem('gloDelivery'); // Записывает значение из localStorage в переменную для хранения логина


// day one 

// ФУНКЦИИ

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
    buttonOut.removeEventListener('click', logOut); //Удаляем событие, чтобы оно не навешивалось многократно 

    checkAuth();
  }

  console.log('Авторилован');

  userName.textContent = login; // Добавляет в изначально скрытый блок текст, который ввели в поле для логина

  buttonAuth.style.display = "none"; // Скрывает кнопку 'Войти'
  userName.style.display = 'inline'; // Отображает на странице в виде inline-блока span, в который записавыется введенный пользователем логин
  buttonOut.style.display = 'block'; // заменяет значение display: none у button-out на block, чтобы отобразить кнопку 'Выйти'
  buttonOut.addEventListener('click', logOut); // На кнопку "Выйти" навешиваем событие по клику, которое запускает функцию logOut
};

function notAuthorized() {
  console.log('Не авторизован');

  function logIn(event) {
    event.preventDefault();
    

    //Проверка на факт ввода логина в поле, если ничего не введено в поле ввода, то условие выдает false
    //Метод 'trim' удаляет пробелы с лева и с права 
    if(loginInput.value.trim()) {
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


// day two

function createCardRestaurant() {
  // Записываем верстку карточки в переменную
  const card = `
      <a class="card card-restaurant">
        <img src="img/palki-skalki/preview.jpg" alt="image" class="card-image"/>
        <div class="card-text">
          <div class="card-heading">
            <h3 class="card-title">Палки скалки</h3>
            <span class="card-tag tag">55 мин</span>
          </div>
          <div class="card-info">
            <div class="rating">
              4.5
            </div>
            <div class="price">От 500 ₽</div>
            <div class="category">Пицца</div>
          </div>
        </div>
      </a>
  `;

  cardsRestaurants.insertAdjacentHTML('beforeend', card); // Вставляем HTML код, который записан в переменную Card с помощью метода insertAdjacentHTML 
  
}

// Функция createCardGoods создает элемент меню и добавляет его на страницу
function createCardGoods() {
  const card = document.createElement('div'); // Создает элемент div на странице 
  card.className = 'card'; // Добавляет класс 'card' элементу, созданному с помошью метода createElement выше
  // Вставляем верстку в созданный элементы 
  card.insertAdjacentHTML('afterbegin', `
            <img src="img/pizza-plus/pizza-vesuvius.jpg" alt="image" class="card-image"/>
            <div class="card-text">
              <div class="card-heading">
                <h3 class="card-title card-title-reg">Пицца Везувий</h3>
              </div>
              <div class="card-info">
                <div class="ingredients">Соус томатный, сыр «Моцарелла», ветчина, пепперони, перец
                  «Халапенье», соус «Тобаско», томаты.
                </div>
              </div>
              <div class="card-buttons">
                <button class="button button-primary button-add-cart">
                  <span class="button-card-text">В корзину</span>
                  <span class="button-cart-svg"></span>
                </button>
                <strong class="card-price-bold">545 ₽</strong>
              </div>
            </div>
      `);

  cardsMenu.insertAdjacentElement('beforeend' ,card); // добавляет элемент card на страницу
};



// event - это объект-события, который создается во время события, допустим, клика 
function openGoods(event) {
  const target = event.target; // Свойство target объекта event определяет на каком элементе произошло событие. Допустим, на какой элемент верстки кликнул пользователь: div, img, span и т.д.
  const restaurant = target.closest('.card-restaurant'); // Метод closest поднимается выше во вложенности пока не найдет эдемент с заданных селектором 
  
  // Так-как при нажатии мимо блока .card-restaurant мы получаем hull, то можно написать условие, которое будет проверять наличие restaurant после собития клика 
  if (restaurant) {
    cardsMenu.textContent = ''; // очищает блок с классом card-menu от ненужного дублирующегося контента (хотя у меня ничего не дублировалось)
    conteinerPromo.classList.add('hide'); // Добавляем класс hide блоку, записанному в переменную, чтобы скрыть его при условии
    restaurants.classList.add('hide'); // Добавляем класс hide блоку, записанному в переменную, чтобы скрыть его при условии
    menu.classList.remove('hide'); // Удаляем класс hide блоку, записанному в переменную, чтобы отобразить его при условии

    // Вызов функции, которая создает элемент div с классом card и версткой карточки внутри и добавляет его на страницу
    createCardGoods();
    createCardGoods();
    createCardGoods();
  }
}


// ОБРАБОТЧИКИ СОБЫТИЙ

cardsRestaurants.addEventListener('click', openGoods); // При клике на cardsRestaurants запускается функция openGoods
// это действие возвращает обратно скрытые функцией openGoods элементы 

// Функцию можно записывать прямо внутри метода addEventListener - удобства ;) 
logo.addEventListener('click', function () {
  conteinerPromo.classList.remove('hide');
  restaurants.classList.remove('hide');
  menu.classList.add('hide');
});

cartButton.addEventListener("click", toggleModal);

close.addEventListener("click", toggleModal);

// ВЫЗОВЫ ФУНКЦИЙ

checkAuth() // Функцию необходимо хотя бы один раз вызвать, чтобы она работала в 'logIn' (хрен пойми, почему так)

 //Вызов функции добавляет элемент 'ресторан' на страницу
 createCardRestaurant();
 createCardRestaurant();
 createCardRestaurant();