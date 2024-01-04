$(document).ready(function () {
    const dataTable = $('#data-table');
    const newsRotator = $('#news-rotator');
    let lastStockData = null;

    function fetchData() {
        $.ajax({
            url: 'http://szuflandia.pjwstk.edu.pl/~ppisarski/zad8/dane.php',
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                updateTable(data);
            },
            error: function (xhr, status, error) {
                console.error('Błąd pobierania danych:', status, error);
            }
        });
    }

    function updateTable(data) {
        if (JSON.stringify(data.stock) !== JSON.stringify(lastStockData)) {
            lastStockData = data.stock;
            updateStockTable(data.stock);
        }

        updateNewsRotator(data.news);
    }

    function updateStockTable(stockData) {
        dataTable.empty();
        const headerRow = '<tr><th>Firma</th><th>Wartość Akcji</th></tr>';
        dataTable.append(headerRow);

        for (const [company, value] of Object.entries(stockData)) {
            const row = `<tr><td>${company}</td><td>${value}</td></tr>`;
            dataTable.append(row);
        }
    }

    function updateNewsRotator(news) {
        newsRotator.empty();

        const newsItem = `<div>${news}</div>`;
        newsRotator.append(newsItem);

        newsRotator.show();
    }

    setInterval(fetchData, 3000);

    fetchData();
});