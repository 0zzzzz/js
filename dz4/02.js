class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
    // someFunction(){
    // }
}

let joogle = new Product('joogle', 1000)
let macrosoft = new Product('macrosoft', 2000)
let napple = new Product('napple', 3000)
let javazon = new Product('javazon', 4000)


let basket = [joogle, macrosoft, napple, javazon]


function countBasketPrice(arr) {
    let basketInitial = 0;
    let basketSum = arr.reduce(function (accumulator, elem) {
        return accumulator + elem.price;
    }, basketInitial);
    return basketSum;
}

console.log(countBasketPrice(basket));
