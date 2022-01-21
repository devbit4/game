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
const lastTime = 6;
let clock;
let points = 5;
//character info
const char1 = "fish";
const char2 = "shark";
const char1_num = 5;
const char2_num = 5;
const char1_imgPath = 'img/fish.png';
const char2_imgPath = 'img/shark.png';
const char1_width = 50;
const char2_width = 80;

const rule = document.querySelector(".rule");
const ruleClose = document.querySelector(".close");
const ruleOpen = document.querySelector(".ruleBtn");

ruleClose.addEventListener("click", () => {
    rule.style.display = "none";
})
ruleOpen.addEventListener("click", () => {
    rule.style.display = "block";
})

// 게임시작

start.addEventListener('click', () => {
    start.style.display = 'none';
    stop.classList.remove('stop-hide');
    gameStart();
});

stop.addEventListener('click', () => {
    gameStop();
});

// 게임재시작
replay.addEventListener('click', () => {
    pop.classList.add('hide');
    gameStart();
});

// 점수내기
space.addEventListener('click', (e) => {
    if (e.target.className === char1) {
        e.target.remove();
        points--;
        score.innerHTML = points;
        if (points === 0) {
            gameStop();
            message.innerHTML = 'You Won!';
        }
    } else if (e.target.className == char2) {
        e.target.remove();
        gameStop();
        message.innerHTML = 'You Lost!';
    }
});


// 게임준비
function spacing() {
    objects(char1, char1_num, char1_imgPath);
    objects(char2, char2_num, char2_imgPath);
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



function gameStart() {
    space.classList.add("active");
    time.innerHTML = 'Ready';
    timer();
    spacing();
    score.innerHTML = points;
}

// 타이머

function timer() {
    let last = lastTime;
    let min = parseInt(last / 60);
    let sec = last % 60;
    time.innerHTML = min + ':' + sec;

    clock = setInterval(function () {
        --last;
        min = parseInt(last / 60);
        sec = last % 60;
        time.innerHTML = min + ':' + sec;
        if (last <= 0) {
            clearInterval(clock);
            // time.innerHTML = 'OVER';
            message.innerHTML = 'You Lost!';
            gameStop();
        }
    }, 1000);
}

// 게임중지

function gameStop() {
    space.innerHTML = '';
    space.classList.remove("active");
    pop.classList.remove('hide');
    clearInterval(clock);
    time.innerHTML = 'over';
    points = 5;
}

// game rule

