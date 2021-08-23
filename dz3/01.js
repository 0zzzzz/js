let finalNum = 100;
let finalArr = [];
let i = 2;

while (i <= finalNum) {
    let flag = true;
    if (i > 2 && i % 2 != 0) {
        let j = 3;
        while (j * j <= i) {
            if (i % j==0) {
                flag = false;
                break;
            }
            j = j + 2;
        }
    }
    else if (i != 2) {
        flag = false;
    }
    if (flag == true) {
        finalArr.push(i);
    }
    i++;
}

console.log(finalArr);
