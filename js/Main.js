"use strict";
//crea los elementos
const main = document.getElementById('main');
const timerElem = document.getElementById('timer');
const scoreElem = document.getElementById('score');
const elemsElem = document.getElementById('elems');
const menu = document.getElementById('menu');
const title = document.getElementById('title');
const startBtn = document.getElementById('start');
const playingSong = new Audio('soundtrack/game.mp3');
const soundEffect = new Audio('soundtrack/die.mp3');

//instanciacion variables 
let player;
let enemies = [];
let bonuss = [];
let timer;
let score;

let playing = false;
let wasSpawned = false;
let wasUpdated = false;
 
//boton de inicio
startBtn.addEventListener('click', startGame);

//inicio del juego y creacion de los objetos y variables 
function startGame() {
    soundEffect.pause();
    soundEffect.currentTime = 0;
    playingSong.play();
    for (const child of main.children) {
        child.style.animationPlayState = 'running';
    }
    menu.style.opacity = 0;
    elemsElem.style.opacity = 0;
    playing = true;
    timer = 15;
    score = 0;
    timerElem.innerHTML = `Tiempo restante: ${timer}`;
    scoreElem.innerHTML = `Metros recorridos: ${score}m`;
    player = new Player(main);
    window.addEventListener('keydown', function(e) {
        if ( playing && (e.key == 'ArrowUp'))
            player.jump();
    });
    setInterval(() => {if (playing) gameLoop()}, 17);
    if (!wasUpdated) updateStats();
    if (!wasSpawned) spawnEntity();
}

//actualizacion de tiempo y distancia
function updateStats() {
    wasUpdated = true;
    setInterval(() => {
        if (playing) {
            timer--;
            timerElem.innerHTML = `Tiempo restante: ${timer}`;
            score++;
            scoreElem.innerHTML = `Metros recorridos: ${score}m`;
        }
    }, 1000)
}

//spawn de obstaculo o bonus
function spawnEntity() {
    wasSpawned = true;
    setInterval(() => {
        if (playing) {
            const random = Math.floor(Math.random() * 5);
            if (random < 3) {
                enemies.push(new Enemy(main));
            } else {
                bonuss.push(new Bonus(main));
            }
        }
    }, 1000);
}

//comprueba colisiones y agotamiento tiempo 
function gameLoop() {
    for (const enemy of enemies) {
        if(areColliding(player.getPos(), enemy.getPos())) {
            endGame(enemy);
            break;
        }
    }
    bonuss.forEach(bonus => {
        if(areColliding(player.getPos(), bonus.getPos())) {
            timebonus(bonuss, bonus);
        }
    });
    if (timer == 0)
        endGame();
}

//actualza el tiempo restante al capturar bonus
function timebonus(bonuss, bonus) {
    bonus.time();
    timer=timer+2;
    timerElem.innerHTML = `Tiempo restante: ${timer}`;
    bonuss.splice(bonuss.indexOf(bonus), 1);
}

//comprueba colisiones
function areColliding(elem1, elem2) {
    return (
        elem1.left < elem2.right &&
        elem1.right > elem2.left &&
        elem1.top < elem2.bottom &&
        elem1.bottom > elem2.top
    )
}

//fin del juego y menu de reinicio
function endGame(enemy = null) {
    playingSong.pause();
    playingSong.currentTime = 0;
    soundEffect.play();
    playing = false;
    for (const child of main.children) {
        child.style.animationPlayState = 'paused';
    }
    player.die();
    if (enemy) enemy.hit();
    //espera por animaciones y sonidos
    setTimeout(() => {
        player = null;
        enemies.forEach(enemy => enemy.remove());
        bonuss.forEach(bonus => bonus.remove());
        bonuss = [];
        enemies = [];
        title.innerHTML = `Recorriste un total de: ${score} metros!`;
        elemsElem.style.opacity = 1;
        timerElem.innerHTML = ``;
        scoreElem.innerHTML = ``;
        menu.style.opacity = 0.8;
    }, 1000);
}