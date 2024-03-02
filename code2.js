let playerList = [
    {
        name: 'Шишкин',
        level: 11,
        scope: 99,
        role: 'Игрок',
        online: true,
        days: 12,
        banStatus: {
            ban: false,
            time: 0,
            reason: ''
        },
        stikers: ['defult']
    },
    {
        name: 'Рома',
        level: 97,
        scope: 19,
        role: 'Игрок',
        online: false,
        days: 72,
        banStatus: {
            ban: false,
            time: 0,
            reason: ''
        },
        stikers: ['defult', 'pack1']
    },
    {
        name: 'Людовик',
        level: 18,
        scope: 10,
        role: 'Модератор',
        online: true,
        days: 99,
        banStatus: {
            ban: false,
            time: 0,
            reason: ''
        },
        stikers: ['defult', 'pack1', 'pack2']
    },
    {
        name: 'Пастернак',
        level: 83,
        scope: 45,
        role: 'Игрок',
        online: false,
        days: 12,
        banStatus: {
            ban: true,
            time: 10000000,
            reason: 'Хулиганил'
        },
        stikers: ['defult']
    }
];

let playerListWindow = document.querySelector('.playerList');
let addPlayerList = document.querySelector('.addPlayerList');
let btnSortTrigger = document.querySelector('.raisingDownBtn');
let btnName = document.querySelector('.nameBtn');
let btnLvl = document.querySelector('.lvlBtn');
let btnScope = document.querySelector('.scopeBtn');
let btnOnline = document.querySelector('.onlineBtn');
let btnAddPlayer = document.querySelector('.addPlayer');
let btnAdd = document.querySelector('.ok');

let roleSelect = document.querySelector('.roleSelect');

let profileName = document.querySelector('.nameInput');
let profileLvl = document.querySelector('.lvlInput');
let profileScope = document.querySelector('.scopeInput');
let profileOnline = document.querySelector('.isOnline');

let roleName = 'Игрок';
let sortTrigger = false;

btnSortTrigger.onclick = function () {
    if (sortTrigger == true) {
        sortTrigger = false;
        btnSortTrigger.classList.remove('active');
    }
    else {
        sortTrigger = true;
        btnSortTrigger.classList.add('active');
    }

}


btnAdd.onclick = function () {
    if (profileName.value === '' || profileLvl.value === '' || profileScope.value === '')
        return;
    addPlayer();
    addPlayerList.style.visibility = 'hidden';
}

btnAddPlayer.onclick = function () {
    addPlayerList.style.visibility = 'visible';
}
btnName.onclick = function () {
    getSorteArray(playerList, 'name');
}

btnLvl.onclick = function () {
    getSorteArray(playerList, 'level');
}

btnScope.onclick = function () {
    getSorteArray(playerList, 'scope');
}

btnOnline.onclick = function () {
    getSorteArray(playerList, 'online');
}

roleSelect.onchange = function () {
    console.log(1)
    if (roleSelect.options[roleSelect.selectedIndex].value == 'moder') {
        roleName = 'Модератор';
    }
    else {
        roleName = 'Игрок';
    }
    getSorteArray(playerList, 'role');
}

//сортировка
function getSorteArray(arr, key) {
    switch (key) {
        case 'level': case 'scope': case 'days':
            console.log(`\nОтсортированно по возрастанию по тегу: <${key}>\n`);
            return displayArr(sorteNum(arr, key));

        case 'name':
            console.log(`\nОтсортированно по алфавиту по тегу: <${key}>\n`);
            return displayArr(sorteAbc(arr, key));

        case 'online': case 'ban': case 'role':
            console.log(`\nОтсортированно по тегу: <${key}>\n`);
            return displayArr(sorteKey(arr, key));

        default:
            return console.log(`\nНеверный тег: <${key}> | Сортировка невозможна!`);
    }
}

