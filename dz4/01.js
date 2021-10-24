class PartedNumber{
    constructor() {
        this.units = null;
        this.tens = null;
        this.hundreds = null;
    }
    getParted(number){
        if (number < 0 || number > 999){
            console.log('Введённое число не входит в заданный интервал')
            return this
        } else {
            this.units = number % 10
            this.tens = Math.floor((number % 100) / 10)
            this.hundreds = Math.floor(number / 100)
            return this
        }
    }    
}


let userNum = new PartedNumber()
console.log(userNum.getParted(254))
