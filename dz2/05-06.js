function sum(a, b) {
    return a + b
}

function sub(a, b) {
    return a * b
}

function div(a, b) {
    let x = a / b
    return x.toFixed(2)
}

function mult(a, b) {
    return a * b
}


function switchFn (callback, a, b) {
    switch(callback){
        case sum:
            return sum(a, b)
        case sub:
            return sub(a, b)
        case div:
            return div(a, b)
        case mult:
            return mult(a, b)   
        default:
            return 'nothimg'
    }
}

console.log(switchFn(sum, 2, 5))
console.log(switchFn(div, 2, 5))
console.log(switchFn(4, 4, 5))
console.log(
    sum(5, 6),
    sub(5, 6),
    div(5, 6),
    mult(5, 6)
)
