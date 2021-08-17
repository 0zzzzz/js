function power(val, pow) {
    if(pow <= 1) {
        return val
    } else {
    return val * power(val, pow-1)
    }
}

console.log(power(3, 4))
