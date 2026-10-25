// Данные
const gameHours = [12, 2, 15, 3, 8, 1, 11];

// Поиск максимального значения в массиве
function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}

// Фильтрация
function filterPopularGames(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > 10) {
      result.push(arr[i]);
    }
  }
  return result;
}

// Сумма всех элементов массива
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

const totalHours = calculateSum(gameHours);               // общее время в играх
const popularGames = filterPopularGames(gameHours);       // игры > 10 часов
const popularHours = calculateSum(popularGames);          // часы в популярных играх
const maxHours = findMax(gameHours);                      // самая «долгая» игра

// Цикл
let lightCount = 0;
for (let i = 0; i < gameHours.length; i++) {
  if (gameHours[i] <= 3) {
    lightCount++;
  }
}
const lightShare = (lightCount / gameHours.length) * 100;

// alert
alert(
  "Привет, " + userName + "! Вы провели " + totalHours +
  " часов в играх, из них " + popularHours +
  " часов – в самых популярных."
);

// console.log
console.log("Данные (часы по играм):", gameHours);
console.log("Игры > 10 часов:", popularGames);
console.log("Максимальное время в одной игре:", maxHours, "ч");
console.log("Количество коротких игровых сессий (≤ 3 ч):", lightCount);
console.log("Доля коротких игровых сессий:", lightShare.toFixed(1) + "%");

if (totalHours > 25) {
  console.log("Возможно, стоит сбалансировать время между играми и учёбой");
}