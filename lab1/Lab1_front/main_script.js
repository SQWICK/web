const xInput = document.getElementById("xInput");
const ySelect = document.getElementById("select");
const rButtons = document.querySelectorAll("#rGroup button");
const checkBtn = document.getElementById("checkBtn");
const clearBtn = document.getElementById("clearBtn");
const KEY_STOR = "checkRes"

var selectR = null;

rButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        rButtons.forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        selectR = parseFloat(btn.textContent);
    })
})

function validateX(raw){
    const x = parseFloat(String(raw).replace(',', '.'));
    if (isNaN(x)) return {ok: false, msg: 'X не число'};
    if (x < -3 || x > 5) return {ok: false, msg: 'X вне диапазона (-3..5)'};
    return { ok: true, value: x };
}

function validateY(raw){
    const y = parseFloat(raw);
    if (isNaN(y)) return {ok: false, msg: "Y не число"};
    return {ok: true, value: y}
}

function validateR(r){
    if (r === null || isNaN(r)) return {ok: false, msg: 'R не выбран'};
    return { ok: true, value: r };
}

function isInArea(x, y, r) {

    const inCircle = x >= 0 && y >= 0 && (x * x + y * y) <= (r * r) / 4;

    const inTriangle = x >= 0 && y <= 0 && y >= x - r;

    const inRect = x >= -r / 2 && x <= 0 && y >= -r && y <= 0;

    return inCircle || inTriangle || inRect;
}

function loadResult(){
    const raw = localStorage.getItem(KEY_STOR);
    return raw ? JSON.parse(raw) : [];
}


function saveResult(ress){
    localStorage.setItem(KEY_STOR, JSON.stringify(ress));
}

function addResult(x, y, r, hit){
    const ress = loadResult();
    ress.unshift({
        x, y, r, hit,
        time: new Date().toLocaleString("ru-RU")
    });
    saveResult(ress);
    loadTable(ress);
}

function loadTable(ress) {
    const tbody = document.getElementById("tbody");
    if (!tbody) return;

    tbody.innerHTML = "";
    for (const row of ress) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${row.x}</td>
            <td>${row.y}</td>
            <td>${row.r}</td>
            <td class="${row.hit ? 'hit' : 'miss'}">${row.hit ? 'Попал' : 'Мимо'}</td>
            <td>${row.time}</td>
        `;
        tbody.appendChild(tr);
    }
}




checkBtn.addEventListener('click', () => {

    const rawX = xInput.value;
    const rawY = ySelect.value;
    const rawR = selectR;
    var res = {x: null, y: null, r: null, hit: false};

    console.log('Значения введеные:');
    console.log("rawX", rawX);
    console.log("RAWy", rawY);
    console.log("rawR", rawR);


    const vX = validateX(rawX);
    const vY = validateY(rawY);
    const vR = validateR(rawR);

    if (!vX.ok || !vY.ok || !vR.ok){
        console.error("ОШИБКА ВАЛИДАЦИИ");
        if (!vX.ok) console.log("ошибка X", vX.msg);
        if (!vY.ok) console.log("ОШИБКА Y", vY.msg);
        if (!vR.ok) console.log("Ошибка R", vR.msg);
        return;
    }

    res = { x: vX.value, y: vY.value, r: vR.value, hit: isInArea(vX.value, vY.value, vR.value) };

    addResult(res.x, res.y, res.r, res.hit);

    new Audio(res.hit ? "the-sound-of-a-cat-quotmeowquot.mp3" : "a-heart-rending-cat-cry.mp3").play();

    console.log("Результат:", res);
    console.log(localStorage.getItem(KEY_STOR));
})

clearBtn.addEventListener("click", () => {
    localStorage.clear();
    loadTable();
})

document.addEventListener("DOMContentLoaded", () => {
    loadTable(loadResult());
});




