let chessBoard = document.createElement('div');

for (let y = 0; y <= 8; y++) {
	for (let x = 0; x <= 8; x++) {
        let css = null
        if (x == 0){
            css = {clear:'left'};
        } else {
            css = {};
        }
        let cellFilling = '';
    	if (y == 0 && x > 0) {
            cellFilling = 'ABCDEFGH'.charAt(x-1);
        } else if (x == 0) {
            cellFilling = 0 + y;
        } else if (((x + y) % 2) == 1) {
            css.background = '#000000';
        }
        let cell = document.createElement('div');
        cell.classList.add('chess_cell');
        for (let i in css) {
            cell.style[i] = css[i];
        }
        if (cellFilling) {
            cell.textContent = cellFilling;
        }
        chessBoard.appendChild(cell);
    }
}

let indexBlock = document.querySelector('.chess');
indexBlock.appendChild(chessBoard);
