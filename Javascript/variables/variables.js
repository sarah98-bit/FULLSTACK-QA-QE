let age = 25;

console.log(age);
const schoolName = "greenwood high";
console.log(schoolName);
let studentList = [];
console.log(studentList);
// let variables can be updated but not redefined
//const variables cannot be updated nor redefined
//var declares variables with function or global scope
let $price = 100;
// let 1stPlace = "John";// the naming is wrong since it does not follow the naming rules.
let _score = 89;
let userName = "Alice";
// const #taxRate = 0.16;// avariable name should start with a letter, underscore or dollar sign
const taxtRate =0.16;
let MyVariableName = "JavaScript";
console.log(MyVariableName);
console.log(typeof "Hello");//string
console.log(typeof 99);//number
console.log(typeof true);//boolean
console.log(typeof undefined);//undefined
let data = ["Kenya", 34, false, { country: "USA" }, null];

console.log(data);
//"Kenya" is an integer

//34 is a number

//false is a boolean
// {country:"USA"} is an object
//null is a Null
// Bigint  variables are used to store big integer values that are too big to be represented by a normal JavaScript Number. usually greate than 2 power 53
//example
let myWorth = 12000000000000n
console.log (myWorth)
let Person = {}
Person.name ="Sarah";
Person.age = 20;
Person.city ="Nairobi"
Person.email ="thuosarah81@gmail.com"
console.log(Person)
let fruits = [
    "apples",
   "mangoes",
   "bananas"
] 




console.log(fruits)//[ 'apples', 'mangoes', 'bananas' ]
let fruit = fruits[1]
console.log(fruit)//mangoes
console.log("5" + 2);//52 string
console.log("5" - 2);//3 number
let num1 = "100";
console.log(parseInt(num1));
let num2= 50;
let txt1 = num2.toString()
console.log(txt1)
console.log(5 + true);//output is 6