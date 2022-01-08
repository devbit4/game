const space = document.querySelector(".game");
const cal = space.getBoundingClientRect();
const start = document.querySelector(".start");
const time = document.querySelector(".time");
const lastTime = 5;

console.log(time.innerHTML)

// 게임준비
function spacing() {

    objects("shark", 5, "img/shark.png");
    objects("fish", 5, "img/fish.png");
    console.log(cal);
}

function objects(name, number, src) {
    const width = cal.width - 80;
    const height = cal.height - 80;

    for (let i = 0; i < number; i++) {
        const object = document.createElement("img");
        object.setAttribute("src", src);
        object.style.position = "absolute";
        const x = random(0, width);
        const y = random(0, height);
        object.style.left = `${x}px`;
        object.style.top = `${y}px`;
        space.appendChild(object);
    }
}

function random(min, max) {
    return Math.random() * (max - min) + min;
}

spacing();

// 게임시작

start.addEventListener("click", () => {
    start.style.display = "none";
    timer();

})

// 타이머

function timer() {
    let last = lastTime;
    let min = "";
    let sec = "";

    let x = setInterval(function () {
        min = parseInt(last / 60);
        sec = last % 60;
        time.innerHTML = min + ":" + sec;
        last--;
        if (last < 0) {
            clearInterval(x);
            time.innerHTML = "over";
        }
    }, 1000);
}