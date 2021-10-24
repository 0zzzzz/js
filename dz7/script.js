// Глобальные переменные:                            
let FIELD_SIZE_X = 20;//строки
let FIELD_SIZE_Y = 20;//столбцы
let SNAKE_SPEED = 200; // Интервал между перемещениями змейки
let snake = []; // Сама змейка
let direction = 'y+'; // Направление движения змейки
let gameIsRunning = false; // Запущена ли игра
let snake_timer; // Таймер змейки
let food_timer; // Таймер для еды
let score = 0; // Результат

function init() {
    prepareGameField(); // Генерация поля

    let wrap = document.getElementsByClassName('wrap')[0];
    let inGameScore = document.querySelector('.score')
    inGameScore.innerHTML = 'Счёт: ' + score
    // Подгоняем размер контейнера под игровое поле
    
	/*
	if (16 * (FIELD_SIZE_X + 1) < 380) {
        wrap.style.width = '380px';
    }
    else {
        wrap.style.width = (16 * (FIELD_SIZE_X + 1)).toString() + 'px';
    }
    */
    wrap.style.width = '400px';
    // События кнопок Старт и Новая игра
    document.getElementById('snake-start').addEventListener('click', startGame);
    let buttonRenew = document.getElementById('snake-renew')
    buttonRenew.hidden = true;
    document.getElementById('snake-renew').addEventListener('click', refreshGame);

// Отслеживание клавиш клавиатуры
    addEventListener('keydown', changeDirection);
}

/**
 * Функция генерации игрового поля
 */
function prepareGameField() {
    // Создаём таблицу
    let game_table = document.createElement('table');
    game_table.setAttribute('class', 'game-table');

    // Генерация ячеек игровой таблицы
    for (let i = 0; i < FIELD_SIZE_X; i++) {
        // Создание строки
        let row = document.createElement('tr');
        row.className = 'game-table-row row-' + i;

        for (let j = 0; j < FIELD_SIZE_Y; j++) {
            // Создание ячейки
            let cell = document.createElement('td');
            cell.className = 'game-table-cell cell-' + i + '-' + j;

            row.appendChild(cell); // Добавление ячейки
        }
        game_table.appendChild(row); // Добавление строки
    }

    document.getElementById('snake-field').appendChild(game_table); // Добавление таблицы
}

/**
 * Старт игры
 */
function startGame() {

    gameIsRunning = true;
    respawn();//создали змейку

    snake_timer = setInterval(move, SNAKE_SPEED);//каждые 200мс запускаем функцию move
    setTimeout(createFood, 1000);
    setTimeout(createBarrier, 7000);
    let buttonStart = document.getElementById('snake-start')
    buttonStart.hidden = true;
    let buttonRenew = document.getElementById('snake-renew')
    buttonRenew.hidden = false;

}

/**
 * Функция расположения змейки на игровом поле
 */
function respawn() {
    // Змейка - массив td
    // Стартовая длина змейки = 2

    // Respawn змейки из центра
    let start_coord_x = Math.floor(FIELD_SIZE_X / 2);
    let start_coord_y = Math.floor(FIELD_SIZE_Y / 2);

    // Хвост змейки
    let snake_tail = document.getElementsByClassName('cell-' + start_coord_y + '-' + start_coord_x)[0];
    snake_tail.setAttribute('class', snake_tail.getAttribute('class') + ' snake-unit');
    // Голова змейки
    let snake_head = document.getElementsByClassName('cell-' + (start_coord_y - 1) + '-' + start_coord_x)[0];
    snake_head.setAttribute('class', snake_head.getAttribute('class') + ' snake-unit');

    snake.push(snake_tail);
    snake.push(snake_head);
}

/**
 * Движение змейки
 */
