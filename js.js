const colors = ["#c40b0b",
    "#f14282",
    "#ff9f4c",
    "#b1b935",
    "#2e9d1a",
    "#1ca6bd",
    "#780598"];

var divisors = [];

function getDivisorsOfANumber(n){
    divisors = [];
    for(var i=1; i<=n; i++){
        if(n%i == 0){
            divisors.push(n/i);
            console.log(n/i);
        }
    }
    console.log("The divisor array: "+divisors);
    return divisors;
}

function generateRandomNumber(min, max) {
    return Math.floor(Math.random()*(max-min))+min;
}

function getHtmlName(){
    var path = window.location.pathname;
    var page = path.split("/").pop();
    return page;
}

function generateEquation(){
    var number1;
    var number2;

    if(getHtmlName()=="sobiranje.html"){
        number1 = generateRandomNumber(0,10);
        number2 = generateRandomNumber(0,10);
        return number1+"+"+number2;
    }
    else if(getHtmlName()=="odzemanje.html"){
        number1 = generateRandomNumber(0,20);
        number2 = generateRandomNumber(0,20);
        if(number1 < number2){
            var temp = number1;
            number1=number2;
            number2=temp;
        }
        return number1+"-"+number2;
    }
    else if(getHtmlName()=="mnozhenje.html"){
        number1 = generateRandomNumber(0,10);
        number2 = generateRandomNumber(0,10);
        return number1+"*"+number2;
    }
    else if(getHtmlName()=="delenje.html"){
        number1 = generateRandomNumber(1, 50);
        if(number1 != 1){
            getDivisorsOfANumber(number1);
            var index = generateRandomNumber(0, getDivisorsOfANumber(number1).length);
            console.log("index of a divisor: " + index);
            number2 = divisors[index];
            console.log("the divisor: "+number2);
        }
        else{
            number2 = 1;
        }
        return number1+"/"+number2;
    }
}

function getNextEquation(result){
    return parseInt(eval(result));
}

function generateRandomAnswers(next){
    var index=0;
    var answer1=document.getElementById("answer1").innerHTML=generateRandomNumber(0,10); //ponuden1
    var answer2=document.getElementById("answer2").innerHTML=generateRandomNumber(0,10); //ponuden2
    var answer3=document.getElementById("answer3").innerHTML=generateRandomNumber(10,20); //ponuden3

    var array=[];
    array.push(answer1);
    array.push(answer2);
    array.push(answer3);

    if(array.includes(next)){
        return;
    }
    else{
        var random=array[Math.floor(Math.random()*array.length)]; //choosing random answer to replace it with the missing right answer

        for(var i=0; i<array.length; i++){
            if(array[i]==random){
                index=i;
                break;
            }
        }

        array.splice(index, 1, next);

        for(var i=0; i<array.length; i++){
            for(var j=0; j<i; j++){
                if(array[i] == array[j]){
                    array[i]=generateRandomNumber(0,10); //if there are duplicates, replace one with another random answer
                }
            }
        }

        document.getElementById("answer1").innerHTML=array[0];
        document.getElementById("answer2").innerHTML=array[1];
        document.getElementById("answer3").innerHTML=array[2];
    }
}

$(document).ready(function(){
    $("#answer1, #answer2, #answer3").click(function(){
        var answer1 = document.getElementById("answer1").innerHTML;
        var answer2 = document.getElementById("answer2").innerHTML;
        var answer3 = document.getElementById("answer3").innerHTML;

        if(this.id == "answer1"){
            if(answer1 == evaluateProblem()){
                var eq = document.getElementById("mathProblem");
                var result = generateEquation(); //ex: "6+2=", next math problem
                eq.innerHTML = result;

                var next = getNextEquation(result); //next right answer
                generateRandomAnswers(next);

                plusPoints();

                if(document.getElementById("points").innerHTML == 50){
                    nextLevel();
                }

                var colorIndex = generateRandomNumber(0, colors.length);
                var selectedColor = colors[colorIndex];
                document.getElementById("mathProblem").style.color = selectedColor;
            }
            else{
            }
        }
        if(this.id == "answer2"){
            if(answer2 == evaluateProblem()){
                var eq = document.getElementById("mathProblem");
                var result = generateEquation();
                eq.innerHTML = result;

                var next = getNextEquation(result);
                generateRandomAnswers(next);

                plusPoints();

                if(document.getElementById("points").innerHTML == 50){
                    nextLevel();
                }

                var colorIndex = generateRandomNumber(0, colors.length);
                var selectedColor = colors[colorIndex];
                document.getElementById("mathProblem").style.color = selectedColor;
            }
            else{
            }
        }
        if(this.id == "answer3"){
            if(answer3 == evaluateProblem()){
                var eq = document.getElementById("mathProblem");
                var result = generateEquation();
                eq.innerHTML = result;

                var next = getNextEquation(result);
                generateRandomAnswers(next);

                plusPoints();

                if(document.getElementById("points").innerHTML == 50){
                    nextLevel();
                }

                var colorIndex = generateRandomNumber(0, colors.length);
                var selectedColor = colors[colorIndex];
                console.log("color: "+selectedColor);
                document.getElementById("mathProblem").style.color = selectedColor;
            }
            else{
            }
        }
    });
});

function evaluateProblem(){
    var problem = document.getElementById("mathProblem").innerHTML;
    return eval(problem);
}

function plusPoints(){
    points = document.getElementById("points").innerHTML;
    points = parseInt(points);
    points+=2;
    document.getElementById("points").innerHTML = points;
}

function nextLevel(){
    if(getHtmlName() == 'sobiranje.html'){
        window.location.href = 'odzemanje.html';
    }
    else if(getHtmlName() == 'odzemanje.html'){
        window.location.href ='mnozhenje.html';
    }
    else if(getHtmlName() == 'mnozhenje.html'){
        window.location.href ='delenje.html';
    }
    else if(getHtmlName() == 'delenje.html'){
        window.location.href ='kraj.html';
    }
}