//сортировка чисел по порядку
function sorteNum(arr, key) {
    //понижение
    if (sortTrigger == true) {
        for (let i = 0; i < arr.length - 1; i++) {
            let compareNum = Math.min(...arr.map((i) => i[key]));
            for (let j = 0 + i; j < arr.length; j++) {
                if (arr[j][key] > compareNum) {
                    let swap = arr[j];
                    compareNum = arr[j][key];
                    arr[j] = arr[0 + i];
                    arr[0 + i] = swap;
                }
            }
        }
    }
    //повышение
    else {
        for (let i = 0; i < arr.length - 1; i++) {
            let compareNum = Math.max(...arr.map((i) => i[key]));
            for (let j = 0 + i; j < arr.length; j++) {
                if (arr[j][key] < compareNum) {
                    let swap = arr[j];
                    compareNum = arr[j][key];
                    arr[j] = arr[0 + i];
                    arr[0 + i] = swap;
                }
            }
        }
    }
    return arr;
}

//сортировка по алфавиту первых символов
function sorteAbc(arr, key) {
    //понижение
    if (sortTrigger == true) {
        for (let i = 0; i < arr.length - 1; i++) {
            let compareWord = 'A';
            for (let j = 0 + i; j < arr.length; j++) {
                if (arr[j][key][0] > compareWord) {
                    let swap = arr[j];
                    compareWord = arr[j][key][0];
                    arr[j] = arr[0 + i];
                    arr[0 + i] = swap;
                }
            }
        }
    }
    //повышение
    else {
        for (let i = 0; i < arr.length - 1; i++) {
            let compareWord = 'Я';
            for (let j = 0 + i; j < arr.length; j++) {
                if (arr[j][key][0] < compareWord) {
                    let swap = arr[j];
                    compareWord = arr[j][key][0];
                    arr[j] = arr[0 + i];
                    arr[0 + i] = swap;
                }
            }
        }
    }
    return arr;
}

//сортировка по ключу
function sorteKey(arr, key) {
    let newArr = [];
    for (let item in arr) {
        if (key == 'ban' && arr[item].banStatus[key] == false)
            continue;
        else if (key == 'role' && arr[item][key] != roleName)
            continue;
        else if (arr[item][key] == false)
            continue;
        newArr.push(arr[item]);
    }
    return newArr;
}

function addPlayer() {
    let profile = {
        name: profileName.value,
        level: profileLvl.value,
        scope: profileScope.value,
        role: 'Игрок',
        online: profileOnline.checked,
        days: 12,
        banStatus: {
            ban: false,
            time: 0,
            reason: ''
        },
        stikers: ['defult']
    }
    playerList.push(profile);
}

//Вывод в консоль
function displayArr(arr) {
    playerListWindow.innerHTML = '';
    let roleIcon = '';
    let moderClass = false;
    let onlineIcon = '';
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].role === 'Модератор') {
            roleIcon = '<img src="moder.svg" color = "white" alt="role"></img>';
            moderClass = true;
        }
        else {
            roleIcon = '<img src="user.svg" alt="role"></img>';
            moderClass = false
        }

        if (arr[i].online === true)
            onlineIcon = '<img src="online.png" width="20px" alt="role"></img>';
        else
            onlineIcon = '';

        let listItem = document.createElement('li');
        listItem.classList.add('list');
        if (moderClass === true)
            listItem.classList.add('moder');

        listItem.innerHTML = `
    <span class="index">${`${i + 1})`}</span>
    <span class="name">${arr[i].name}</span>
    <span class="role">${roleIcon}</span>
    <span class="level">LVL: ${arr[i].level}</span>
    <span class="scope">※ ${arr[i].scope}</span>
    <span class="online">${onlineIcon}</span>`
        playerListWindow.appendChild(listItem);
    }
}


// function displayArr(arr) {
//     for (let i = 0; i < arr.length; i++)
//         console.log(`${i + 1}) ${arr[i].name} | ${arr[i].role} | LVL: ${arr[i].level} | ※ ${arr[i].scope} | ${arr[i].online}`);
// }