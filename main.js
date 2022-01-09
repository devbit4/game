const space = document.querySelector('.game-space');
const cal = space.getBoundingClientRect();
const start = document.querySelector('.start');
const stop = document.querySelector('.stop');
const time = document.querySelector('.time');
const pop = document.querySelector('.pop-up');
const replay = document.querySelector('.replay');
const score = document.querySelector('.game-score');
const fishes = document.querySelectorAll('.fish');
const message = document.querySelector('.message');
const lastTime = 5;
let clock;
let points = 5;

// 게임준비
function spacing() {
    space.innerHTML = '';
    objects('shark', 5, 'img/shark.png');
    objects('fish', 5, 'img/fish.png');
}

function objects(name, number, src) {
    const width = cal.width - 80;
    const height = cal.height - 80;

    for (let i = 0; i < number; i++) {
        const object = document.createElement('img');
        object.classList.add(name);
        object.setAttribute('src', src);
        object.style.position = 'absolute';
        const x = random(0, width);
        const y = random(20, height);
        object.style.left = `${x}px`;
        object.style.top = `${y}px`;
        space.appendChild(object);
    }
}

function random(min, max) {
    return Math.random() * (max - min) + min;
}

// 게임시작

start.addEventListener('click', () => {
    start.style.display = 'none';
    stop.classList.remove('stop-hide');
    gameStart();
});

function gameStart() {
    timer();
    spacing();
    score.innerHTML = points;
}

// 타이머

function timer() {
    let last = lastTime;
    let min = '';
    let sec = '';

    clock = setInterval(function () {
        --last;
        min = parseInt(last / 60);
        sec = last % 60;
        time.innerHTML = min + ':' + sec;
        if (last <= 0) {
            clearInterval(clock);
            time.innerHTML = 'OVER';
            gameStop();
        }
    }, 1000);
}

// 게임중지

stop.addEventListener('click', () => {
    gameStop();
});
function gameStop() {
    pop.classList.remove('hide');
    clearInterval(clock);
    time.innerHTML = '0:0';
    points = 5;
}

// 게임재시작
replay.addEventListener('click', () => {
    pop.classList.add('hide');
    gameStart();
});

// 점수내기
space.addEventListener('click', (e) => {
    if (e.target.className === 'fish') {
        e.target.remove();
        points--;
        score.innerHTML = points;
        if (points === 0) {
            gameStop();
            message.innerHTML = 'You Win!';
            console.log('win');
        }
    } else if (e.target.className == 'shark') {
        gameStop();
        message.innerHTML = 'You Lost!';
    }
});
