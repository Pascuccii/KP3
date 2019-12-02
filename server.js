var DATA;

function getFile(fileName) {
    var request = new XMLHttpRequest();
    request.open('GET', fileName);
    request.onloadend = function () {
        parse(request.responseText);
    };
    request.send();
}

function parse(obj) {

    DATA = JSON.parse(obj);
}

getFile('auth.json'); //путь к файлу

function auth(login, pass) {
    login = $("#login").val();
    pass = $("#pass").val();
    console.log("name: " + DATA['name']);
    console.log("pass: " + DATA['pass']);
    console.log("logi: " + login);
    console.log("psss: " + pass);

    if (login === DATA['name'] && pass === DATA['pass'])
        document.location.href = "history.html";
}

var $tasksList;
var $taskInput;
var $notification;

$(document).ready(function () {
    $tasksList = $("#tasksList");
    $taskInput = $("#taskInput");
    $notification = $("#notification");
});

const displayNotification = function () {
    if (!$tasksList.children().length) {
        $notification.fadeIn("fast");
    } else {
        $notification.css("display", "none");
    }
};

var inAction = false;

function startAnimation() {
    if (inAction === false) {
        $("#movingObject").addClass("startMoving");
        inAction = true;
    } else {
        $("#movingObject").removeClass("startMoving");
        inAction = false;
    }
}

function addItem() {
    if (!$taskInput.val()) {
        return false;
    }
    $tasksList.append("<li><button class='deleteButton' onclick='deleteItem(this)'>&#10006</button>" + $taskInput.val() + "</li>");
    $taskInput.val("");

    displayNotification();
}

function deleteItem(element) {
    const $parent = $(element).parent();

    setTimeout(function () {
        $parent.remove();
        displayNotification();
    }, 5);
}

function toJSON() {
    var allDealers = [];
    var obj = {title: "none", address: "none", locale: "none", phone: "none"};
    var items = $("#dealersList").find("ul");
    console.log(items);

    for (let i = 0; i < 6; i++) {
        var siblings = items.eq(i).children();
        var obj1 = Object.create(obj);
        obj1.title = siblings.eq(0).text();
        obj1.address = siblings.eq(1).text();
        obj1.locale = siblings.eq(2).text();
        obj1.phone = siblings.eq(3).text();
        allDealers.push(obj1);
    }
    ;
    alert(JSON.stringify(allDealers));
};

function toJSONObject() {
    var person = {
        name: "none",
        surname: "none",
        patronymic: "none",
        email: "none",
        age: 0,
        phone: "none",
        group: 0,
        id: 0
    };
    var items = $("#JSONObject").find("ul");
    console.log(items);
    var siblings = items.children();
    var obj1 = Object.create(person);
    obj1.name = siblings.eq(0).text();
    obj1.surname = siblings.eq(1).text();
    obj1.patronymic = siblings.eq(2).text();
    obj1.email = siblings.eq(3).text();
    obj1.age = siblings.eq(4).text();
    obj1.phone = siblings.eq(5).text();
    obj1.group = siblings.eq(6).text();
    obj1.id = siblings.eq(7).text();
    alert(JSON.stringify(obj1));
};

function showUpHiddens() {
    var hiddens = $("li:hidden");
    hiddens.removeClass("displayNone");
}

function Tooltip() {  // Конструктор для всплывающей подсказки
    this.tooltip = document.createElement("div"); // Создание div для тени
    this.tooltip.style.position = "absolute";     // Абсолютное позиционирование.
    this.tooltip.style.visibility = "hidden";
    this.tooltip.className = "tooltip";
    this.tooltip.style.fontSize = 30 + "px";
    this.tooltip.style.color = "#0edf00";
}

// Установка содержимого для подсказки и отображение
Tooltip.prototype.show = function (text, x, y) {
    this.tooltip.innerHTML = text;             // Текст подсказки
    this.tooltip.style.left = x + "px";        // Координаты
    this.tooltip.style.top = y + "px";
    this.tooltip.style.visibility = "visible";

    // Добавление подсказки в документ если он еще не присутствует.
    if (this.tooltip.parentNode !== document.body)
        document.body.appendChild(this.tooltip);
};

// Функция для скрытия подсказки
Tooltip.prototype.hide = function () {
    this.tooltip.style.visibility = "hidden";
};

window.onload = function () {
    var d = document.getElementById("blueRect");
    d.onmousemove = mouseMoveHandler;
    d.onmouseout = mouseOutHandler;
}

var t = new Tooltip();

function mouseMoveHandler(e) {
    if (!e) e = window.event;
    t.show("Всплывающая подсказка", e.clientX + 10, e.clientY + 10);
}

function mouseOutHandler() {
    t.hide();
}