function move() {
    //console.log('move',direction);
    // Сборка классов
    let snake_head_classes = snake[snake.length - 1].getAttribute('class').split(' ');

    // Сдвиг головы
    let new_unit;
    let snake_coords = snake_head_classes[1].split('-');//преобразовали строку в массив
    let coord_y = parseInt(snake_coords[1]);
    let coord_x = parseInt(snake_coords[2]);

    // Определяем новую точку
    if (direction == 'x-') {
        new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (coord_x - 1))[0];
        if (new_unit == undefined){
            new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (FIELD_SIZE_X-1))[0];
        }
    }
    else if (direction == 'x+') {
        new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (coord_x + 1))[0];
        if (new_unit == undefined){
            new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (0))[0];
        }
    }
    else if (direction == 'y+') {
        new_unit = document.getElementsByClassName('cell-' + (coord_y - 1) + '-' + (coord_x))[0];
        if (new_unit == undefined){
            new_unit = document.getElementsByClassName('cell-' + (FIELD_SIZE_Y-1) + '-' + (coord_x))[0];
        }
    }
    else if (direction == 'y-') {
        new_unit = document.getElementsByClassName('cell-' + (coord_y + 1) + '-' + (coord_x))[0];
        if (new_unit == undefined){
            new_unit = document.getElementsByClassName('cell-' + (0) + '-' + (coord_x))[0];
        }
    }

    // Проверки
    // 1) new_unit не часть змейки
    // 2) Змейка не ушла за границу поля
    //console.log(new_unit);
    if (!isSnakeUnit(new_unit)) {
        // Добавление новой части змейки
        new_unit.setAttribute('class', new_unit.getAttribute('class') + ' snake-unit');
        snake.push(new_unit);

        // Проверяем, надо ли убрать хвост
        if (!haveFood(new_unit)) {
            // Находим хвост
            let removed = snake.splice(0, 1)[0];
            let classes = removed.getAttribute('class').split(' ');

            // удаляем хвост
            removed.setAttribute('class', classes[0] + ' ' + classes[1]);
        } 
    }
    else {
        finishTheGame();
    }
    if (barrierBreak(new_unit)) {
        finishTheGame();
    }
}

/**
 * Проверка на змейку
 * @param unit
 * @returns {boolean}
 */
function isSnakeUnit(unit) {
    let check = false;

    if (snake.includes(unit)) {
        check = true;
    }
    return check;
}
/**
 * проверка на еду
 * @param unit
 * @returns {boolean}
 */
function haveFood(unit) {
    let check = false;

    let unit_classes = unit.getAttribute('class').split(' ');

    // Если еда
    if (unit_classes.includes('food-unit')) {
        check = true;
        createFood();
        score++;
        let inGameScore = document.querySelector('.score')
        inGameScore.innerHTML = 'Счёт: ' + score
        
    }
    return check;
}

function barrierBreak(unit) {
    let check = false;

    let unit_classes = unit.getAttribute('class').split(' ');

    // Если барьер
    if (unit_classes.includes('barrier-unit')) {
        check = true;
    }
    return check;
}

/**
 * Создание еды
 */
function createFood() {
    if (gameIsRunning == true){
        let foodCreated = false;

        while (!foodCreated) { //пока еду не создали
            // рандом
            let food_x = Math.floor(Math.random() * FIELD_SIZE_X);
            let food_y = Math.floor(Math.random() * FIELD_SIZE_Y);

            let food_cell = document.getElementsByClassName('cell-' + food_y + '-' + food_x)[0];
            let food_cell_classes = food_cell.getAttribute('class').split(' ');

            // проверка на змейку
            if (!food_cell_classes.includes('snake-unit') && !food_cell_classes.includes('barrier-unit')) {
                let classes = '';
                for (let i = 0; i < food_cell_classes.length; i++) {
                    classes += food_cell_classes[i] + ' ';
                }

                food_cell.setAttribute('class', classes + 'food-unit');
                foodCreated = true;
            }
        }
    }
}

function createBarrier() {
    if (gameIsRunning == true){
        let barrier_x = Math.floor(Math.random() * FIELD_SIZE_X);
        let barrier_y = Math.floor(Math.random() * FIELD_SIZE_Y);
    
        let barrier_cell = document.getElementsByClassName('cell-' + barrier_y + '-' + barrier_x)[0];
        let barrier_cell_classes = barrier_cell.getAttribute('class').split(' ');
    
        // проверка на змейку
        if (!barrier_cell_classes.includes('snake-unit') && !barrier_cell_classes.includes('food-unit')) {
            let classes = '';
            for (let i = 0; i < barrier_cell_classes.length; i++) {
                classes += barrier_cell_classes[i] + ' ';
            }
    
            barrier_cell.setAttribute('class', classes + 'barrier-unit');
            barrierCreated = true;
        }
        setTimeout(createBarrier, 7000);
    }
}


/**
 * Изменение направления движения змейки
 * @param e - событие
 */
function changeDirection(e) {
    console.log(e);
	switch (e.keyCode) {
        case 37: // Клавиша влево
            if (direction != 'x+') {
                direction = 'x-'
            }
            break;
        case 38: // Клавиша вверх
            if (direction != 'y-') {
                direction = 'y+'
            }
            break;
        case 39: // Клавиша вправо
            if (direction != 'x-') {
                direction = 'x+'
            }
            break;
        case 40: // Клавиша вниз
            if (direction != 'y+') {
                direction = 'y-'
            }
            break;
    }
}

/**
 * Функция завершения игры
 */
function finishTheGame() {
    gameIsRunning = false;
    clearInterval(snake_timer);
    alert('Вы проиграли! Ваш результат: ' + score.toString());
    
}

/**
 * Новая игра
 */
function refreshGame() {
    location.reload();
}

// Инициализация
window.onload = init;