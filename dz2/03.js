let a = 0
let b = -8

if (a >= 0 && b >= 0) {
    console.log(a-b)
} else if (a < 0 && b < 0) {
    console.log(a*b)
} else if (a >= 0 && b < 0 || a < 0 && b >= 0) {
    console.log(a+b)
}
