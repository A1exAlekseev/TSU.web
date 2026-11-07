const gameHours = [12, 2, 15, 3, 8, 1, 11];

function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}

function filterPopularGames(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > 10) {
      result.push(arr[i]);
    }
  }
  return result;
}

function calculateSum(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}


let userName = prompt("Введите ваше имя:");
if (userName === null || userName.trim() === "") {
  userName = "Геймер";
}

const totalHours = calculateSum(gameHours);
const popularGames = filterPopularGames(gameHours);
const popularHours = calculateSum(popularGames);
const maxHours = findMax(gameHours);

let lightCount = 0;
for (let i = 0; i < gameHours.length; i++) {
  if (gameHours[i] <= 3) {
    lightCount++;
  }
}
const lightShare = (lightCount / gameHours.length) * 100;

alert(
  "Привет, " + userName + "! Вы провели " + totalHours +
  " часов в играх, из них " + popularHours +
  " часов – в самых популярных."
);

console.log("Данные (часы по играм):", gameHours);
console.log("Игры > 10 часов:", popularGames);
console.log("Максимальное время в одной игре:", maxHours, "ч");
console.log("Количество коротких игровых сессий (≤ 3 ч):", lightCount);
console.log("Доля коротких игровых сессий:", lightShare.toFixed(1) + "%");

if (totalHours > 25) {
  console.log("Возможно, стоит сбалансировать время между играми и учёбой");
}

document.addEventListener('DOMContentLoaded', () => {
  // Поиск элементов
  const themeBtn = document.getElementById('theme-toggle');
  const addBtn = document.getElementById('add-game');
  const deleteLastBtn = document.getElementById('delete-last');
  const toggleBtn = document.getElementById('toggle-games');
  const container = document.getElementById('games-container');
  const section = document.querySelector('#games-section');

  // Обработка ошибок
  if (!themeBtn || !addBtn || !deleteLastBtn || !toggleBtn || !container || !section) {
    console.error('Элемент не найден. Проверьте id/селекторы кнопок и контейнера игр.');
    return;
  }

  // localStorage
  let games = JSON.parse(localStorage.getItem('games')) || [];
  let currentTheme = localStorage.getItem('theme') || 'dark';

  function applyTheme(theme) {
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add('theme-' + theme);
    localStorage.setItem('theme', theme);
    currentTheme = theme;
  }

  function saveGames() {
    localStorage.setItem('games', JSON.stringify(games));
  }

  function createCard(game, index) {
    const card = document.createElement('article');
    card.className = 'game-card';

    const title = document.createElement('h3');
    title.textContent = game.name;

    const genre = document.createElement('p');
    genre.textContent = 'Жанр: ' + game.genre;

    const rating = document.createElement('p');
    rating.className = 'rating';
    rating.textContent = '★'.repeat(game.rating) + '☆'.repeat(5 - game.rating);

    const delBtn = document.createElement('button');
    delBtn.type = 'button';
    delBtn.textContent = 'Удалить';
    delBtn.addEventListener('click', () => {
      games.splice(index, 1);
      saveGames();
      renderGames();
    });

    card.appendChild(title);
    card.appendChild(genre);
    card.appendChild(rating);
    card.appendChild(delBtn);

    return card;
  }

  function renderGames() {
    container.innerHTML = '';
    games.forEach((game, index) => {
      const card = createCard(game, index);
      container.appendChild(card);
    });
  }

  // Восстановление состояния
  applyTheme(currentTheme);
  renderGames();

  // Переключение темы
  themeBtn.addEventListener('click', () => {
    const next = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  });

  // Добавить игру
  addBtn.addEventListener('click', () => {
    const name = prompt('Название игры:');
    if (!name || !name.trim()) return;

    const genre = prompt('Жанр:');
    if (!genre || !genre.trim()) return;

    const ratingInput = prompt('Рейтинг (1–5):');
    const rating = parseInt(ratingInput, 10);
    if (isNaN(rating) || rating < 1 || rating > 5) {
      alert('Рейтинг должен быть целым числом от 1 до 5');
      return;
    }

    games.push({
      name: name.trim(),
      genre: genre.trim(),
      rating: rating
    });
    saveGames();
    renderGames();
  });

  // Удалить последнюю
  deleteLastBtn.addEventListener('click', () => {
    const cards = document.querySelectorAll('.game-card');
    if (cards.length === 0) {
      console.log('Нет игр для удаления');
      alert('Список пуст');
      return;
    }
    games.pop();
    saveGames();
    renderGames();
  });

  // Скрытие/показ секции
  toggleBtn.addEventListener('click', () => {
    container.classList.toggle('hidden');
    toggleBtn.textContent = container.classList.contains('hidden')
      ? 'Показать игры'
      : 'Скрыть игры';
  });
});