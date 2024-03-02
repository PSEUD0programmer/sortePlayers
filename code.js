let playerList = [
    {
        name: 'Шишкин Петя',
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
        name: 'Кубоев Рома',
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
        name: 'Булкин Леша',
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
        name: 'Иванов Иван',
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

let roleName = 'Игрок';
let sortTrigger = false;
getSorteArray(playerList, 'name');

//сортировка
function getSorteArray(arr, key) {
    switch (key) {
        case 'level': case 'scope': case 'days':
            console.log(`\nОтсортированно по тегу: <${key}>\n`);
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

//Вывод в консоль
function displayArr(arr) {
    for (let i = 0; i < arr.length; i++)
        console.log(`${i + 1}) ${arr[i].name} | ${arr[i].role} | LVL: ${arr[i].level} | ※ ${arr[i].scope} | ${arr[i].online}`);
}