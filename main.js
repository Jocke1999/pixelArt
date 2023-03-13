const container = document.querySelector('.pixelGrid')
const color = document.querySelector('.color')
const resetBtn = document.querySelector('.btn')
const sizeEl = document.querySelector('.size')
let size = sizeEl.value

let draw = false

function populateImage() {
    container.innerHTML = ''
    const canvas = document.querySelector('canvas')
    const canvasWidth = canvas.offsetWidth
    const canvasHeight = canvas.offsetHeight
    let rows = (Math.floor(canvasHeight / 20) * 20) / 20
    let columns = (Math.floor(canvasWidth / 20) * 20) / 20

    container.style.setProperty('grid-template-columns', 'repeat(' + columns + ', 1fr)')
    container.style.setProperty('grid-template-rows', 'repeat(' + rows + ', 1fr)')
    container.style.width = Math.floor(canvasWidth / 20) * 20 + 'px'
    container.style.height = Math.floor(canvasHeight / 20) * 20 + 'px'
    canvas.style.width = Math.floor(canvasWidth / 20) * 20 + 'px'
    canvas.style.height = Math.floor(canvasHeight / 20) * 20 + 'px'

  for (let i = 0; i < rows * columns; i++) {
    const div = document.createElement('div')
    div.classList.add('pixel')

    div.addEventListener('mouseover', function(){
        if(!draw) return
        div.style.backgroundColor = color.value
    })
    div.addEventListener('mousedown', function(){
        div.style.backgroundColor = color.value
    })

    container.appendChild(div)
  }
}

function populate(size) {
    container.style.setProperty('--size', size)
    container.style.setProperty('grid-template-columns', `repeat(${size}, 1fr)`)
    container.style.setProperty('grid-template-rows', `repeat(${size}, 1fr)`)
    for (let i = 0; i < size * size; i++) {
      const div = document.createElement('div')
      div.classList.add('pixel')
  
      div.addEventListener('mouseover', function(){
          if(!draw) return
          div.style.backgroundColor = color.value
      })
      div.addEventListener('mousedown', function(){
          div.style.backgroundColor = color.value
      })
  
      container.appendChild(div)
    }
  }

window.addEventListener("mousedown", function(){
    draw = true
})
window.addEventListener("mouseup", function(){
    draw = false
})

function reset(){
    container.innerHTML = ''
    if (selectedFile) {
        populateImage()
    } else {
        populate(size)
    }
}

resetBtn.addEventListener('click', reset)

sizeEl.addEventListener('keyup', function(){
    size = sizeEl.value
    reset()
})

// Upload picture and pixelate it for drawing
const fileInput = document.getElementById('fileInput');
const previewImage = document.getElementById('previewImage');
let selectedFile;

fileInput.addEventListener('change', function() {
  selectedFile = fileInput.files[0];
  const reader = new FileReader();

  reader.addEventListener('load', function() {
    previewImage.src = reader.result;
    previewImage.style.display = 'block';
  });

  reader.readAsDataURL(selectedFile);
});

const submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', function() {
  useSelectedFile();
});

function pixelateImage(){ 
const config = {
    to: document.getElementById("pixelitcanvas"),
    //defaults to document.getElementById("pixelitcanvas")
    from: document.getElementById("pixelitimg"),
    //defaults to document.getElementById("pixelitimg")
    scale: 10,
    //from 0-50, defaults to 8
    //defaults to a fixed pallete
    maxHeight: 800,
    //defaults to null
    maxWidth: 800
    //defaults to null
  };
  const px = new pixelit(config);
  px.draw().pixelate();

}
    
function useSelectedFile() {
    container.innerHTML = ''
    document.getElementById("pixelitimg").src = previewImage.src;
    pixelateImage();
    populateImage()
}

populate(size)