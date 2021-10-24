console.log(typeof(null)) // объект (и так же его отсутствие)
console.log(typeof(0)) // число
console.log(null > 0)  // false -- Сравнения преобразуют null в число, рассматривая его как 0
console.log(null >= 0) // true 

console.log(null == 0) // false -- для нестрогого равенства == значений undefined и null действует особое правило: эти значения ни к чему не приводятся, они равны друг другу и не равны ничему другому. Поэтому null == 0 ложно.
