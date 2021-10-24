class ProductOfCatalog {
    constructor(name, price, prodQuantity) {
        this.name = name;
        this.price = price;
        this.prodQuantity = prodQuantity; // количество товара
    }

    printProductOfCatalog(){
        return 'название: ' + this.name + ' цена: ' + this.price +  ' количество: ' + this.prodQuantity
    }
}

function printCatalog(catalog){
    let indexBlock = document.querySelector('.all_products');
    for (let i in catalog) {
        let catalogBlock = document.createElement('div');
        catalogBlock.textContent = catalog[i].printProductOfCatalog();
        indexBlock.appendChild(catalogBlock);
    }
}


let joogleZ = new ProductOfCatalog('joogle', 1000, 30);
let macrosoftZ = new ProductOfCatalog('macrosoft', 2000, 40);
let nappleZ = new ProductOfCatalog('napple', 3000, 50);
let javazonZ = new ProductOfCatalog('javazon', 4000, 60);

let prodCatalog = [joogleZ, macrosoftZ, nappleZ, javazonZ]


printCatalog(prodCatalog)
