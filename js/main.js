

var screen = document.querySelector("#screen")
var clear = document.querySelector("#clear")
var clock = document.querySelector("#clock")

var bracketLeft = document.getElementById("bracket-left");
var bracketRight = document.getElementById("bracket-right");

var divide = document.querySelector("#divide")
var multiply = document.querySelector("#multiply")
var minus = document.querySelector("#minus")
var plus = document.querySelector("#plus")
var equal = document.querySelector("#equal")

var dot = document.querySelector("#dot")

var nine = document.querySelector("#nine")
var eight = document.querySelector("#eight")
var seven = document.querySelector("#seven")
var six = document.querySelector("#six")
var five = document.querySelector("#five")
var four = document.querySelector("#four")
var three = document.querySelector("#three")
var two = document.querySelector("#two")
var one = document.querySelector("#one")
var zero = document.querySelector("#zero")

var calculationHistory = document.getElementById('history')

var showcase = document.querySelector('.showcase')
var toggle = document.querySelector(".toggle")

var display = "";
var historyText = "";
var result;
// var historyArr = localStorage.getItem("historyArr") === null ? [] : localStorage.getItem("historyArr");
var historyArr  = [];


function isOpertator(str){
    if (str === "+" || str === "-" || str === "*" || str === "÷" || str === "/"){
        return true;
    } else {
        return false;
    }
}

function isNumber(str){
    if(str===" "){
        return false;
    } else if (isNaN(str)===true){
        return false;
    } else {
        return true;
    }
}

function convertStringFromList(array){

    // use line breaker <br> to seperate each elements in the list and return the whole string
    historyText = "";
    array.forEach(function(item){
        historyText += item + '<br>';
    });

    // return historyText;

}

function input(newString){

    // if received 2 consecutive operation marks, terminate the invalid operation
    if(display.slice(-1) === " " && isOpertator(newString)) {
        display = "";
        screen.innerHTML = 0;
        return;
    }

    // if last operation was completed and next input is operation mark, take the result from last step and continue
    if( display.slice(-1)==="=" && isOpertator(newString)){
        display = display.slice(0,-1);
        // display = "(" + display + ")";
        display = result;
    } else if(display.slice(-1)==="="){ //if ;ast operation was completed and received a number, start fresh
            display = "";
            screen.innerHTML = 0;
    }

    // console.log(isNumber(display.slice(-1)));

    // have spaces before and after operators
    // add a zero prior to decimal point to make display looks better
    if(isOpertator(newString)) {
        display += " " + newString + " ";
    } else if (newString === "." && (!isNumber(display.slice(-1)) || display === "" )) {
        display += "0" + newString;
    } else {
        display += newString;
    }
    
    // render formula in the text box
    screen.innerHTML = display;
}

function calculate(){

    // replace with a proper divide
    let reformatted = display.replace("÷","/");

    // use eval to calculate, and return error message to screen
    try{
        result = eval(reformatted);
        screen.innerHTML = result;
        
    } catch(error) {
        // screen.innerHTML = error.message;
        screen.innerHTML = "Please type in valid formula.";
        result = "error";
    }

    // add a equal mark here to suggest formula has ended
    display += " =";

    // set a limit of 30 when displaying the calculation history, by keepng strings in a list

    historyArr.push(display + " " + result);

    if (historyArr.length === 31){
        historyArr.shift();
    }

    convertStringFromList(historyArr);

    calculationHistory.innerHTML = historyText;

    // test this
    // display = result;

}

function showSideBar(){
    showcase.classList.toggle('active');
    toggle.classList.toggle('active');
}

function keyEvent(event){

    if (event.code == "NumpadEnter" || event.code == "Enter") {
        calculate();
        return;
    } else if (event.code == "Digit1" || event.code == "Numpad1"){
        input("1");
    } else if (event.code == "Digit2" || event.code == "Numpad2"){
        input("2");
    } else if (event.code == "Digit3" || event.code == "Numpad3"){
        input("3");
    } else if (event.code == "Digit4" || event.code == "Numpad4"){
        input("4");
    } else if (event.code == "Digit5" || event.code == "Numpad5"){
        input("5");
    } else if (event.code == "Digit6" || event.code == "Numpad6"){
        input("6");
    } else if (event.code == "Digit7" || event.code == "Numpad7"){
        input("7");
    } else if (event.code == "Digit8" || event.code == "Numpad8"){
        input("8");
    } else if (event.code == "Digit9" || event.code == "Numpad9"){
        input("9");
    } else if (event.code == "Digit0" || event.code == "Numpad0"){
        input("0");
    } else if (event.code == "NumpadAdd") {
        input("+");
    } else if (event.code == "NumpadSubtract") {
        input("-");
    } else if (event.code == "NumpadMultiply") {
        input("*");
    } else if (event.code == "NumpadDivide") {
        input("÷");
    } else if (event.code == "Backspace") {
        if (display.slice(-1) === "="){
            display = result;
        }
        display = display.toString().slice(0, -1);
    } else if (event.code == "Delete") {
        if (display.slice(-1) === "="){
            display = result;
        }
        display = display.toString().substring(1);
    }
    if (display.length ===0){
        screen.innerHTML = 0;
    } else {
        screen.innerHTML = display;
    }
    
    


    // if (key === 'Enter') {
    //     calculate();
    // } else if(isOpertator(key) || isNumber(key) || key==="(" || key===")") {
    //     input(key);
    // }

}


// document.getElementsByClassName("block").style.boxShadow = "10px 20px 30px lightblue";



clock.addEventListener('click',showSideBar);
clear.addEventListener('click',()=>{screen.innerHTML = 0 ; display='';});

toggle.addEventListener('click',showSideBar);

bracketLeft.addEventListener('click',input.bind(this,'('));

bracketRight.addEventListener('click',input.bind(this,')'));

equal.addEventListener('click',calculate);
dot.addEventListener('click',input.bind(this,'.'));

divide.addEventListener('click',input.bind(this,"÷"));
multiply.addEventListener('click',input.bind(this,"*"));
plus.addEventListener('click',input.bind(this,"+"));
minus.addEventListener('click',input.bind(this,"-"));

zero.addEventListener('click',input.bind(this,"0"));
one.addEventListener('click',input.bind(this,"1"));
two.addEventListener('click',input.bind(this,"2"));
three.addEventListener('click',input.bind(this,"3"));
four.addEventListener('click',input.bind(this,"4"));
five.addEventListener('click',input.bind(this,"5"));
six.addEventListener('click',input.bind(this,"6"));
seven.addEventListener('click',input.bind(this,"7"));
eight.addEventListener('click',input.bind(this,"8"));
nine.addEventListener('click',input.bind(this,"9"));



document.addEventListener('keydown',()=>{keyEvent(event)});
