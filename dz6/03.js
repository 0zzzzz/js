gallery = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg"]

let counter = 0

function createGallery(imgGallery){
        let indexBlock = document.querySelector('.gallery');
        let catalogBlock = document.createElement('DIV');
        catalogBlock.innerHTML = '<img src="gallery/' + imgGallery[counter] + '">'
        let backButton = document.createElement('BUTTON');
        backButton.textContent = '<'; 
        backButton.onclick = function(){
            counter -= 1
            if (counter < 0){
                counter = imgGallery.length-1
            }
            catalogBlock.innerHTML = '<img src="gallery/' + imgGallery[counter] + '">'
        }

        let forwardButton = document.createElement('BUTTON');
        forwardButton.textContent = '>'; 
        forwardButton.onclick = function(){
            counter +=1
            if (counter > imgGallery.length-1){
                counter = 0
            }
            catalogBlock.innerHTML = '<img src="gallery/' + imgGallery[counter] + '">'
        }
        indexBlock.appendChild(backButton);
        indexBlock.appendChild(catalogBlock);
        indexBlock.appendChild(forwardButton);
}


createGallery(gallery);
