let joogle = {
    name: 'joogle',
    price: 1000
}

let macrosoft = {
    name: 'macrosoft',
    price: 2000
}

let napple = {
    name: 'napple',
    price: 3000
}

let javazon = {
    name: 'javazon',
    price: 4000
}

let basket = [joogle, macrosoft, napple, javazon]


function countBasketPrice(arr) {
    let basketInitial = 0;
    let basketSum = arr.reduce(function (accumulator, elem) {
        return accumulator + elem.price;
    }, basketInitial);
    return basketSum;
}

console.log(countBasketPrice(basket));
