let basket = []

class Product {
    constructor(name, price, prodQuantity) {
        this.name = name;
        this.price = price;
        this.prodQuantity = prodQuantity; // количество товара всего
        this.inBasketQuan = 0; // количество товара в корзине
    }

    toBasket(products){ // добавляет товар в корзину
        if (products <= this.prodQuantity) {
            this.prodQuantity -=products;
            if (this.inBasketQuan == 0){
                this.inBasketQuan += products;
                basket.push(this);
            } else {
                this.inBasketQuan += products;
            }
        } else {
            console.log('недостаточно продуктов');
            return 'недостаточно продуктов';
        }
    }

    fromBasket(prodcts){ //убирает товар из корзины
        if (prodcts <= this.inBasketQuan) {
            this.inBasketQuan -= prodcts;
            this.prodQuantity += prodcts;
            if (this.inBasketQuan == 0){
                basket.pop(this);
            }
        } else {
            console.log('в корзине нет столько товаров');
            return 'в корзине нет столько товаров';
        }
    }
}

let joogle = new Product('joogle', 1000, 30);
let macrosoft = new Product('macrosoft', 2000, 40);
let napple = new Product('napple', 3000, 50);
let javazon = new Product('javazon', 4000, 60);

function countBasketPrice(arr) { // считает стоимость корзины
    let basketInitial = 0;
    let prodNumber = arr.reduce(function (accumulator, elem) {
        return accumulator + elem.price * elem.inBasketQuan;
    }, basketInitial);
    return prodNumber;
}

function countBasketQuantity(arr) { // считает количество товаров в корзине
    let basketInitial = 0;
    let basketQuan = arr.reduce(function (accumulator, elem) {
        return accumulator + elem.inBasketQuan;
    }, basketInitial);
    return basketQuan;
}

function htmlRender(arr){
    let newBlock = document.createElement('DIV');
    if (arr.length == 0) {
        newBlock.textContent = 'Корзина пуста';
    } else {
        newBlock.textContent = 'В корзине ' + countBasketQuantity(arr) + ' товаров на сумму ' + countBasketPrice(arr) + ' рублей' ;
    }
    let indexBlock = document.querySelector('.basket'); // привязывается к элементу с классом чесс
    indexBlock.appendChild(newBlock); // добавляет блок созданный данной функцией

}


napple.toBasket(4);
javazon.toBasket(4);
napple.fromBasket(3);
macrosoft.toBasket(20);
htmlRender(basket);
