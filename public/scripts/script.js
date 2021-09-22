var recharge =  prompt("Enter the amount to be deposited");

var amount = parseInt(recharge);

document.querySelector(".amount").innerHTML = "" + amount + "";

var bet = 0;
var condition = 0;
var clicked = false;
var okay = false;

$(".okay").on("click", function() {
    bet = document.getElementById("bet").value;
    bet = parseInt(bet);
    console.log("Your bet is " + bet);
    okay = true;
});

$(".down").on("click", function() {
    document.querySelector(".down").classList.add("pressed");
    document.querySelector(".up").classList.remove("pressed");
    document.querySelector(".only").classList.remove("pressed");
    condition = -1;
    clicked = true;
});

$(".only").on("click", function() {
    document.querySelector(".only").classList.add("pressed");
    document.querySelector(".up").classList.remove("pressed");
    document.querySelector(".down").classList.remove("pressed");
    condition =0;
    clicked = true;
});

$(".up").on("click", function() {
    document.querySelector(".up").classList.add("pressed");
    document.querySelector(".down").classList.remove("pressed");
    document.querySelector(".only").classList.remove("pressed");
    condition = 1;
    clicked = true;
});


function diceThrow(bet, condition, clicked, okay) {

    if ((clicked && okay) && (bet != NaN) && ((amount-bet > 0) || (amount-bet == 0) )) {

        document.querySelector(".roll-button").classList.add("pressed");

        setTimeout(function() {
            document.querySelector(".roll-button").classList.remove("pressed");
        }, 200);

        var firstRandomNo = Math.floor(Math.random()*6) +1;
        var firstImgUrl = "images/dice" + firstRandomNo + ".png";

        var secondRandomNo = Math.floor(Math.random()*6) +1;
        var secondImgUrl = "images/dice" + secondRandomNo + ".png";

        document.querySelector(".dice-1").setAttribute("src", firstImgUrl);
        document.querySelector(".dice-2").setAttribute("src", secondImgUrl);

        document.querySelector(".coin-2").classList.add("visible");
        okay = false;

        if (firstRandomNo + secondRandomNo >7) {
            document.querySelector(".result").innerHTML = "It's 7 Up !";
            document.querySelector(".result").classList.add("red");
            document.querySelector(".result").classList.remove("orrange");
            document.querySelector(".result").classList.remove("blue");

        }else if (firstRandomNo + secondRandomNo <7) {
            document.querySelector(".result").innerHTML = "It's 7 Down !";
            document.querySelector(".result").classList.add("blue");
            document.querySelector(".result").classList.remove("red");
            document.querySelector(".result").classList.remove("orrange");
        }else {
            document.querySelector(".result").innerHTML = "It's 7 !";
            document.querySelector(".result").classList.add("orrange");
            document.querySelector(".result").classList.remove("red");
            document.querySelector(".result").classList.remove("blue");
            
        }

        if ((condition == -1 && firstRandomNo + secondRandomNo <7) || (condition == 1 && firstRandomNo + secondRandomNo >7)) {
            amount = amount + bet;
            document.querySelector(".wins").innerHTML = bet + " Won !";
            document.querySelector(".wins").classList.remove("red");

        }else if (condition ==0 && firstRandomNo + secondRandomNo ==7){
            amount = amount + (bet*2);
            document.querySelector(".wins").innerHTML = (bet*2) + " Won !";
            document.querySelector(".wins").classList.remove("red");  
        }else {
            amount = amount- bet;
            document.querySelector(".wins").innerHTML = bet + " Lost !";
            document.querySelector(".wins").classList.add("red");
        }
    }else {
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        document.querySelector("body").classList.add("bgRed");
        setTimeout(function() {
            document.querySelector("body").classList.remove("bgRed");
        },200);
    }
    var profit =amount- recharge;
    document.querySelector(".amount").innerHTML = "" + amount;
    document.querySelector(".profits").innerHTML = "" + profit;
    
    if (profit <0) {
        document.querySelector(".profits").classList.add("red");
    }else{
        document.querySelector(".profits").classList.remove("red");
    }
}

$(".roll-button").on("click", function() {
    diceThrow(bet, condition, clicked, okay);
});
