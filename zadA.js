var previous;
var news = [];
var index = 0;

function fetchData() {
    $.ajax({
        url: "http://szuflandia.pjwstk.edu.pl/~ppisarski/zad8/dane.php",
        type: "GET",
        dataType: "json",
        success: function (data) {
            if (JSON.stringify(previous) !== JSON.stringify(data)) {
                previous = data;
                updateDataTable(data);
                updateNews(data.news);
            }
        }
    });
}

function updateDataTable(data) {
    var table = document.getElementById("data-table");
    var newData = data.stock;

    for (var firma in newData) {
        var existingRow = table.querySelector('tr[data-firma="' + firma + '"]');

        if (existingRow) {
            var existingValue = parseFloat(existingRow.querySelector('td:nth-child(2)').innerHTML);
            var newValue = parseFloat(newData[firma]);

            if (existingValue !== newValue) {
                existingRow.querySelector('td:nth-child(2)').innerHTML = newValue;
            }
        } else {
            var row = document.createElement("tr");
            row.setAttribute("data-firma", firma);
            table.appendChild(row);

            var name = document.createElement("td");
            row.appendChild(name);

            var valuetable = document.createElement("td");
            row.appendChild(valuetable);

            name.innerHTML = firma;
            var value = newData[firma];
            valuetable.innerHTML = value;
        }
    }
}

function updateNews(newNews) {
    if (news.length >= 3) {
        news.shift();
    }
    news.push(newNews);
    index = news.length - 1;
    newsUpdate();
}

function newsUpdate() {
    var rotator = document.getElementById("news-rotator");
    rotator.innerHTML = "";

    var newsDiv = document.createElement("div");
    newsDiv.innerHTML = news[index];
    newsDiv.classList.add("item");
    rotator.appendChild(newsDiv);
}

function prev() {
    index = (index - 1 + news.length) % news.length;
    newsUpdate();
}

function next() {
    index = (index + 1) % news.length;
    newsUpdate();
}

document.addEventListener('DOMContentLoaded', function () {
    fetchData();
    setInterval(fetchData, 10000);
});