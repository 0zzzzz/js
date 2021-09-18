let basket = []

class Product {
    constructor(name, price, prodQuantity) {
        this.name = name;
        this.price = price;
        this.prodQuantity = prodQuantity; // количество товара всего
        this.inBasketQuan = 0; // количество товара в корзине
    }

    printProductOfCatalog(){
        return 'название: ' + this.name + ' цена: ' + this.price
    }

    printBasket(){
        return 'название: ' + this.name + ' цена: ' + this.price +  ' в корзине: ' + this.inBasketQuan +  ' осталось на складе: ' + this.prodQuantity;
    }


    toBasket(prodcts){ // добавляет товар в корзину
        if (prodcts <= this.prodQuantity) {
            this.prodQuantity -= prodcts;
            if (this.inBasketQuan == 0){
                this.inBasketQuan += prodcts;
                basket.push(this);
            } else {
                this.inBasketQuan += prodcts;
            }
        } else {
            console.log('недостаточно продуктов');
            alert('недостаточно продуктов');
        }
    }

    fromBasket(prodcts){ //убирает товар из корзины
        if (prodcts <= this.inBasketQuan) {
            this.inBasketQuan -= prodcts;
            this.prodQuantity += prodcts;
            if (this.inBasketQuan == 0){
                let value = this
                basket = basket.filter(item => item !== value)
            }
        } else {
            console.log('в корзине нет столько товаров');
            return 'в корзине нет столько товаров';
        }
    }
}


function countBasketPrice(arr) { // считает стоимость корзины
    let basketInitial = 0;
    let prodNumber = arr.reduce(function (accumulator, elem) {
        return accumulator + elem.price * elem.inBasketQuan;
    }, basketInitial);
    let indexBlock = document.querySelector('.basket');
    let catalogBlock = document.createElement('DIV');
    catalogBlock.textContent = 'Стоимость корзины: ' + prodNumber;
    indexBlock.appendChild(catalogBlock);
}

function countBasketQuantity(arr) { // считает количество товаров в корзине
    let basketInitial = 0;
    let basketQuan = arr.reduce(function (accumulator, elem) {
        return accumulator + elem.inBasketQuan;
    }, basketInitial);
    let indexBlock = document.querySelector('.basket');
    let catalogBlock = document.createElement('DIV');
    catalogBlock.textContent = 'Товаров в корзине: ' + basketQuan;
    indexBlock.appendChild(catalogBlock);
}

function createProductBlock(catalog){
    let indexBlock = document.querySelector('.product');
    for (let i in catalog) {
        let catalogBlock = document.createElement('DIV');
        catalogBlock.classList.add('product_inner_block');
        catalogBlock.textContent = catalog[i].printProductOfCatalog();
        let button = document.createElement('BUTTON');
        button.textContent = 'Добавить в корзину'; 
        catalogBlock.appendChild(button);
        button.onclick = function(){
            let div = document.querySelector('.basket');
            while(div.firstChild){
                div.removeChild(div.firstChild);
            }
            catalog[i].toBasket(1);
            createBasketBlock(basket);
            countBasketQuantity(basket)
            countBasketPrice(basket)
        }
        indexBlock.appendChild(catalogBlock);
    }
}

function createBasketBlock(catalog){
    let indexBlock = document.querySelector('.basket');
    for (let i in catalog) {
        let catalogBlock = document.createElement('DIV');
        catalogBlock.classList.add('basket_inner_block');
        catalogBlock.textContent = catalog[i].printBasket();
        let button = document.createElement('BUTTON');
        button.textContent = '-'; 
        catalogBlock.appendChild(button);
        button.onclick = function(){
            let div = document.querySelector('.basket');
            while(div.firstChild){
                div.removeChild(div.firstChild);
            }
            catalog[i].fromBasket(1);
            createBasketBlock(basket);
            countBasketQuantity(basket)
            countBasketPrice(basket)
        }
        let buttonDel = document.createElement('BUTTON');
        buttonDel.textContent = '+'; 
        catalogBlock.appendChild(buttonDel);
        buttonDel.onclick = function(){
            let div = document.querySelector('.basket');
            while(div.firstChild){
                div.removeChild(div.firstChild);
            }
            catalog[i].toBasket(1);
            createBasketBlock(basket);
            countBasketQuantity(basket)
            countBasketPrice(basket)
        }
        indexBlock.appendChild(catalogBlock);
    }
}

let joogle = new Product('joogle', 1000, 5);
let macrosoft = new Product('macrosoft', 2000, 40);
let napple = new Product('napple', 3000, 50);
let javazon = new Product('javazon', 4000, 60);

let prodCatalog = [joogle, macrosoft, napple, javazon]


createProductBlock(prodCatalog)
