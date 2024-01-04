function addDiv() {
    var newDiv = document.createElement("div");
        newDiv.className = "myDivs";
        const currentDiv = divs.length;
        document.body.insertBefore(newDiv, currentDiv);
    }

function removeDiv() {
    var divs = document.getElementsByClassName("myDivs");
    if (divs.length > 0) {
            divs[0].remove();
    }
}

function changeColor() {
    var divs = document.querySelectorAll(".myDivs");
    if (divs.length >= 3) {
        divs[2].style.backgroundColor = "red";
    }
}

function changeText() {
    var divs = document.getElementsByClassName("myDivs");
    for (var i = 0; i < divs.length; i++) {
        divs[i].innerText = "Nowy Tekst";
    }
}

function calculate() {
    var num1 = parseFloat(document.getElementById("num1").value);
    var num2 = parseFloat(document.getElementById("num2").value);
    var operation = document.getElementById("operation").value;
    var resultElement = document.getElementById("result");

    if (isNaN(num1) || isNaN(num2)) {
        resultElement.innerHTML = '<p class="error">Podaj poprawne liczby!</p>';
    } else {
        switch (operation) {
            case "add":
                resultElement.innerHTML = "Wynik: " + (num1 + num2);
                break;
            case "subtract":
                resultElement.innerHTML = "Wynik: " + (num1 - num2);
                break;
            case "multiply":
                resultElement.innerHTML = "Wynik: " + (num1 * num2);
                break;
            case "divide":
                if (num2 !== 0) {
                    resultElement.innerHTML = "Wynik: " + (num1 / num2);
                } else {
                    resultElement.innerHTML = '<p class="error">Nie mozna dzielic przez zero!</p>';
                }
                break;
            default:
                resultElement.innerHTML = '<p class="error">Nieprawidlowe dzialanie!</p>';
        }
    }
}