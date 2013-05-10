var handler;
function start() {
    var display = document.getElementById("wrapper");
    while (display.firstChild) {
        display.removeChild(display.firstChild);
    }


    handler = setInterval("increasmentValue()", 100);
    createTrash("one");
    createTrash("two");
    createTrash("three");
    createTrash("four");
}
function stop() {
    clearInterval(handler);
}
function increasmentValue() {
    document.getElementById('timer').innerHTML =
        parseInt(document.getElementById('timer').innerHTML, 10) + 1;
}
function createTrash(trashNumber) {
    var numberOfTrashOfKind = 1;
    var container = document.getElementById("wrapper");
    for (var i = 0; i < numberOfTrashOfKind; i++) {
        var trash = document.createElement("img");
        trash.src = "../imgs/paper-" + trashNumber + ".jpg";
        setTheProperties(trash, i, trashNumber);
        container.appendChild(trash);
    }
}
function setTheProperties(trash, trashNumber, number) {
    trash.style.position = "absolute";
    trash.style.top = (Math.floor((Math.random() * 500) + 100)) + "px";
    trash.style.left = (Math.floor((Math.random() * 1000) + 100)) + "px";
    trash.width = "50";
    trash.draggable = "true";
    trash.ondragstart = function (ev) {
        if (!ev) {
            ev = event;
        }
        ev.dataTransfer.setData("dragged-id", ev.target.id);
    };
    trash.id = "trash" + trashNumber + number;
}



//ranklist

function createTheRankList(){
    var time = document.getElementById("timer").innerHTML | 0;
    var name = window.prompt("Ti izhvyrli vsichki boklici ,enter name", "Unnknown");
    
    localStorage.setItem(name, time);
    loadRandList();
}

function loadRandList() {
    var display = document.getElementById("scoreBoard");
    while (display.firstChild) {
        display.removeChild(display.firstChild);
    }
    var ranklist = document.createElement("div");
    var list = document.createElement("ul");
        fillTherankList(ranklist, list, display);
}

function fillTherankList(ranklist, list, display) {
    
    allPlayers = sortTheLocalStorage();

    for (var i = 0; i < 5; i++) {
        var listElement = document.createElement("li");
        listElement.innerHTML = allPlayers[i].key + ":" + allPlayers[i].value;
        list.appendChild(listElement);
    }
    ranklist.appendChild(list);
    display.appendChild(ranklist);
    var seconds = document.getElementById('timer');
    seconds.innerHTML = 0;
}

function sortTheLocalStorage() {
    var allPlayers = [];
    for (var i = 0; i < localStorage.length; i++) {
        var name = localStorage.key(i);

        var score = localStorage.getItem(name) | 0;
        allPlayers.push({ key: name, value: score });
    }
    allPlayers = allPlayers.sort(function (a, b) {
        return a.value - b.value;
    });
    return allPlayers;
}

//events
function drop(ev) {
    ev.preventDefault();
    var draggedTrash = ev.dataTransfer.getData("dragged-id");
    var element = document.getElementById(draggedTrash);
    var wrapper = document.getElementById("wrapper");
    wrapper.removeChild(element);
    if (wrapper.childNodes.length===0) {
        stop();
        createTheRankList();
    }
}
function allowDrop(ev) {
    ev.preventDefault();

}
function changeBin() {

    var closedBin = document.getElementById("closedBin");
    closedBin.src = "imgs/open-trash.jpg";

}

function changeToCloseBin(){
    var closedBin = document.getElementById("closedBin");
    closedBin.src = "imgs/closed-trash.jpg";

}

