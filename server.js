var send = function (params, func) {
    var ajax = new XMLHttpRequest();
    ajax.open('GET', `server.php?${params}`, true);
    ajax.onreadystatechange = function () {
        if (ajax.readyState === 4) {
            if (ajax.status === 200) {
                func(ajax.responseText);
            }
        }
    };
    ajax.send(null);
};

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

/*
function toJSON() {
    var list = [];
    $('#list').each(function(idx, item){
        list.push({
            text: item.content
        });
    });
    alert(JSON.stringify(list, null, "  "));

    /!*var element = document.getElementById('');
    var html = element.innerHTML;
    var data = { html: html };
    var json = JSON.stringify(data);
    //alert(json);*!/
}
*/

function toJSON() {
    var allDealers = [];
    var obj = {title: "none", address: "none", locale: "none", phone: "none"};
    var items = $("#dealersList").find("ul");
    console.log(items);

    for (let i = 0; i < 6; i++) {
        var siblings = items.eq(i).children();
        obj.title = siblings.eq(0).text();
        obj.address = siblings.eq(1).text();
        obj.locale = siblings.eq(2).text();
        obj.phone = siblings.eq(3).text();
        allDealers.push(obj.stringify());
    }
    ;

    console.log(allDealers);
};