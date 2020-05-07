const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}


// day one 


// Объявление переменных
const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');

let login = localStorage.getItem('gloDelivery'); // Записывает значение из localStorage в переменную для хранения логина

// Функция 'toogleModalAuth' навешивает метод 'toggle', который добавляет или убирает клас 'is-open'
function toogleModalAuth() {                            
  modalAuth.classList.toggle('is-open'); 
  loginInput.style.borderColor = ''; // Возвращает рамку в нормальное состояние 
}

/* classList.toggle - добавляет класс, если его нет и удаляет, если есть
   classList.add - добавляет класс
   classList.remove - удаляет класс
*/ 

console.log(login);

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


checkAuth() // Функцию необходимо хотя бы один раз вызвать, чтобы она работала в 'logIn' (хрен пойми, почему так)
