smallGallery =  ["01.jpg", "02.jpg", "03.jpg"]

function imgError() {
    alert('Изображение не найдено');
}

function miniGallery(imgGallery){
    let indexBlock = document.querySelector('.mini_gallery'); 
    for (let i in imgGallery){
        let catalogBlock = document.createElement('DIV');
        catalogBlock.innerHTML = '<img src="small/' + imgGallery[i] + '">'
        catalogBlock.onclick = function(){
            let indexBlock = document.querySelector('.gallery');
            while(indexBlock.firstChild){
                indexBlock.removeChild(indexBlock.firstChild);
            }
            let catalogBlock = document.createElement('DIV');
            catalogBlock.innerHTML = '<img src="big/' + imgGallery[i] + '" onerror="imgError()">'
            indexBlock.appendChild(catalogBlock)
        }
        indexBlock.appendChild(catalogBlock);

    }
}


miniGallery(smallGallery)