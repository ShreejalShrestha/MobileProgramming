function Text1(btn) {
    document.getElementById("text1").innerHTML = "Courage is the key to every victory.";
}

function Text2(btn) {
    const text2 = document.getElementById("text2");
    text2.style.display = "block";
    text2.innerHTML = "Explore the unknown with a fearless heart.";
}

function Image(btn) {
    document.getElementById("myImage").src = "images/2.jpg";
}

function Background(btn) {
    const box = document.getElementById("bgBox");
    box.style.backgroundColor = "blue";
    box.style.color = "white";
}


function toggleContent(btn) {
    const box = document.getElementById("contentBox");
    if (box.textContent === "Strong") {
        box.textContent = "Legends are not born, they are forged in challenges.";
        btn.textContent = "Reset Text";
    } else {
        box.textContent = "Strong";
        btn.textContent = "Toggle Text";
    }
}

function Calculate(btn) {
    let x = 10;
    let y = 15;
    let z = x + y;
    document.getElementById("Uttam").innerHTML = "The sum is: " + z;
}

function Calculate1(btn) {
    let a = 20;
    let b = 15;
    let c = a - b;
    document.getElementById("Susman").innerHTML = "The Difference is:" + c ;
}

function Calculate2(btn) {
    let x = 10;
    let y = 15;
    let z = x * y;
    document.getElementById("Udhav").innerHTML = "The Multiplication is: " + z;
}

function Calculate3(btn) {
    let x = 15;
    let y = 5;
    let z = x / y;
    document.getElementById("Amit").innerHTML = "The Division is: " + z;
}

function checkAge() {
    let age = 18;
    let message;

    if (age < 18) {
        message = "You are a minor.";
    } else if (age === 18) {
        message = "You just became an adult!";
    } else {
        message = "You are an adult.";
    }

    document.getElementById("Bibek").innerHTML = message;
}
